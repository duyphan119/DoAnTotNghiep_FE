import { Button, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CommentProductDTO,
  createCommentProduct,
  updateCommentProduct,
} from "../../../../../apis/commentproduct";
import { useAuthContext } from "../../../../../context/AuthContext";
import { useSnackbarContext } from "../../../../../context/SnackbarContext";
import { useProductDetailContext } from "../../../../../pages/product/[slug]";
import { MSG_SUCCESS } from "../../../../../utils/constants";
import styles from "../../../style.module.css";

type Props = {};

const CommentInput = (props: Props) => {
  const {
    product,
    commentProductData,
    onAddCommentProduct,
    onEditCommentProduct,
  } = useProductDetailContext();
  const { show } = useSnackbarContext();
  const { isLogged, setOpenModal } = useAuthContext();

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
      if (star > 0) {
        const input = {
          ...data,
          star,
          productId: product.id,
        };
        if (!userComment) {
          const { message, data } = await createCommentProduct(input);
          if (message === MSG_SUCCESS) {
            onAddCommentProduct(data);
            show("Cảm ơn bài đánh giá của bạn", "success");
          }
        } else {
          const { message, data } = await updateCommentProduct(
            userComment.id,
            input
          );
          if (message === MSG_SUCCESS) {
            onEditCommentProduct({ ...userComment, ...data });
            show("Sửa bài đánh giá thành công", "success");
          }
        }
      }
    } catch (error) {
      console.log(error);
      show("Đã có lỗi xảy ra, vui lòng thử lại sau", "error");
    }
  };

  return isLogged ? (
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
        onClick={() => setOpenModal(true)}
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
