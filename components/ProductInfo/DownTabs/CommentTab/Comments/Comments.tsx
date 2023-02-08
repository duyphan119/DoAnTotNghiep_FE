import { useSelector } from "react-redux";
import { productDetailSelector } from "../../../../../redux/slice/productDetailSlice";
import { CommentProduct } from "../../../../../utils/types";
import styles from "../../../_style.module.scss";
import Comment from "./Comment";

type Props = {};

const Comments = (props: Props) => {
  const { commentProductData } = useSelector(productDetailSelector);
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
