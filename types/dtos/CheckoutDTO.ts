type CheckoutDTO = {
  province: string;
  district: string;
  ward: string;
  address: string;
  paymentMethod: string;
  shippingPrice: number;
  fullName: string;
  phone: string;
  point: number;
  total: number;
};
export default CheckoutDTO;
