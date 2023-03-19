import Link from "next/link";
import { BlogModel } from "@/models";
import { publicRoutes } from "@/utils/routes";
import ImageFill from "../common/ImageFill";
import styles from "./_style.module.scss";

type Props = {
  blog: BlogModel;
};

const BlogCard = ({ blog }: Props) => {
  return (
    <div className={styles.blogCard}>
      <Link href={publicRoutes.blogDetail(blog.slug)}>
        <ImageFill src={blog.thumbnail} alt="" height="66.7%" />
      </Link>
      <Link
        className={`${styles.title} text-hover`}
        href={publicRoutes.blogDetail(blog.slug)}
      >
        {blog.title}
      </Link>
      <p className={`${styles.heading} three-dot three-dot-8`}>
        {blog.heading}
      </p>
    </div>
  );
};

export default BlogCard;
