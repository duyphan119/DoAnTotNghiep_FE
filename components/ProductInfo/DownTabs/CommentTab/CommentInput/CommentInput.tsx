import { Button, Rating } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { CommentProductModel } from "@/models";
import { useProductDetailContext } from "@/pages/product/[slug]";
import { authActions, authSelector } from "@/redux/slice/authSlice";
import {
  productDetailActions,
  productDetailSelector,
} from "@/redux/slice/productDetailSlice";
import { snackbarActions } from "@/redux/slice/snackbarSlice";
import { useAppDispatch } from "@/redux/store";
import { CreateCommentProductDTO } from "@/types/dtos";
import { MSG_SUCCESS } from "@/utils/constants";
import { ButtonControl, TextAreaControl } from "../../../../common";
import styles from "../../../_style.module.scss";

type Props = {};

const CommentInput = (props: Props) => {
  const appDispatch = useAppDispatch();
  const { product, userCommentProduct } = useSelector(productDetailSelector);
  const { profile } = useSelector(authSelector);
  // const { userComment } = commentProductData;
  // const userComment = new CommentProductModel();

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

  console.log(
    userCommentProduct.star === star &&
      userCommentProduct.content === getValues("content")
  );

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
