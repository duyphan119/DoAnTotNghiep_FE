import { Container, Grid, Pagination } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAllBlogsPublic } from "../../apis/blog";
import { DefaultLayout } from "../../layouts";
import { EMPTY_ITEMS, MSG_SUCCESS } from "../../utils/constants";
import { formatDateTime } from "../../utils/helpers";
import { publicRoutes } from "../../utils/routes";
import { Blog, ResponseItems } from "../../utils/types";

type Props = {
  blogData: ResponseItems<Blog>;
};

const LIMIT = 12;

const Page = ({ blogData }: Props) => {
  const router = useRouter();

  const handleChange = (page: number) => {
    const paramsObj: any = {};
    if (page > 1) paramsObj.p = page;
    let searchParams: string = new URLSearchParams(paramsObj).toString();
    if (searchParams !== "") searchParams = "?" + searchParams;
    router.push(`${window.location.origin}/blog${searchParams}`);
  };

  return (
    <>
      <Head>
        <title>Danh sách bài viết</title>
      </Head>
      <DefaultLayout>
        <Container maxWidth="lg">
          <Grid container columnSpacing={2} rowSpacing={2}>
            {blogData.items.map((blog) => {
              return (
                <Grid item xs={12} xl={3} md={6} lg={4} key={blog.id}>
                  <Link
                    href={publicRoutes.blogDetail(blog.slug)}
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      width: "100%",
                      paddingBottom: "66.7%",
                      display: "block",
                    }}
                  >
                    <Image
                      src={blog.thumbnail}
                      fill={true}
                      alt=""
                      sizes="(max-width:600px) 100vw"
                    />
                  </Link>
                  <Link
                    href={publicRoutes.blogDetail(blog.slug)}
                    className="three-dot three-dot-2"
                    style={{ marginBlock: 8 }}
                  >
                    {blog.title}
                  </Link>
                  <div style={{ color: "gray" }}>
                    {formatDateTime(blog.createdAt)}
                  </div>
                </Grid>
              );
            })}
            <Grid item xs={12}>
              <Pagination
                count={Math.ceil(blogData.count / LIMIT)}
                sx={{ ul: { justifyContent: "center" } }}
                variant="outlined"
                shape="rounded"
                showLastButton
                showFirstButton
                page={+`${router.query.p}` || 1}
                onChange={(e, page) => handleChange(page)}
              />
            </Grid>
          </Grid>
        </Container>
      </DefaultLayout>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let blogData = EMPTY_ITEMS;
  try {
    const { p } = context.query;
    const { message, data } = await getAllBlogsPublic({
      limit: LIMIT,
      p: +`${p}` || 1,
      ...context.query,
    });
    if (message === MSG_SUCCESS) blogData = data;
  } catch (error) {
    return { notFound: true };
  }
  return { props: { blogData } };
}

export default Page;
