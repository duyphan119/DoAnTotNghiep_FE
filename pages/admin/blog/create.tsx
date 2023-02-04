import { Grid } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  SubmitHandler,
  useForm,
  UseFormStateReturn,
} from "react-hook-form";
import { CreateBlogDTO } from "../../../apis/blog";
import { AdminLayout } from "../../../layouts";

import { useRouter } from "next/router";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { AdminFormPaper, FooterForm, InputControl } from "../../../components";
import {
  blogManagementActions,
  blogManagementSelector,
} from "../../../redux/slice/blogManagementSlice";
import { useAppDispatch } from "../../../redux/store";

type Props = {};

export type RenderContentProps = {
  field: ControllerRenderProps<CreateBlogDTO, "content">;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<CreateBlogDTO>;
};

const CreateBlog = (props: Props) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { isLoading, isBack } = useSelector(blogManagementSelector);
  const [files, setFiles] = useState<FileList | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateBlogDTO>({
    defaultValues: {
      content: "",
      title: "",
    },
  });

  const onSubmit: SubmitHandler<CreateBlogDTO> = (data) => {
    appDispatch(
      blogManagementActions.fetchCreateBlog({
        files,
        dto: data,
      })
    );
  };

  useEffect(() => {
    if (isBack) router.back();
  }, [isBack]);

  return (
    <AdminLayout pageTitle="Thêm mới bài viết">
      <>
        <Head>
          <title>Thêm mới bài viết</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AdminFormPaper title="Thông tin thêm mới bài viết">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container rowSpacing={3} columnSpacing={3}>
              <Grid item xs={12}>
                <InputControl
                  required={true}
                  error={errors.title}
                  register={register("title", {
                    required: {
                      value: true,
                      message: "Tiêu đề không được để trống",
                    },
                  })}
                  label="Tiêu đề"
                />
              </Grid>
              <Grid item xs={12}>
                <InputControl
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFiles(e.target.files)
                  }
                  type="file"
                  label="Ảnh đại diện"
                />
              </Grid>
              <Grid item xs={12}>
                <div className="form-group">
                  {errors.content && errors.content.type === "validate" && (
                    <div className="form-error">{errors.content.message}</div>
                  )}
                  <Controller
                    control={control}
                    name="content"
                    rules={{
                      validate: (value) => {
                        if (value === "<p><br></p>") {
                          return "Nội dung không được để trống";
                        }
                      },
                    }}
                    render={(data: RenderContentProps) => {
                      return (
                        <>
                          <ReactQuill
                            theme="snow"
                            value={data.field.value}
                            onChange={data.field.onChange}
                            placeholder="Nội dung bài viết"
                            modules={{
                              toolbar: {
                                container: [
                                  ["bold", "italic", "underline", "strike"],
                                  ["blockquote", "code-block"],

                                  [{ header: 1 }, { header: 2 }],
                                  [{ list: "ordered" }, { list: "bullet" }],
                                  [{ script: "sub" }, { script: "super" }],
                                  [{ indent: "-1" }, { indent: "+1" }],
                                  [{ direction: "rtl" }],

                                  [{ size: ["small", false, "large", "huge"] }],
                                  [{ header: [1, 2, 3, 4, 5, 6, false] }],

                                  [{ color: [] }, { background: [] }],
                                  [{ font: [] }],
                                  [{ align: [] }],

                                  ["clean"],
                                ],
                              },
                            }}
                          />
                        </>
                      );
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <FooterForm
                  onBack={() => router.back()}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </form>
        </AdminFormPaper>
      </>
    </AdminLayout>
  );
};

export default CreateBlog;
