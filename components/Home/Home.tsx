import {
  AdvertisementModel,
  BlogModel,
  GroupProductHeaderModel,
  ProductModel,
} from "@/models";
import { FC, Fragment } from "react";
import Advertisements from "./Advertisements";
import Blogs from "./Blogs";
import GroupProductHeaders from "./GroupProductHeaders";
import Products from "./Products";
import styles from "./_style.module.scss";

type Props = {
  advertisements: AdvertisementModel[];
  groupProductHeaders: GroupProductHeaderModel[];
  products: ProductModel[];
  blogs: BlogModel[];
};

const Home: FC<Props> = ({
  advertisements,
  groupProductHeaders,
  products,
  blogs,
}) => {
  return (
    <main className={styles.main}>
      <Advertisements advertisements={advertisements} />
      {groupProductHeaders.length > 0 ? (
        <Fragment>
          <h1 className={styles.h1}>Danh mục nổi bật</h1>
          <GroupProductHeaders groupProductHeaders={groupProductHeaders} />
        </Fragment>
      ) : null}
      {products.length > 0 ? (
        <Fragment>
          <h1 className={styles.h1}>Sản phẩm mới</h1>
          <Products products={products} />
        </Fragment>
      ) : null}
      {blogs.length > 0 ? (
        <Fragment>
          <h1 className={styles.h1}>Bài viết</h1>
          <Blogs blogs={blogs} />
        </Fragment>
      ) : null}
    </main>
  );
};

export default Home;
