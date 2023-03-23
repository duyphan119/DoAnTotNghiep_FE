import { UserJson } from "@/types/json";
import { publicRoutes } from "@/utils/routes";
import { GetServerSidePropsContext } from "next/types";
import getProfileProps from "./getProfileProps";
const noRequireLoginProps = async (context: GetServerSidePropsContext) => {
  let profile: UserJson | null = null;
  try {
    profile = (await getProfileProps(context)).props.profile;
  } catch (error) {}
  if (profile) {
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

export default noRequireLoginProps;
