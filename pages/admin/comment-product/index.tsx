import { Avatar, Box, Divider, Rating } from "@mui/material";
import moment from "moment";
import "moment/locale/vi";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { ButtonControl, DataManagement, TextAreaControl } from "@/components";
import { AdminLayout } from "@/layouts";
import {
  CommentProductModel,
  RepCommentProductModel,
  UserModel,
} from "@/models";
import { authSelector } from "@/redux/slice/authSlice";
import {
  commentProductActions,
  commentProductReducer,
  commentProductSelector,
} from "@/redux/slice/commentProductSlice";
import { confirmDialogActions } from "@/redux/slice/confirmDialogSlice";
import { fetchSelector } from "@/redux/slice/fetchSlice";
import { useAppDispatch } from "@/redux/store";
import helper from "@/utils/helpers";
import { publicRoutes } from "@/utils/routes";
import { UserJson } from "@/types/json";
import { requireAdminProps } from "@/lib";
import { GetServerSidePropsContext } from "next";
import { useDefaultLayoutContext } from "@/context/DefaultLayoutContext";

type Props = { profile: UserJson | null };

const LIMIT = 10;

const Comment = ({
  item,
  onClickRep,
}: {
  item: CommentProductModel;
  onClickRep: (id: number) => void;
}) => {
  const appDispatch = useAppDispatch();
  const { profile } = useDefaultLayoutContext();
  // const { profile } = useSelector(authSelector);

  const handleRep = (id: number) => {
    onClickRep(id);
  };

  const handleSoftDeleteSingle = (id: number) => {
    appDispatch(
      confirmDialogActions.show({
        onConfirm: () => {
          // appDispatch(o)
        },
      })
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        gap: "12px",
      }}
    >
      <Avatar>{helper.getAvatarName(item.user.fullName)}</Avatar>
      <Box>
        <Box sx={{ display: "flex" }}>
          <strong>{item.user.fullName}</strong>
          &nbsp;-&nbsp;
          <Link
            href={publicRoutes.productDetail(item.product.slug)}
            className="text-hover"
          >
            {item.product.name}
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "3px",
          }}
        >
          <Rating size="small" value={item.star} readOnly />
          &nbsp;-&nbsp;
          <span style={{ fontSize: 12, color: "gray" }}>
            {moment(item.createdAt).fromNow()}
          </span>
        </Box>
        <Box sx={{ marginTop: "6px" }}>{item.content}</Box>
        <Box
          sx={{
            marginTop: "6px",
            button: {
              border: "none",
              background: "inherit",
              textDecoration: "underline",
              marginRight: "12px",
              "&:last-child": {
                marginRight: 0,
              },
              deleteCommentProduct: {
                color: "red",
              },
            },
          }}
        >
          {item.userId !== profile.id ? (
            <>
              <button onClick={() => handleRep(item.id)}>Trả lời</button>
            </>
          ) : null}
          {item.userId === profile.id ? (
            <>
              <button>Sửa</button>
              <button
                className="deleteCommentProduct"
                onClick={() => handleSoftDeleteSingle(item.id)}
              >
                Xoá
              </button>
            </>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

const RepComment = ({
  item,
  repIsEditing,
  onClickUpdate,
}: {
  item: RepCommentProductModel;
  repIsEditing: number;
  onClickUpdate: (id: number) => void;
}) => {
  const appDispatch = useAppDispatch();
  const { profile } = useDefaultLayoutContext();
  // const { profile } = useSelector(authSelector);

  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (textRef.current) {
      const value = textRef.current.value;
      appDispatch(
        commentProductActions.fetchUpdateRep({
          id: item.id,
          dto: {
            content: value,
            commentProductId: item.commentProductId,
          },
        })
      );
    }
  };

  const handleClickUpdate = (id: number) => {
    onClickUpdate(id);
  };

  const handleDelete = () => {
    appDispatch(
      confirmDialogActions.show({
        onConfirm: () => {
          appDispatch(commentProductActions.fetchDeleteRep(item.id));
        },
      })
    );
  };

  return (
    <Box sx={{ paddingLeft: "48px", marginTop: "12px" }}>
      <Box
        sx={{
          display: "flex",
          gap: "12px",
        }}
      >
        <Avatar>{helper.getAvatarName(item.user.fullName)}</Avatar>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <strong>{item.user.fullName}</strong>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "3px",
            }}
          >
            <span style={{ fontSize: 12, color: "gray" }}>
              {moment(item.createdAt).fromNow()}
            </span>
          </Box>
          <Box sx={{ marginTop: "6px" }}>
            {repIsEditing === item.id ? (
              <form onSubmit={handleSubmit}>
                <TextAreaControl
                  ref={textRef}
                  defaultValue={item.content}
                  label="Câu trả lời của bạn"
                />
                <ButtonControl type="submit">Sửa</ButtonControl>
              </form>
            ) : (
              item.content
            )}
          </Box>
          <Box
            sx={{
              marginTop: "6px",
              button: {
                border: "none",
                background: "inherit",
                textDecoration: "underline",
                marginRight: "12px",
                "&:last-child": {
                  marginRight: 0,
                },
              },
            }}
          >
            {item.userId === profile.id ? (
              <>
                <button onClick={() => handleClickUpdate(item.id)}>Sửa</button>
                <button style={{ color: "red" }} onClick={handleDelete}>
                  Xoá
                </button>
              </>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const FormRep = ({ commentProductId }: { commentProductId: number }) => {
  const appDispatch = useAppDispatch();

  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (textRef.current) {
      const value = textRef.current.value;
      appDispatch(
        commentProductActions.fetchCreateRep({
          content: value,
          commentProductId,
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextAreaControl ref={textRef} label="Câu trả lời của bạn" />
      <ButtonControl type="submit">Trả lời</ButtonControl>
    </form>
  );
};

const Page = ({ profile }: Props) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { isSuccess, reducer } = useSelector(fetchSelector);
  const { commentProductData } = useSelector(commentProductSelector);
  const [repFor, setRepFor] = useState<number>(0);
  const [repIsEditing, setRepIsEditing] = useState<number>(0);

  const handleRep = (id: number) => {
    setRepFor((state) => (state === id ? 0 : id));
  };

  const handleUpdateRep = (id: number) => {
    setRepIsEditing((state) => (state === id ? 0 : id));
  };

  useEffect(() => {
    if (reducer === commentProductReducer.fetchCreateRep && isSuccess) {
      setRepFor(0);
    }
    if (reducer === commentProductReducer.fetchUpdateRep && isSuccess) {
      setRepIsEditing(0);
    }
  }, [reducer, isSuccess]);

  useEffect(() => {
    const { p, sortBy, sortType } = router.query;
    appDispatch(
      commentProductActions.fetchGetAll({
        p: +`${p}` || 1,
        limit: LIMIT,
        sortBy: `${sortBy || "id"}`,
        sortType: `${sortType}` === "ASC" ? "ASC" : "DESC",
        product: true,
        repComments: true,
      })
    );
  }, [router.query]);

  return (
    <AdminLayout pageTitle="Đánh giá sản phẩm" profile={new UserModel(profile)}>
      <Fragment>
        <Head>
          <title>Danh sách các bài đánh giá sản phẩm</title>
        </Head>
        <DataManagement
          count={commentProductData.count}
          hideCreateBtn={true}
          paperTitle="Các bài đánh giá sản phẩm"
          limit={LIMIT}
          sorts={[
            {
              label: "Ngày đăng tăng đần",
              sortBy: "createdAt",
              sortType: "ASC",
            },
            {
              label: "Ngày đăng giảm đần",
              sortBy: "createdAt",
              sortType: "DESC",
            },
            {
              label: "Tên sản phẩm tăng đần",
              sortBy: "productName",
              sortType: "ASC",
            },
            {
              label: "Tên sản phẩm giảm đần",
              sortBy: "productName",
              sortType: "DESC",
            },
          ]}
        >
          {commentProductData.items.map((item, index) => {
            return (
              <Fragment key={item.id}>
                {index > 0 ? <Divider sx={{ my: 2 }} /> : null}
                <Box>
                  <Comment item={item} onClickRep={handleRep} />
                  {item.repComments.map((subItem) => {
                    return (
                      <RepComment
                        repIsEditing={repIsEditing}
                        key={subItem.id}
                        item={subItem}
                        onClickUpdate={handleUpdateRep}
                      />
                    );
                  })}
                  {repFor === item.id ? (
                    <Box sx={{ paddingLeft: "48px", marginTop: "12px" }}>
                      <FormRep commentProductId={repFor} />
                    </Box>
                  ) : null}
                </Box>
              </Fragment>
            );
          })}
        </DataManagement>
      </Fragment>
    </AdminLayout>
  );
};
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireAdminProps(context);
};

export default Page;
