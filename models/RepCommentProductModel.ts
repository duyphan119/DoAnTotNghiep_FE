import CommentProductModel from "./CommentProductModel";
import DateModel from "./DateModel";
import UserModel from "./UserModel";

class RepCommentProductModel extends DateModel {
  id: number;
  content: string;
  userId: number;
  user: UserModel;
  commentProductId: number;
  commentProduct: CommentProductModel;

  constructor(obj?: any) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.content = obj?.content ?? "";
    this.userId = obj?.userId ?? 0;
    this.user = new UserModel(obj?.user);
    this.commentProductId = obj?.commentProductId ?? 0;
    this.commentProduct = new CommentProductModel(obj?.commentProduct);
  }
}

export default RepCommentProductModel;
