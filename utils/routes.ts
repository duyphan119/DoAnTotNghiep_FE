export const publicRoutes = {
  home: "/",
  search: (q?: string) => (q ? `/search?q=${q}` : "/search"),
  payment: "/payment",
  productDetail: (slug: string) => `/product/${slug}`,
  products: (slug?: string) =>
    slug ? `/product/group-product/${slug}` : "/product",
  paymentSuccess: "/payment/success",
  order: "/order",
  changePassword: "/change-password",
  cart: "/cart",
  blogs: "/blog",
  blogCategory: (slug: string) => `/blog/blog-category/${slug}`,
  blogDetail: (slug: string) => `/blog/${slug}`,
  adminSignin: "/admin/signin",
  userSignin: "/signin",
  userSignup: "/signup",
};

export const protectedRoutes = {
  admin: "/admin",
  profile: "/profile",
  address: "/address",
  myOrders: "/order",
  customerChangePassword: "/change-password",
  changePassword: "/admin/setting/change-password",

  userManagement: "/admin/account",
  createUser: "/admin/account/create",

  advertisementManagement: "/admin/advertisement",
  createAdvertisement: "/admin/advertisement/create",
  updateAdvertisement: (id: number) => `/admin/advertisement/${id}/update`,

  blogCategoryManagement: "/admin/blog-category",
  createBlogCategory: "/admin/blog-category/create",
  updateBlogCategory: (id: number) => `/admin/blog-category/${id}/update`,

  blog: "/admin/blog",
  createBlog: "/admin/blog/create",
  updateBlog: (id: number) => `/admin/blog/${id}/update`,
  previewBlog: (id: number) => `/admin/blog/${id}/preview`,

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
  createCommentProduct: "/admin/comment-product/create",
  updateCommentProduct: (id: number) => `/admin/comment-product/${id}/update`,

  orderDiscountManagement: "/admin/order-discount",
  createOrderDiscount: "/admin/order-discount/create",
  updateOrderDiscount: (id: number) => `/admin/order-discount/${id}/update`,

  notificationTypeManagement: "/admin/notification-type",
  createNotificationType: "/admin/notification-type/create",
  updateNotificationType: (id: number) =>
    `/admin/notification-type/${id}/update`,

  notificationManagement: "/admin/notification",
  createNotification: "/admin/notification/create",
  updateNotification: (id: number) => `/admin/notification/${id}/update`,

  variantManagement: "/admin/variant",
  createVariant: "/admin/variant/create",
  updateVariant: (id: number) => `/admin/variant/${id}/update`,

  variantValueManagement: "/admin/variant-value",
  createVariantValue: "/admin/variant-value/create",
  updateVariantValue: (id: number) => `/admin/variant-value/${id}/update`,

  statistics: "/admin/statistics",
};
