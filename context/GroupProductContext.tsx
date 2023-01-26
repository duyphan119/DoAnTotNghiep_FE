import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAllGroupProducts } from "../apis/groupProduct";
import { MSG_SUCCESS } from "../utils/constants";
import { GroupProduct } from "../utils/types";

const GroupProductContext = createContext<any>({});

type Props = {
  children?: ReactNode;
};

export type GroupProductHeader = {
  name: string;
  slug: string;
  items: GroupProduct[];
};

const GroupProductWrapper = ({ children }: Props) => {
  const [groupProducts, setGroupProducts] = useState<GroupProduct[]>([]);
  const [headerData, setHeaderData] = useState<GroupProductHeader[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, message } = await getAllGroupProducts({
          sortType: "asc",
          sortBy: "slug",
        });

        if (message === MSG_SUCCESS) {
          setGroupProducts(data.items);
        }
      } catch (error) {
        console.log("GET ALL GROUP PRODUCTS ERROR", error);
      }
    };

    fetchData();
  }, []);

  return (
    <GroupProductContext.Provider
      value={{
        groupProducts,
        setGroupProducts,
        headerData,
        setHeaderData,
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
