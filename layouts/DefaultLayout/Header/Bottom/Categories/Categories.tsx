import { groupProductSelector } from "@/redux/slice/groupProductSlice";
import { publicRoutes } from "@/utils/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./_style.module.scss";
type Props = {};

const Categories = (props: Props) => {
  const router = useRouter();

  const { groupProductHeaders } = useSelector(groupProductSelector);

  const active = useMemo(() => {
    if (router.pathname === "/product/group-product/[group_product_slug]") {
      const { group_product_slug: slug } = router.query;

      const index = groupProductHeaders.findIndex(
        (item) => slug && `${slug}`.indexOf(item.slug) !== -1
      );
      if (index !== -1) return groupProductHeaders[index].slug;
    }
    return "";
  }, [router.pathname, router.query, groupProductHeaders]);

  return (
    <nav className={styles.categories}>
      <ul className={styles.navItems}>
        {groupProductHeaders.map((headerItem) => {
          return (
            <li className={styles.navItem} key={headerItem.slug}>
              <Link
                href={publicRoutes.products(headerItem.slug)}
                className={`${styles.navItemLink} ${
                  active === headerItem.slug ? styles.active : ""
                }`}
              >
                {headerItem.name}
              </Link>
              {headerItem.items.length > 0 ? (
                <ul className={styles.menu}>
                  {headerItem.items.map((item) => {
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
          <Link
            href={publicRoutes.blogs}
            className={`${styles.navItemLink} ${
              router.pathname === publicRoutes.blogs ? styles.active : ""
            }`}
          >
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
