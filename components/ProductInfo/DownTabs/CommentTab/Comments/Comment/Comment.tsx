import { Rating } from "@mui/material";
import moment from "moment";
import { CommentProductModel } from "@/models";
import styles from "../../../../_style.module.scss";
import "moment/locale/vi";
type Props = {
  commentProduct: CommentProductModel;
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
