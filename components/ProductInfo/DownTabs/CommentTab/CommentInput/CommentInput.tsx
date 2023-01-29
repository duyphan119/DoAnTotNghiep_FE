import { Button, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  CommentProductDTO,
  createCommentProduct,
  updateCommentProduct,
} from "../../../../../apis/commentproduct";
import { useProductDetailContext } from "../../../../../pages/product/[slug]";
import {
  authActions,
  authSelector,
} from "../../../../../redux/slice/authSlice";
import {
  productDetailActions,
  productDetailSelector,
} from "../../../../../redux/slice/productDetailSlice";
import { snackbarActions } from "../../../../../redux/slice/snackbarSlice";
import { useAppDispatch } from "../../../../../redux/store";
import { MSG_SUCCESS } from "../../../../../utils/constants";
import styles from "../../../style.module.css";

type Props = {};

const CommentInput = (props: Props) => {
  const appDispatch = useAppDispatch();
  const { product, commentProductData } = useSelector(productDetailSelector);
  const { profile } = useSelector(authSelector);

  const { userComment } = commentProductData;

  const { register, handleSubmit, setValue, getValues } =
    useForm<CommentProductDTO>();

  const [star, setStar] = useState<number>(userComment ? userComment.star : 0);

  useEffect(() => {
    setValue("content", userComment ? userComment.content : "");
    setStar(userComment ? userComment.star : 0);
  }, [userComment]);

  const onSubmit: SubmitHandler<CommentProductDTO> = async (data) => {
    try {
      if (star > 0 && product) {
        const input = {
          ...data,
          star,
          productId: product.id,
        };
        if (!userComment) {
          appDispatch(productDetailActions.fetchAddCommnetProduct(input));
        } else {
          appDispatch(
            productDetailActions.fetchUpdateCommentProduct({
              id: userComment.id,
              ...input,
            })
          );
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
      <div className="form-group">
        <label className="form-label">Nội dung</label>

        <textarea
          className="form-control"
          rows={4}
          {...register("content")}
        ></textarea>
      </div>
      <div>
        <Button
          variant="contained"
          type="submit"
          disabled={
            !userComment
              ? star === 0
              : userComment.star === star &&
                userComment.content === getValues("content")
          }
        >
          {userComment ? "Sửa" : "Gửi"}
        </Button>
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
