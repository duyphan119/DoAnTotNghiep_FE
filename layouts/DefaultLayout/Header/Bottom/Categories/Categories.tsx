import Link from "next/link";
import { useSelector } from "react-redux";
import { groupProductManagementSelector } from "../../../../../redux/slice/groupProductManagementSlice";
import { publicRoutes } from "../../../../../utils/routes";
import { GroupProduct, GroupProductHeader } from "../../../../../utils/types";
import styles from "../style.module.css";
type Props = {};

const Categories = (props: Props) => {
  const { headerData } = useSelector(groupProductManagementSelector);

  return (
    <nav className={styles.categories}>
      <ul className={styles.navItems}>
        {headerData.map((headerItem: GroupProductHeader) => {
          return (
            <li className={styles.navItem} key={headerItem.slug}>
              <Link
                href={publicRoutes.products(headerItem.slug)}
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
                          href={publicRoutes.products(item.slug)}
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
