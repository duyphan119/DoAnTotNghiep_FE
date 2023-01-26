import Link from "next/link";
import React, { useEffect } from "react";
import { getAllGroupProducts } from "../../../../../apis/groupProduct";
import {
  GroupProductHeader,
  useGroupProductContext,
} from "../../../../../context/GroupProductContext";
import { MSG_SUCCESS } from "../../../../../utils/constants";
import { publicRoutes } from "../../../../../utils/routes";
import { GroupProduct } from "../../../../../utils/types";
import styles from "../style.module.css";
type Props = {};

const Categories = (props: Props) => {
  const { headerData, setHeaderData } = useGroupProductContext();

  useEffect(() => {
    const fetchGroupProducts = async () => {
      try {
        const res = await getAllGroupProducts({
          forHeader: true,
        });
        const { message, data } = res;
        if (message === MSG_SUCCESS) {
          setHeaderData(data);
        }
      } catch (error) {
        console.log("FETCH GROUP PRODUCTS ERROR", error);
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
      {/* <ul className={styles["contact"]}>
        <li className={styles["email"]}>Email: duychomap123@gmail.com</li>
        <li className={styles["phone"]}>Hotline: 1900 585878</li>
      </ul> */}
    </nav>
  );
};

export default Categories;
