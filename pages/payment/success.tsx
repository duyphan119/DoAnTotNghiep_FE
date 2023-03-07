import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { NotFound } from "../../components";
import checkoutSuccessSvg from "../../public/checkout_success.svg";
import { orderSelector } from "../../redux/slice/orderSlice";
import { publicRoutes } from "../../utils/routes";
import styles from "../../styles/_CheckoutSuccess.module.scss";

type Props = {};

const CheckoutSuccess = (props: Props) => {
  const { isCheckoutSuccess } = useSelector(orderSelector);

  if (!isCheckoutSuccess) return <NotFound />;

  return (
    <>
      <Head>
        <title>Thanh toán đơn hàng thành công</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.wrapper}>
        <Image
          src={checkoutSuccessSvg}
          alt="Thành công"
          width={300}
          height={300}
          priority={true}
        />
        <p>
          Bạn đã đặt hàng <strong>thành công</strong>. Đơn hàng của bạn{" "}
          <strong>đang được xử lý</strong>. <br />
          Chúng tôi sẽ thông tin đến bạn và trạng thái đơn hàng thông qua{" "}
          <strong>Email</strong>
        </p>
        <Link href={publicRoutes.home} className={styles.link}>
          Quay về trang chủ
        </Link>
      </div>
    </>
  );
};

export default CheckoutSuccess;
