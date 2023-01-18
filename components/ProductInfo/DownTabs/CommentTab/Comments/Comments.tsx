import React from "react";
import { useProductDetailContext } from "../../../../../pages/product/[slug]";
import { CommentProduct } from "../../../../../utils/types";
import Comment from "./Comment";
import styles from "../../../style.module.css";

type Props = {};

const Comments = (props: Props) => {
  const { commentProductData } = useProductDetailContext();
  const { userComment } = commentProductData;
  return (
    <div className={styles.commentProducts}>
      {commentProductData.count <= 0 && !userComment
        ? "Chưa có đánh giá nào"
        : commentProductData.items.map((commentProduct: CommentProduct) => {
            return (
              <Comment
                key={commentProduct.id}
                commentProduct={commentProduct}
              />
            );
          })}
    </div>
  );
};

export default Comments;
