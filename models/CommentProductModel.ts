import DateModel from "./DateModel";
import ProductModel from "./ProductModel";
import UserModel from "./UserModel";

class CommentProductModel extends DateModel {
  id: number;
  userId: number;
  star: number;
  content: string;
  productId: number;
  parentId: number;
  user: UserModel;
  product: ProductModel;
  parent: CommentProductModel;
  children: CommentProductModel[];

  constructor(obj?: any) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.userId = obj?.userId ?? 0;
    this.star = obj?.star ?? 1;
    this.content = obj?.content ?? "";
    this.productId = obj?.productId ?? 0;
    this.parentId = obj?.parentId ?? 0;
    this.user = new UserModel(obj?.user);
    this.product = new ProductModel(obj?.product);
    this.parent = new CommentProductModel(obj?.parent);
    this.children =
      obj?.children?.map((item: any) => new CommentProductModel(item)) ?? [];
  }
}

export default CommentProductModel;
