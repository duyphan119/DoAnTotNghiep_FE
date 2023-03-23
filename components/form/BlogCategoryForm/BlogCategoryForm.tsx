import {
  blogCategoryActions,
  blogCategoryReducer,
  blogCategorySeletor,
} from "@/redux/slice/blogCategorySlice";
import { fetchActions, fetchSelector } from "@/redux/slice/fetchSlice";
import { useAppDispatch } from "@/redux/store";
import { CreateBlogCategoryDTO } from "@/types/dtos";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FooterForm, InputControl, TextAreaControl } from "../../common";

type Props = {};

const BlogCategoryForm = (props: Props) => {
  const appDispatch = useAppDispatch();
  const { current } = useSelector(blogCategorySeletor);
  const { isLoading, reducer } = useSelector(fetchSelector);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateBlogCategoryDTO>();

  const onSubmit: SubmitHandler<CreateBlogCategoryDTO> = (data) => {
    if (current.id > 0) {
      appDispatch(fetchActions.start(blogCategoryReducer.fetchUpdate));
      appDispatch(
        blogCategoryActions.fetchUpdate({
          id: current.id,
          ...data,
        })
      );
    } else {
      appDispatch(fetchActions.start(blogCategoryReducer.fetchCreate));
      appDispatch(blogCategoryActions.fetchCreate(data));
    }
  };

  useEffect(() => {
    if (current.id > 0) {
      setValue("name", current.name);
      setValue("description", current.description);
    }
  }, [current]);

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
              (reducer === blogCategoryReducer.fetchCreate ||
                reducer === blogCategoryReducer.fetchUpdate) &&
              isLoading
            }
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default BlogCategoryForm;
