import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { CreateBlogCategoryDTO } from "../../types/dtos";
import {
  blogCategorySeletor,
  blogCategoryActions,
  blogCategoryReducers,
} from "../../redux/slice/blogCategorySlice";
import { fetchActions, fetchSelector } from "../../redux/slice/fetchSlice";
import { useAppDispatch } from "../../redux/store";
import { FooterForm, InputControl, TextAreaControl } from "../common";

type Props = {};

const BlogCategoryForm = (props: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { blogCategoryEditing, isBack } = useSelector(blogCategorySeletor);
  const { isLoading, reducer } = useSelector(fetchSelector);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateBlogCategoryDTO>();

  const onSubmit: SubmitHandler<CreateBlogCategoryDTO> = (data) => {
    if (blogCategoryEditing) {
      appDispatch(
        fetchActions.start(blogCategoryReducers.fetchUpdateBlogCategory)
      );
      appDispatch(
        blogCategoryActions.fetchUpdateBlogCategory({
          id: blogCategoryEditing.id,
          ...data,
        })
      );
    } else {
      appDispatch(
        fetchActions.start(blogCategoryReducers.fetchCreateBlogCategory)
      );
      appDispatch(blogCategoryActions.fetchCreateBlogCategory(data));
    }
  };

  useEffect(() => {
    if (blogCategoryEditing) {
      setValue("name", blogCategoryEditing.name);
      setValue("description", blogCategoryEditing.description);
    }
  }, [blogCategoryEditing]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={3} rowSpacing={3}>
        <Grid item xs={12}>
          <InputControl
            required={true}
            error={errors.name}
            label="Tên danh mục"
            register={register("name", {
              required: {
                value: true,
                message: "Tên danh mục không được để trống",
              },
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextAreaControl
            error={errors.description}
            label="Mô tả"
            register={register("description")}
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <FooterForm
            isLoading={
              (reducer === blogCategoryReducers.fetchCreateBlogCategory ||
                reducer === blogCategoryReducers.fetchUpdateBlogCategory) &&
              isLoading
            }
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default BlogCategoryForm;
