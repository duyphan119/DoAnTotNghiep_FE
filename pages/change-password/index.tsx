import { ChangePasswordForm } from "@/components";
import { AccountLayout } from "@/layouts";
import Head from "next/head";

type Props = {};

const Page = (props: Props) => {
  return (
    <AccountLayout titleHeading="Đổi mật khẩu">
      <>
        <Head>
          <title>Đổi mật khẩu</title>
        </Head>
        <ChangePasswordForm />
      </>
    </AccountLayout>
  );
};

export default Page;
