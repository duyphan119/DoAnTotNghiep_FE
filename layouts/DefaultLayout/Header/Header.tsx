import { useEffect } from "react";
import { GroupProductRepository } from "../../../repositories";
import Bottom from "./Bottom";
import Top from "./Top";

type Props = {};

const Header = (props: Props) => {
  useEffect(() => {
    const repo = new GroupProductRepository();
    repo.getAll();
  }, []);

  return (
    <header>
      <Top />
      <Bottom />
    </header>
  );
};

export default Header;
