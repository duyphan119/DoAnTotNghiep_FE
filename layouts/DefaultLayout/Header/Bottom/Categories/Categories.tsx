import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllGroupProducts } from "../../../../../apis/groupProduct";
import {
  groupProductActions,
  groupProductSelector,
} from "../../../../../redux/slice/groupProductSlice";
import { useAppDispatch } from "../../../../../redux/store";
import { MSG_SUCCESS } from "../../../../../utils/constants";
import { publicRoutes } from "../../../../../utils/routes";
import { GroupProduct, GroupProductHeader } from "../../../../../utils/types";
import styles from "../style.module.css";
type Props = {};

const Categories = (props: Props) => {
  const appDispatch = useAppDispatch();
  const { headerData } = useSelector(groupProductSelector);

  useEffect(() => {
    const fetchGroupProducts = async () => {
      try {
        const res = await getAllGroupProducts({
          forHeader: true,
        });
        const { message, data } = res;
        if (message === MSG_SUCCESS) {
          appDispatch(groupProductActions.setHeaderData(data));
        }
      } catch (error) {
        console.log("FETCH GROUP PRODUCTS HEADER DATA ERROR", error);
      }
    };
    fetchGroupProducts();
  }, []);

  return (
    <nav className={styles.categories}>
      <ul className={styles.navItems}>
        {headerData.map((headerItem: GroupProductHeader) => {
          return (
            <li className={styles.navItem} key={headerItem.slug}>
              <Link
                href={`/product/group-product/${headerItem.slug}`}
                className={styles.navItemLink}
              >
                {headerItem.name}
              </Link>
              {headerItem.items.length > 0 ? (
                <ul className={styles.menu}>
                  {headerItem.items.map((item: GroupProduct) => {
                    return (
                      <li className={styles["menu-item"]} key={item.id}>
                        <Link
                          href={`/product/group-product/${item.slug}`}
                          className={styles["menu-item-link"]}
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
        <li className={styles.navItem}>
          <Link href={publicRoutes.blogs} className={styles.navItemLink}>
            Bài viết
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/lien-he" className={styles.navItemLink}>
            Liên hệ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Categories;
