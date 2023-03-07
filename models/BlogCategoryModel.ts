import BlogModel from "./BlogModel";
import DateModel from "./DateModel";

class BlogCategoryModel extends DateModel {
  id: number;
  name: string;
  slug: string;
  description: string;
  blogs: BlogModel[];

  constructor(obj?: any) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.name = obj?.name ?? "";
    this.slug = obj?.slug ?? "";
    this.description = obj?.description ?? "";
    this.blogs = obj?.blogs?.map((item: any) => new BlogModel(item)) ?? [];
  }
}

export default BlogCategoryModel;
