import { ButtonControl, TextAreaControl } from "@/components";
import { useDefaultLayoutContext } from "@/context/DefaultLayoutContext";
import { authActions, authSelector } from "@/redux/slice/authSlice";
import {
  productDetailActions,
  productDetailSelector,
} from "@/redux/slice/productDetailSlice";
import { snackbarActions } from "@/redux/slice/snackbarSlice";
import { useAppDispatch } from "@/redux/store";
import { CreateCommentProductDTO } from "@/types/dtos";
import { Rating } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styles from "./_style.module.scss";

type Props = {};

const CommentInput: FC<Props> = () => {
  const appDispatch = useAppDispatch();
  const { userCommentProduct, product } = useSelector(productDetailSelector);
  // const { profile } = useSelector(authSelector);
  // const { userComment } = commentProductData;
  // const userComment = new CommentProductModel();
  const { profile } = useDefaultLayoutContext();

  const { register, handleSubmit, setValue, getValues } =
    useForm<CreateCommentProductDTO>();

  const [star, setStar] = useState<number>(0);
  const isEditing = useMemo(
    () => userCommentProduct.id > 0,
    [userCommentProduct]
  );

  useEffect(() => {
    setValue("content", isEditing ? userCommentProduct.content : "");
    setStar(isEditing ? userCommentProduct.star : 0);
  }, [userCommentProduct]);

  const onSubmit: SubmitHandler<CreateCommentProductDTO> = async (data) => {
    try {
      if (star > 0 && product.id > 0) {
        const dto = {
          ...data,
          star,
          productId: product.id,
        };
        if (isEditing) {
          appDispatch(
            productDetailActions.fetchUpdateCommentProduct({
              id: userCommentProduct.id,
              dto: dto,
            })
          );
        } else {
          appDispatch(productDetailActions.fetchAddCommnetProduct(dto));
        }
      }
    } catch (error) {
      console.log(error);
      appDispatch(
        snackbarActions.show({
          msg: "Đã có lỗi xảy ra, vui lòng thử lại sau",
          type: "error",
        })
      );
    }
  };

  return profile ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.commentInputTitle}>Đánh giá của bạn</div>
      <div className={styles.commentInputStar}>
        <Rating
          name="star"
          value={star}
          onChange={(event, newValue) => {
            setStar(newValue || 0);
          }}
          size="large"
        />
      </div>
      <TextAreaControl register={register("content")} label="Nội dung" />
      <div>
        <ButtonControl type="submit">{isEditing ? "Sửa" : "Gửi"}</ButtonControl>
      </div>
    </form>
  ) : (
    <span>
      <span
        onClick={() => appDispatch(authActions.showModalAuth())}
        style={{
          color: "var(--blue)",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Đăng nhập
      </span>{" "}
      để đánh giá
    </span>
  );
};

export default CommentInput;
