import { ChangePasswordForm } from "@/components";
import { AccountLayout } from "@/layouts";
import { requireLoginProps } from "@/lib";
import { UserModel } from "@/models";
import { UserJson } from "@/types/json";
import Head from "next/head";
import { GetServerSidePropsContext } from "next/types";

type Props = {
  profile: UserJson | null;
};

const Page = ({ profile }: Props) => {
  return (
    <AccountLayout titleHeading="Đổi mật khẩu" profile={new UserModel(profile)}>
      <>
        <Head>
          <title>Đổi mật khẩu</title>
        </Head>
        <ChangePasswordForm />
      </>
    </AccountLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireLoginProps(context);
};

export default Page;
