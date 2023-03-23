import { UserApi } from "@/api";
import { UserJson } from "@/types/json";
import { COOKIE_ACCESSTOKEN_NAME } from "@/utils/constants";
import { GetServerSidePropsContext } from "next/types";

const getProfileProps = async (context: GetServerSidePropsContext) => {
  let profile: UserJson | null = null;
  try {
    const accessToken = context.req.cookies[COOKIE_ACCESSTOKEN_NAME];
    const uApi = new UserApi();

    profile = await uApi.getProfileJson(accessToken, context.req.cookies.RT);
  } catch (error) {}

  return {
    props: {
      profile,
    },
  };
};
export default getProfileProps;
