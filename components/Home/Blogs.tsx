import { Container, Grid } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import { BlogModel } from "@/models";
import helper from "@/utils/helpers";
import { publicRoutes } from "@/utils/routes";
import { ImageFill } from "../common";
import styles from "./_style.module.scss";
import ViewAllLink from "./ViewAllLink";

type Props = {
  blogs: BlogModel[];
};

const Blogs: FC<Props> = ({ blogs }) => {
  return (
    <Container maxWidth="lg">
      <Grid container columnSpacing={2} rowSpacing={2}>
        {blogs.map((blog) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Link
                href={`/blog/${blog.slug}`}
                className={styles.blogThumbnail}
                as="image"
              >
                <ImageFill src={blog.thumbnail} alt="" height="280px" />
              </Link>
              <Link href={`/blog/${blog.slug}`} className={styles.blogTitle}>
                {blog.title}
              </Link>
              <div className={styles.blogCreatedAt}>
                {helper.formatDateTime(blog.createdAt)}
              </div>
            </Grid>
          );
        })}
        <ViewAllLink isVisible={blogs.length > 0}>
          Xem tất cả bài viết
        </ViewAllLink>
      </Grid>
    </Container>
  );
};

export default Blogs;
