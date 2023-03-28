import { Cart } from "@/components";
import { useDefaultLayoutContext } from "@/context/DefaultLayoutContext";
import { DefaultLayout } from "@/layouts";
import { getProfileProps } from "@/lib";
import { UserModel } from "@/models";
import { cartActions, cartReducer } from "@/redux/slice/cartSlice";
import { fetchSelector } from "@/redux/slice/fetchSlice";
import { useAppDispatch } from "@/redux/store";
import { UserJson } from "@/types/json";
import Head from "next/head";
import { GetServerSidePropsContext } from "next/types";
import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
  profile: UserJson | null;
};

const Page = ({ profile: profileJson }: Props) => {
  const { reducers } = useSelector(fetchSelector);

  const appDispatch = useAppDispatch();

  const profile = new UserModel(profileJson);

  return (
    <Fragment>
      <Head>
        <title>Giỏ hàng</title>
      </Head>
      <DefaultLayout profile={new UserModel(profile)}>
        {profile.id > 0 && !reducers.includes(cartReducer.fetchCart) ? (
          <div style={{ height: 400 }}></div>
        ) : (
          <Cart />
        )}
      </DefaultLayout>
    </Fragment>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { props } = await getProfileProps(context);
  return { props };
};

export default Page;
