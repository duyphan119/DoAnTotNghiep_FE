import { BlogCategoryApi } from "@/api";
import { BlogCategoryCard } from "@/components";
import { DefaultLayout } from "@/layouts";
import { getProfileProps } from "@/lib";
import { BlogModel, ResponseGetAllModel, UserModel } from "@/models";
import styles from "@/styles/_Blog.module.scss";
import { BlogCategoryJson, UserJson } from "@/types/json";
import helper from "@/utils/helpers";
import { publicRoutes } from "@/utils/routes";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

type Props = {
  blogCategoryDataJson: { items: BlogCategoryJson[]; count: number };
  profile: UserJson | null;
};

const LIMIT = 5;
const bcApi = new BlogCategoryApi();
const getNewBlogs = (blogCategories: BlogCategoryJson[]): BlogModel[] => {
  let blogs: BlogModel[] = [];
  const newBlogCategories = [...blogCategories].map((blogCategory) => ({
    ...blogCategory,
    blogs: blogCategory.blogs ? [...blogCategory.blogs].splice(0, 2) : [],
  }));

  newBlogCategories.forEach((blogCategory) => {
    if (blogCategory.blogs) {
      blogCategory.blogs.forEach((blog) => {
        blogs.push(new BlogModel({ ...blog, blogCategory }));
      });
    }
  });
  return blogs;
};

const NewBlogs = ({ items }: { items: BlogCategoryJson[] }) => {
  let [firstBlog, ...others] = getNewBlogs(items);
  if (!firstBlog) {
    firstBlog = new BlogModel();
  }
  return (
    <Grid
      container
      columnSpacing={2}
      rowSpacing={2}
      className={styles.newBlogs}
    >
      <Grid item xs={12} md={7} className={styles.firstBlog}>
        <Box>
          <Link
            href={publicRoutes.blogDetail(firstBlog.slug)}
            className={styles.firstBlogImageLink}
          >
            <Image
              src={firstBlog.thumbnail}
              fill={true}
              alt=""
              sizes="(max-width:600px) 100vw"
              priority={true}
            />
            <Box className={styles.firstBlogInfos}>
              <div className={styles.firstBlogName}>
                {firstBlog.blogCategory ? firstBlog.blogCategory.name : ""}
              </div>
              <div className={`${styles.firstBlogTitle} three-dot three-dot-2`}>
                {firstBlog.title}
              </div>
              <div
                className={`${styles.firstBlogHeading} three-dot three-dot-3`}
              >
                {firstBlog.heading}
              </div>
            </Box>
          </Link>
        </Box>
      </Grid>
      <Grid item xs={12} md={5}>
        <Box className={`${styles.otherBlogs} custom-scrollbar`}>
          {others.map((blog) => {
            return (
              <Grid container columnSpacing={1} key={blog.id}>
                <Grid item xs={5}>
                  <Link
                    href={publicRoutes.blogDetail(blog.slug)}
                    className={styles.otherBlogImageLink}
                  >
                    <Image
                      src={blog.thumbnail}
                      fill={true}
                      alt=""
                      sizes="(max-width:600px) 100vw"
                      priority={true}
                    />
                  </Link>
                </Grid>
                <Grid item xs={7}>
                  <div className={styles.otherBlogInfos}>
                    <Box>
                      <Box className={`${styles.otherBlogTitle} three-dot`}>
                        {blog.title}
                      </Box>
                      <Box
                        className={`${styles.otherBlogHeading} three-dot three-dot-3`}
                      >
                        {blog.heading}
                      </Box>
                    </Box>
                    <div className={styles.otherBlogTime}>
                      <AccessTimeIcon sx={{ fontSize: "14px" }} />
                      {helper.formatDate(blog.createdAt)}
                    </div>
                  </div>
                </Grid>
              </Grid>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

const Page = ({ blogCategoryDataJson: { items, count }, profile }: Props) => {
  const blogCategoryData = new ResponseGetAllModel(
    bcApi.getListFromJson(items),
    count
  );
  const muiTheme = useTheme();
  const colors = [
    muiTheme.palette.error.main,
    muiTheme.palette.success.main,
    muiTheme.palette.primary.main,
    muiTheme.palette.secondary.main,
    muiTheme.palette.info.main,
  ];
  return (
    <>
      <Head>
        <title>Danh sách bài viết</title>
      </Head>
      <DefaultLayout profile={new UserModel(profile)}>
        <Container maxWidth="lg">
          <Typography variant="subtitle1" className={styles.typography}>
            BÀI VIẾT MỚI NHẤT
          </Typography>
          <NewBlogs items={items} />
          <Typography variant="subtitle1" className={styles.typography}>
            DANH MỤC BÀI VIẾT
          </Typography>
          <Grid container columnSpacing={2} rowSpacing={2}>
            {blogCategoryData.items.map((blogCategory, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  xl={3}
                  md={6}
                  key={blogCategory.id}
                  sx={{
                    maxWidth: {
                      lg: "20%",
                    },
                    flex: {
                      lg: "0 0 20%",
                    },
                  }}
                >
                  <BlogCategoryCard
                    blogCategory={blogCategory}
                    bgColorTag={colors[index]}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </DefaultLayout>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const data = await bcApi.getAllJson({
      limit: LIMIT,
      blogs: true,
      sortType: "ASC",
    });
    const { props } = await getProfileProps(context);
    return {
      props: { ...props, blogCategoryDataJson: data },
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default Page;
