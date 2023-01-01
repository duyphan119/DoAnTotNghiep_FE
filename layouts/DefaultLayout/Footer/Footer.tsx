import React from "react";
import { Container, Grid } from "@mui/material";
import styles from "./style.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { useGroupProductContext } from "../../../context/GroupProductContext";
import { GroupProduct } from "../../../utils/types";
import Link from "next/link";

type Props = {};

type Policy = {
  href: string;
  label: string;
};

const policies: Policy[] = [
  {
    href: "/chinh-sach-doi-tra",
    label: "Chính sách đổi trả",
  },
  {
    href: "/chinh-sach-giao-hang",
    label: "Chính sách giao hàng",
  },
  {
    href: "/chinh-sach-bao-mat",
    label: "Chính sách bảo mật",
  },
  {
    href: "/dieu-khoan-dich-vu",
    label: "Điều khoản dịch vụ",
  },
  {
    href: "/lien-he",
    label: "Liên hệ",
  },
];

const Footer = (props: Props) => {
  const { groupProducts } = useGroupProductContext();
  return (
    <footer className={styles.footer}>
      <Container maxWidth="lg">
        <Grid container columnSpacing={3} rowSpacing={3}>
          <Grid item xs={12}>
            <div className={styles["email-register"]}>
              <h1>Đăng ký nhận bản tin</h1>
              <div className={styles.description}>
                Để cập nhật những sản phẩm mới, nhận thông tin ưu đãi đặc biệt
                và thông tin giảm giá khác.
              </div>
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" />
                  <label htmlFor="" className="form-label">
                    Email đăng ký
                  </label>
                </div>
                <button type="submit">Đăng ký</button>
              </form>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <div className={styles.title}>Giới thiệu</div>
            <p>
              DUS chuyên cung cấp các loại mặt hàng thời trang với giá cả ưu đãi
              nhất thị trường
            </p>
            <ul>
              <li>
                <LocationOnIcon /> 450 Lê Văn Việt, Phường Tăng Nhơn Phú A, Tp.
                Thủ Đức, Tp. HCM
              </li>
              <li>
                <LocalPhoneIcon /> 0385981196
              </li>
              <li>
                <EmailIcon /> 6051071019@st.utc2.edu.vn
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <div className={styles.title}>Sản phẩm</div>
            <Grid container columnSpacing={1} rowSpacing={1}>
              {groupProducts.map((groupProduct: GroupProduct) => {
                return (
                  <Grid item xs={6} key={groupProduct.id}>
                    <Link href={`/san-phan/group-product/${groupProduct.slug}`}>
                      {groupProduct.name}
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <div className={styles.title}>Chính sách</div>
            <ul>
              {policies.map((policy: Policy) => {
                return (
                  <li key={policy.href}>
                    <Link href={policy.href}>{policy.label}</Link>
                  </li>
                );
              })}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <div className={styles.title}>Fanpage Chúng tôi</div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
