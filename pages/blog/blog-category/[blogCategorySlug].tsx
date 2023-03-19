import { Box, Container, Grid } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import { BlogApi, BlogCategoryApi } from "@/api";
import { DefaultLayout } from "@/layouts";
import { BlogCard, Breadcrumbs, ButtonControl } from "@/components";
import { BlogModel, ResponseGetAllModel } from "@/models";
import { BlogJson } from "@/types/json";
import styles from "@/styles/_BlogCategory.module.scss";
import { publicRoutes } from "@/utils/routes";

type Props = {
  blogDataJson: { items: BlogJson[]; count: number };
  blogCategoryName: string;
};

const LIMIT = 12;
const bApi = new BlogApi();

enum Actions {
  EXPAND = "Xem thêm",
  COLLAPSE = "Thu gọn",
  FETCH_DATA = "Lấy dữ liệu bài viết",
}

type State = {
  limit: number;
  blogData: ResponseGetAllModel<BlogModel>;
};

const reducer = (state: State, action: { type: string; payload?: any }) => {
  const { type, payload } = action;
  switch (type) {
    case Actions.FETCH_DATA: {
      const { blogData, limit } = payload;
      return {
        ...state,
        blogData,
        limit,
      };
    }

    default: {
      return state;
    }
  }
};

const Page = ({ blogDataJson: { items, count }, blogCategoryName }: Props) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, {
    limit: LIMIT,
    blogData: new ResponseGetAllModel(bApi.getListFromJson(items), count),
  } as State);
  const { blogData, limit } = state as State;

  const isExpandable = limit < blogData.count;
  const isCollapsed = limit !== LIMIT && limit >= blogData.count;

  const handleClick = () => {
    const { blogCategorySlug } = router.query;

    const fetchData = async (limit: number, blogCategorySlug: string) => {
      try {
        const blogData = await bApi.getAll({
          limit,
          blogCategorySlug,
        });

        dispatch({
          type: Actions.FETCH_DATA,
          payload: { blogData, limit },
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(isExpandable ? limit + LIMIT : LIMIT, `${blogCategorySlug}`);
  };

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{blogCategoryName || "Danh mục bài viết"}</title>
        </Head>
      </>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs
          links={[
            {
              label: "Trang chủ",
              href: publicRoutes.home,
            },
            {
              label: "Bài viết",
              href: publicRoutes.blogs,
            },
          ]}
          current={blogCategoryName}
          currentWrap={true}
          sx={{ my: 2 }}
          currentstyle={{ fontSize: 24, marginBlock: 8 }}
        />
      </div>
      <Container maxWidth="lg">
        <Grid container columnSpacing={2} rowSpacing={2}>
          {blogData.items.map((blog) => {
            return (
              <Grid item xs={12} lg={4} key={blog.id}>
                <BlogCard blog={blog} />
              </Grid>
            );
          })}
          {isExpandable || isCollapsed ? (
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <ButtonControl onClick={handleClick}>
                {isExpandable ? "Xem thêm" : "Thu gọn"}
              </ButtonControl>
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </DefaultLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { blogCategorySlug } = context.query;
  const bcApi = new BlogCategoryApi();
  if (blogCategorySlug) {
    try {
      const [blogDataJson, blogCategoryDataJson] = await Promise.all([
        bApi.getAllJson({
          limit: LIMIT,
          blogCategorySlug: `${blogCategorySlug}`,
        }),
        bcApi.getAll({
          slug: `${blogCategorySlug}`,
        }),
      ]);
      return {
        props: {
          blogDataJson,
          blogCategoryName:
            blogCategoryDataJson.count > 0
              ? blogCategoryDataJson.items[0].name
              : "",
        },
      };
    } catch (error) {}
  }
  return { notFound: true };
}

export default Page;
