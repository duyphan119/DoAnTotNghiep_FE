import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import styles from "../style.module.css";
import { Product, ResponseItems } from "../../../../../utils/types";
import { getAllProducts as apiSearch } from "../../../../../apis/product";
import { MSG_SUCCESS } from "../../../../../utils/constants";
import Link from "next/link";
import Image from "next/image";
import { ClickAwayListener } from "@mui/material";
import { useRouter } from "next/router";
import { rangePrice } from "../../../../../utils/helpers";
import { publicRoutes } from "../../../../../utils/routes";

type Props = Partial<{
  open: boolean;
}>;

const SearchInput = ({ open }: Props) => {
  const [productData, setProductData] = useState<ResponseItems<Product>>({
    items: [],
    count: 0,
  });
  const [q, setQ] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
  };

  const search = async () => {
    try {
      if (q === "") {
        setProductData({
          items: [],
          count: 0,
        });
      } else {
        const { message, data } = await apiSearch({
          q,
          limit: 3,
          product_variants: true,
        });
        if (message === MSG_SUCCESS) {
          setProductData(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlur = () => {
    setVisible(false);
  };

  const handleFocus = () => {
    setVisible(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleBlur();
    router.push(`/tim-kiem?q=${q}`);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      search();
    }, 555);

    return () => clearTimeout(timerId);
  }, [q]);

  return open ? (
    <ClickAwayListener onClickAway={handleBlur}>
      <>
        <form className={styles.search} onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Nhập từ khóa cần tìm"
            value={q}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <button type="submit">
            <SearchOutlinedIcon />
          </button>
          {visible && productData.count > 0 && (
            <div className={styles["search-result-wrapper"]}>
              <ul>
                {productData.items.map((product: Product) => {
                  return (
                    <li key={product.id}>
                      <Link
                        href={`/product/${product.slug}`}
                        className={styles.link}
                      >
                        <Image
                          src={product.thumbnail}
                          alt=""
                          width={64}
                          height={64}
                          priority={true}
                        />
                        <div className={styles.product}>
                          <div className={styles.name}>{product.name}</div>
                          <div className={styles.price}>
                            {rangePrice(product, "", "đ")}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                href={publicRoutes.search(q)}
                className={styles["view-all"]}
              >
                Xem tất cả
              </Link>
            </div>
          )}
        </form>
      </>
    </ClickAwayListener>
  ) : null;
};

export default SearchInput;
