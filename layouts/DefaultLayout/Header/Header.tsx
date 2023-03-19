import { GroupProductApi } from "@/api";
import { useEffect } from "react";
import Bottom from "./Bottom";
import Top from "./Top";

type Props = {};

const Header = (props: Props) => {
  useEffect(() => {
    const gpApi = new GroupProductApi();
    gpApi.getAll();
  }, []);

  return (
    <header>
      <Top />
      <Bottom />
    </header>
  );
};

export default Header;
