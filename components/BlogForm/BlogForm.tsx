import { Grid } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  SubmitHandler,
  useForm,
  UseFormStateReturn,
} from "react-hook-form";
import { useSelector } from "react-redux";
import { CreateBlogDTO } from "../../apis/blog";
import {
  blogCategoryActions,
  blogCategorySeletor,
} from "../../redux/slice/blogCategorySlice";
import {
  blogSelector,
  blogActions,
  blogReducers,
} from "../../redux/slice/blogSlice";
import { fetchActions, fetchSelector } from "../../redux/slice/fetchSlice";
import { useAppDispatch } from "../../redux/store";
import { FooterForm, InputControl, SelectControl } from "../common";

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
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { blogCategoryData } = useSelector(blogCategorySeletor);
  const { blogEditing, isBack } = useSelector(blogSelector);
  const { isLoading, reducer } = useSelector(fetchSelector);

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
    },
  });

  const onSubmit: SubmitHandler<CreateBlogDTO> = (data) => {
    if (blogEditing) {
      appDispatch(fetchActions.start(blogReducers.fetchUpdateBlog));
      appDispatch(
        blogActions.fetchUpdateBlog({
          id: blogEditing.id,
          files,
          dto: data,
        })
      );
    } else {
      appDispatch(fetchActions.start(blogReducers.fetchCreateBlog));
      appDispatch(
        blogActions.fetchCreateBlog({
          files,
          dto: data,
        })
      );
    }
  };

  useEffect(() => {
    appDispatch(
      blogCategoryActions.fetchBlogCategoryData({
        sortType: "asc",
        sortBy: "name",
      })
    );
  }, []);

  useEffect(() => {
    if (blogEditing) {
      setValue("blogCategoryId", blogEditing.blogCategoryId);
      setValue("title", blogEditing.title);
      setValue("heading", blogEditing.heading);
      setValue("content", blogEditing.content);
    }
  }, [blogEditing]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={12}>
          <SelectControl
            required={true}
            error={errors.blogCategoryId}
            register={register("blogCategoryId", {
              required: {
                value: true,
                message: "Danh mục bài viết không được để trống",
              },
            })}
            label="Danh mục bài viết"
            options={blogCategoryData.items.map((blogCategory) => ({
              value: blogCategory.id,
              display: blogCategory.name,
            }))}
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
          <InputControl
            required={true}
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
                  if (value === "<p><br></p>") {
                    return "Nội dung không được để trống";
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
          <FooterForm
            isLoading={
              (reducer === blogReducers.fetchCreateBlog ||
                reducer === blogReducers.fetchUpdateBlog) &&
              isLoading
            }
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default BlogForm;
