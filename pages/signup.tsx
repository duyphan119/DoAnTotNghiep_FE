import { AuthForm } from "@/components";
import { DefaultLayout } from "@/layouts";
import { noRequireLoginProps } from "@/lib";
import { UserModel } from "@/models";
import { UserJson } from "@/types/json";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

type Props = {
  profile: UserJson | null;
};

const Page = ({ profile }: Props) => {
  return (
    <DefaultLayout profile={new UserModel(profile)}>
      <Head>
        <title>Đăng ký tài khoản</title>
      </Head>
      <AuthForm action="signup" />
    </DefaultLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return noRequireLoginProps(context);
};

export default Page;
