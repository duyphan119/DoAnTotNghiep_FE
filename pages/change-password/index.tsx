import Head from "next/head";
import { ChangePassword } from "../../apis/auth";
import ChangePasswordForm from "../../components/form/ChangePasswordForm";
import { AccountLayout } from "../../layouts";

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
