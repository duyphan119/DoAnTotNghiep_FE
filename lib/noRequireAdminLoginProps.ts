import { UserJson } from "@/types/json";
import { protectedRoutes, publicRoutes } from "@/utils/routes";
import { GetServerSidePropsContext } from "next/types";
import getProfileProps from "./getProfileProps";
const noRequireAdminLoginProps = async (context: GetServerSidePropsContext) => {
  let profile: UserJson | null = null;
  try {
    profile = (await getProfileProps(context)).props.profile;
  } catch (error) {}
  if (profile && profile.isAdmin) {
    return {
      redirect: {
        destination: protectedRoutes.admin,
        permanent: false,
      },
    };
  }
  if (profile && !profile.isAdmin) {
    return {
      redirect: {
        destination: publicRoutes.home,
        permanent: false,
      },
    };
  }
  return {
    props: { profile },
  };
};

export default noRequireAdminLoginProps;
