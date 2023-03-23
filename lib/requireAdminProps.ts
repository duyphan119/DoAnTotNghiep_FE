import { UserJson } from "@/types/json";
import { publicRoutes } from "@/utils/routes";
import { GetServerSidePropsContext } from "next/types";
import getProfileProps from "./getProfileProps";
const requireLoginProps = async (context: GetServerSidePropsContext) => {
  let profile: UserJson | null = null;
  try {
    profile = (await getProfileProps(context)).props.profile;
  } catch (error) {}
  if (!profile || !profile.isAdmin) {
    return {
      redirect: {
        destination: publicRoutes.adminSignin,
        permanent: false,
      },
    };
  }
  return {
    props: { profile },
  };
};

export default requireLoginProps;
