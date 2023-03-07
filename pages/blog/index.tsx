import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getAllBlogCategories } from "../../apis/blogCategory";
import { BlogCategoryCard } from "../../components";
import { DefaultLayout } from "../../layouts";
import { EMPTY_ITEMS, MSG_SUCCESS } from "../../utils/constants";
import { publicRoutes } from "../../utils/routes";
import { Blog, BlogCategory, ResponseItems } from "../../utils/types";
import {
  BlogCategoryModel,
  BlogModel,
  ResponseGetAllModel,
} from "../../models";
import helper from "../../utils/helpers";
import { BlogCategoryApi } from "../../api";

type Props = {
  blogCategoryData: ResponseItems<BlogCategoryModel>;
};

const LIMIT = 5;
const bcApi = new BlogCategoryApi();
const getNewBlogs = (blogCategories: BlogCategoryModel[]) => {
  let blogs: BlogModel[] = [];
  const newBlogCategories = [...blogCategories].map((blogCategory) => ({
    ...blogCategory,
    blogs: blogCategory.blogs ? [...blogCategory.blogs].splice(0, 2) : [],
  }));

  newBlogCategories.forEach((blogCategory) => {
    if (blogCategory.blogs) {
      blogCategory.blogs.forEach((blog) => {
        blogs.push({ ...blog, blogCategory });
      });
    }
  });
  return blogs;
};

const NewBlogs = ({ blogCategoryData }: Props) => {
  let [firstBlog, ...others] = getNewBlogs(blogCategoryData.items);
  if (!firstBlog) {
    firstBlog = new BlogModel();
  }
  return (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid item xs={12} md={7}>
        <Box>
          <Link
            href={publicRoutes.blogDetail(firstBlog.slug)}
            style={{
              position: "relative",
              display: "block",
              height: 0,
              paddingBottom: "66.7%",
              overflow: "hidden",
            }}
          >
            <Image
              src={firstBlog.thumbnail}
              fill={true}
              alt=""
              sizes="(max-width:600px) 100vw"
              priority={true}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                zIndex: 2,
                width: "66.7%",
                backgroundColor: "rgba(0,0,0,0.4)",
                color: "#fff",
                p: 4,
              }}
            >
              <div
                style={{
                  fontWeight: 500,
                }}
              >
                {firstBlog.blogCategory ? firstBlog.blogCategory.name : ""}
              </div>
              <div
                className="three-dot three-dot-2"
                style={{
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBlock: "8px",
                  fontSize: "20px",
                }}
              >
                {firstBlog.title}
              </div>
              <div
                style={{
                  fontWeight: "thin",
                }}
                className="three-dot three-dot-3"
              >
                {firstBlog.heading}
              </div>
            </Box>
          </Link>
        </Box>
      </Grid>
      <Grid item xs={12} md={5}>
        <Box
          height="400px"
          overflow="hidden auto"
          className="custom-scrollbar"
          display="flex"
          flexDirection="column"
          gap="12px"
        >
          {others.map((blog) => {
            return (
              <Grid container columnSpacing={1}>
                <Grid item xs={5}>
                  <Link
                    href={publicRoutes.blogDetail(blog.slug)}
                    style={{
                      position: "relative",
                      display: "block",
                      height: 0,
                      paddingBottom: "66.7%",
                      overflow: "hidden",
                    }}
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      padding: 8,
                    }}
                  >
                    <Box>
                      <Box
                        className="three-dot"
                        sx={{
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        {blog.title}
                      </Box>
                      <Box
                        className="three-dot three-dot-3"
                        sx={{
                          color: "gray",
                          fontSize: "14px",
                          my: 1,
                        }}
                      >
                        {blog.heading}
                      </Box>
                    </Box>
                    <div
                      style={{
                        fontSize: 12,
                        color: "gray",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        justifyContent: "flex-end",
                      }}
                    >
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

const Page = ({ blogCategoryData: { items, count } }: Props) => {
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
      <DefaultLayout>
        <Container maxWidth="lg">
          <Typography
            variant="subtitle1"
            style={{
              textAlign: "center",
              margin: "36px 0 12px 0",
            }}
          >
            BÀI VIẾT MỚI NHẤT
          </Typography>
          <NewBlogs blogCategoryData={blogCategoryData} />
          <Typography
            variant="subtitle1"
            style={{
              textAlign: "center",
              margin: "36px 0 12px 0",
            }}
          >
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
    const data = await bcApi.getAll({
      limit: LIMIT,
      blogs: true,
      sortType: "asc",
    });
    return { props: { blogCategoryData: JSON.parse(JSON.stringify(data)) } };
  } catch (error) {
    return { notFound: true };
  }
}

export default Page;
