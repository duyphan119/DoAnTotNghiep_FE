import BlogCategoryModel from "./BlogCategoryModel";
import DateModel from "./DateModel";

class BlogModel extends DateModel {
  id: number;
  title: string;
  heading: string;
  content: string;
  thumbnail: string;
  slug: string;
  userId: number;
  blogCategoryId: number;
  blogCategory: BlogCategoryModel;
  constructor(obj?: any) {
    super(obj);
    this.id = obj?.id ?? 0;
    this.title = obj?.title ?? "";
    this.heading = obj?.heading ?? "";
    this.content = obj?.content ?? "";
    this.thumbnail = obj?.thumbnail ?? "";
    this.slug = obj?.slug ?? "";
    this.userId = obj?.userId ?? 0;
    this.blogCategoryId = obj?.blogCategoryId ?? 0;
    this.blogCategory = obj?.blogCategory ?? new BlogCategoryModel();
  }
}

export default BlogModel;
