import React from "react";
import { CommentProduct } from "../../../../../../utils/types";
import { Rating } from "@mui/material";
import styles from "../../../../style.module.css";
import moment from "moment";
import "moment/locale/vi";
type Props = {
  commentProduct: CommentProduct;
};

const Comment = ({ commentProduct }: Props) => {
  return (
    <div className={styles.commentProduct}>
      <div className={styles.heading}>
        <div className={styles.top}>
          <span className={styles.fullName}>
            {commentProduct.user?.fullName}
          </span>
          <span>-</span>
          <span className={styles.time}>
            {moment(commentProduct.createdAt).fromNow()}
          </span>
          {commentProduct.createdAt !== commentProduct.updatedAt ? (
            <>
              <span>-</span>
              <span>Đã chỉnh sửa</span>
            </>
          ) : null}
        </div>
        <div className={styles.star}>
          <Rating size="small" value={commentProduct.star} readOnly />
        </div>
      </div>
      <div className={styles.content}>{commentProduct.content}</div>
    </div>
  );
};

export default Comment;
