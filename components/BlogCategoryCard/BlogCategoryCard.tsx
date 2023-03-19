import Link from "next/link";
import Image from "next/image";
import EastIcon from "@mui/icons-material/East";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Divider } from "@mui/material";
import { publicRoutes } from "@/utils/routes";
import helper from "@/utils/helpers";
import styles from "./_style.module.scss";
import { BlogCategoryModel } from "@/models";

type Props = {
  blogCategory: BlogCategoryModel;
  bgColorTag: string;
};

const BlogCategoryCard = ({ blogCategory, bgColorTag }: Props) => {
  if (!blogCategory.blogs || blogCategory.blogs.length === 0) return <></>;
  const [firstBlog, ...blogs] = blogCategory.blogs;

  const main = (
    <div className={styles.blogCategoryCard}>
      <div
        className={styles.bgColorTag}
        style={{
          backgroundColor: bgColorTag,
        }}
      >
        {blogCategory.name}
      </div>
      <Link
        href={publicRoutes.blogDetail(firstBlog.slug)}
        className={styles.thumbnailLink}
      >
        <Image
          src={firstBlog.thumbnail}
          fill={true}
          alt=""
          sizes="(max-width:600px) 100vw"
          priority={true}
        />
      </Link>
      <Box padding="12px">
        <Link
          href={publicRoutes.blogDetail(firstBlog.slug)}
          className={`${styles.blogTitle} three-dot three-dot-2 text-hover`}
        >
          {firstBlog.title}
        </Link>
        <div className={`${styles.blogHeading} three-dot three-dot-3`}>
          {firstBlog.heading}
        </div>
        <div className="flex-between">
          <div className=""></div>
          <div className={styles.blogTime}>
            <AccessTimeIcon /> {helper.formatDate(firstBlog.createdAt)}
          </div>
        </div>
      </Box>
      {blogs.length > 0 ? (
        <>
          <Divider />
          {blogs.map((blog) => {
            return (
              <Box display="flex" gap="8px" padding="8px" key={blog.id}>
                <Box flex="1">
                  <Link
                    href={publicRoutes.blogDetail(blog.slug)}
                    className={styles.thumbnailLink}
                  >
                    <Image
                      src={blog.thumbnail}
                      fill={true}
                      alt=""
                      sizes="(max-width:600px) 100vw"
                      priority={true}
                    />
                  </Link>
                </Box>
                <Box
                  flex="1"
                  display="flex"
                  justifyContent="space-between"
                  flexDirection="column"
                >
                  <Link
                    href={publicRoutes.blogDetail(blog.slug)}
                    className={`${styles.blogTitle} three-dot three-dot-2 text-hover`}
                  >
                    {blog.title}
                  </Link>
                  <div className={styles.blogTime}>
                    <AccessTimeIcon />
                    {helper.formatDate(firstBlog.createdAt)}
                  </div>
                </Box>
              </Box>
            );
          })}
        </>
      ) : null}
      <Divider />
      <Link
        href={publicRoutes.blogCategory(blogCategory.slug)}
        className={`${styles.viewAllLink} flex-center text-hover`}
      >
        XEM CHI TIẾT <EastIcon />
      </Link>
    </div>
  );
  return <div>{main}</div>;
};

export default BlogCategoryCard;
