import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import helper from "@/utils/helpers";
import { publicRoutes } from "@/utils/routes";
import { Blog } from "@/utils/types";
import ImageFill from "../common/ImageFill";
import styles from "./_style.module.scss";

type Props = {
  blog: Blog;
};

const BlogContent = ({ blog }: Props) => {
  return (
    <>
      <ImageFill src={blog.thumbnail} height="480px" />
      <Breadcrumbs>
        <Link href={publicRoutes.home}>Trang chủ</Link>
        <Link href={publicRoutes.blogs}>Bài viết</Link>
        <Typography style={{ color: "var(--blue)" }}>{blog.title}</Typography>
      </Breadcrumbs>
      <h1>{blog.title}</h1>
      <div className={styles.blogTime}>
        <AccessTimeIcon />
        {helper.formatDate(blog.createdAt)}
      </div>
      <div className={styles.blogHeading}>{blog.heading}</div>
      <Box
        sx={{
          "& .ql-align-justify": {
            textAlign: "justify",
          },
          "& .ql-align-center": {
            textAlign: "center",
          },
        }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></Box>
    </>
  );
};

export default BlogContent;
