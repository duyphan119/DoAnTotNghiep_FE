import { useSelector } from "react-redux";
import { CommentProductModel } from "@/models";
import { productDetailSelector } from "@/redux/slice/productDetailSlice";
import styles from "./_style.module.scss";
import Comment from "./Comment";

type Props = {};

const Comments = (props: Props) => {
  const { commentProductData, userCommentProduct } = useSelector(
    productDetailSelector
  );
  return (
    <div className={styles.commentProducts}>
      {commentProductData.count <= 0 && userCommentProduct.id === 0
        ? "Chưa có đánh giá nào"
        : commentProductData.items.map(
            (commentProduct: CommentProductModel) => {
              return (
                <Comment
                  key={commentProduct.id}
                  commentProduct={commentProduct}
                />
              );
            }
          )}
    </div>
  );
};

export default Comments;
