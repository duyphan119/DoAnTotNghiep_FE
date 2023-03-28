import {
  FooterForm,
  InputControl,
  SelectControl,
  TextAreaControl,
} from "@/components";
import {
  blogCategoryActions,
  blogCategorySeletor,
} from "@/redux/slice/blogCategorySlice";
import {
  blogActions,
  blogReducers,
  blogSelector,
} from "@/redux/slice/blogSlice";
import { fetchActions, fetchSelector } from "@/redux/slice/fetchSlice";
import { useAppDispatch } from "@/redux/store";
import { CreateBlogDTO } from "@/types/dtos";
import { Grid } from "@mui/material";
import dynamic from "next/dynamic";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  SubmitHandler,
  useForm,
  UseFormStateReturn,
} from "react-hook-form";
import { useSelector } from "react-redux";

type Props = {};

type RenderContentProps = {
  field: ControllerRenderProps<CreateBlogDTO, "content">;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<CreateBlogDTO>;
};

const BlogForm = (props: Props) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const appDispatch = useAppDispatch();
  const { blogCategoryData } = useSelector(blogCategorySeletor);
  const { current } = useSelector(blogSelector);
  const { isLoading, reducer, resetForm } = useSelector(fetchSelector);

  const [files, setFiles] = useState<FileList | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<CreateBlogDTO>({
    defaultValues: {
      content: "",
      title: "",
      heading: "",
      metaDescription: "",
      metaKeywords: "",
      blogCategoryId: 0,
      thumbnail: "",
    },
  });

  const onSubmit: SubmitHandler<CreateBlogDTO> = (data) => {
    if (current.id > 0) {
      appDispatch(fetchActions.start(blogReducers.fetchUpdate));
      appDispatch(
        blogActions.fetchUpdate({
          id: current.id,
          files,
          dto: data,
        })
      );
    } else {
      appDispatch(fetchActions.start(blogReducers.fetchCreate));
      appDispatch(
        blogActions.fetchCreate({
          files,
          dto: data,
        })
      );
    }
  };

  useEffect(() => {
    appDispatch(
      blogCategoryActions.fetchGetAll({
        sortType: "ASC",
        sortBy: "name",
      })
    );
  }, []);

  useEffect(() => {
    if (current) {
      setValue("blogCategoryId", current.blogCategoryId);
      setValue("title", current.title);
      setValue("heading", current.heading);
      setValue("content", current.content);
      setValue("metaDescription", current.metaDescription);
      setValue("metaKeywords", current.metaKeywords);
    }
  }, [current]);

  const handleResetForm = () => {
    setValue("blogCategoryId", 0);
    setValue("title", "");
    setValue("heading", "");
    setValue("content", "");
    setValue("metaDescription", "");
    setValue("metaKeywords", "");
  };

  useEffect(() => {
    if (resetForm) {
      handleResetForm();
      appDispatch(fetchActions.endResetForm());
    }
  }, [resetForm]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={12}>
          <SelectControl
            required={true}
            error={errors.blogCategoryId}
            register={register("blogCategoryId", {
              validate: (value) =>
                value > 0 || "Danh mục bài viết không được để trống",
            })}
            label="Danh mục bài viết"
            options={[
              {
                display: "Chọn danh mục bài viết",
                value: 0,
              },
              ...blogCategoryData.items.map((blogCategory) => ({
                value: blogCategory.id,
                display: blogCategory.name,
              })),
            ]}
          />
        </Grid>
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
          <TextAreaControl
            error={errors.heading}
            register={register("heading")}
            label="Mở đầu bài viết"
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
                  console.log(value);
                  if (value === "") {
                    return "Nội dung bài viết không được để trống";
                  }
                },
              }}
              render={(data: RenderContentProps) => {
                return (
                  <ReactQuill
                    theme="snow"
                    value={data.field.value}
                    onChange={data.field.onChange}
                    placeholder="Nội dung bài viết"
                  />
                );
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <InputControl
            register={register("metaKeywords")}
            label="Meta Từ khoá"
          />
        </Grid>
        <Grid item xs={12}>
          <TextAreaControl
            register={register("metaDescription")}
            rows={6}
            label="Meta Mô tả"
          />
        </Grid>
        <Grid item xs={12}>
          <FooterForm
            isLoading={
              (reducer === blogReducers.fetchCreate ||
                reducer === blogReducers.fetchUpdate) &&
              isLoading
            }
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default BlogForm;
