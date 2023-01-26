import Bottom from "./Bottom";
import Top from "./Top";

type Props = {};

const Header = (props: Props) => {
  return (
    <header>
      <Top />
      <Bottom />
    </header>
  );
};

export default Header;
