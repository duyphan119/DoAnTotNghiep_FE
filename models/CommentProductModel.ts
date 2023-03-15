import DateModel from "./DateModel";
import ProductModel from "./ProductModel";
import RepCommentProductModel from "./RepCommentProductModel";
import UserModel from "./UserModel";

class CommentProductModel extends DateModel {
  id: number;
  userId: number;
  star: number;
  content: string;
  productId: number;
  user: UserModel;
  product: ProductModel;
  repComments: RepCommentProductModel[];

  constructor(obj?: any) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.userId = obj?.userId ?? 0;
    this.star = obj?.star ?? 1;
    this.content = obj?.content ?? "";
    this.productId = obj?.productId ?? 0;
    this.user = new UserModel(obj?.user);
    this.product = new ProductModel(obj?.product);
    this.repComments =
      obj?.repComments?.map((item: any) => new RepCommentProductModel(item)) ??
      [];
  }
}

export default CommentProductModel;
