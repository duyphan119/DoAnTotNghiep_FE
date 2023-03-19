import BlogJson from "./BlogJson";
import DateJson from "./DateJson";

type BlogCategoryJson = {
  id: number;
  name: string;
  slug: string;
  description: string;
  blogs: BlogJson[];
} & DateJson;

export default BlogCategoryJson;
