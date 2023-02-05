export const publicRoutes = {
  home: "/",
  search: (q: string) => `/search?q=${q}`,
  payment: "/payment",
  productDetail: (slug: string) => `/product/${slug}`,
  products: (slug?: string) =>
    slug ? `/product/group-product/${slug}` : "/product",
  paymentSuccess: "/payment/success",
  order: "/order",
  changePassword: "/change-password",
  cart: "/cart",
  blogs: "/blog",
  blogDetail: (slug: string) => `/blog/${slug}`,
  adminSignin: "/admin/signin",
};

export const protectedRoutes = {
  admin: "/admin",
  profile: "/profile",
  address: "/address",
  myOrders: "/order",
  userManagement: "/admin/account",
  changePassword: "/admin/setting/change-password",

  advertisementManagement: "/admin/advertisement",
  createAdvertisement: "/admin/advertisement/create",
  updateAdvertisement: (id: number) => `/admin/advertisement/${id}/update`,

  blogManagement: "/admin/blog",
  createBlog: "/admin/blog/create",
  updateBlog: (id: number) => `/admin/blog/${id}/update`,

  orderManagement: "/admin/order",
  createOrder: "/admin/order/create",
  updateOrder: (id: number) => `/admin/order/${id}/update`,

  productManagement: "/admin/product",
  createProduct: "/admin/product/create",
  updateProduct: (id: number) => `/admin/product/${id}/update`,

  settingProfile: "/admin/setting/profile",
  settingWebsite: "/admin/setting/website",

  groupProductManagement: "/admin/group-product",
  createGroupProduct: "/admin/group-product/create",
  updateGroupProduct: (id: number) => `/admin/group-product/${id}/update`,

  commentProductManagement: "/admin/comment-product",

  statistics: "/admin/statistics",
};
