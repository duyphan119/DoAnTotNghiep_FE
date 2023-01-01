import { createContext, ReactNode, useContext, useState } from "react";
import { GroupProduct } from "../utils/types";

const GroupProductContext = createContext<any>({});

type Props = {
  children?: ReactNode;
};

const GroupProductWrapper = ({ children }: Props) => {
  const [groupProducts, setGroupProducts] = useState<GroupProduct[]>([]);

  return (
    <GroupProductContext.Provider
      value={{
        groupProducts,
        setGroupProducts,
      }}
    >
      {children}
    </GroupProductContext.Provider>
  );
};

export function useGroupProductContext() {
  return useContext(GroupProductContext);
}
export default GroupProductWrapper;
