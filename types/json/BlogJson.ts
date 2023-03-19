import BlogCategoryJson from "./BlogCategoryJson";
import DateJson from "./DateJson";

type BlogJson = {
  id: number;
  title: string;
  heading: string;
  content: string;
  thumbnail: string;
  slug: string;
  userId: number;
  blogCategoryId: number;
  blogCategory: BlogCategoryJson;
} & DateJson;

export default BlogJson;
