export type Action = {
  payload?: any;
  type?: string;
};
export type SortParams = {
  sortBy?: string;
  sortType?: string;
};
export type PaginationParams = {
  p?: string | number;
  limit?: string | number;
};
export type QueryParams = { withDeleted?: boolean } & SortParams &
  PaginationParams;
export type SearchQueryParams = {
  q?: string;
} & QueryParams;

type Timestamp = {
  createdAt: string;
  updatedAt: string;
} & Partial<{ deletedAt: string | null }>;
export type SettingWebsite = {
  id: number;
  key: string;
  value: string;
};
export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
} & Timestamp &
  Partial<{ blogs: Blog[] }>;
export type Blog = {
  id: number;
  heading: string;
  title: string;
  content: string;
  slug: string;
  thumbnail: string;
  userId: number;
  blogCategoryId: number;
} & Timestamp &
  Partial<{ blogCategory: BlogCategory }>;
export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  groupProductId: number;
  price: number;
  inventory: number;
  detail: string;
  star: number;
} & Timestamp &
  Partial<{
    images: ProductVariantImage[];
    productVariants: ProductVariant[];
    groupProduct: GroupProduct;
    minPrice: number;
    maxPrice: number;
  }>;

export type CommentProduct = {
  id: number;
  productId: number;
  userId: number;
  star: number;
  content: string;
} & Timestamp &
  Partial<{
    user: User;
    product: Product;
  }>;

export type Variant = {
  id: number;
  name: string;
  variantValues: VariantValue[];
} & Timestamp;

export type VariantValue = {
  id: number;
  value: string;
} & Timestamp &
  Partial<{ variant: Variant }>;

export type ProductVariant = {
  id: number;
  inventory: number;
  price: number;
  productId: number;
  product: Product;
  name: string;
  variantValues: VariantValue[];
} & Timestamp;

export type ProductVariantImage = {
  id: number;
  productId: number;
  variantValueId: number | null;
  path: string;
} & Timestamp;
export type CartItem = {
  // productId: number;
  quantity: number;
  productVariantId: number;
} & Partial<{
  productVariant: ProductVariant;
  // product: Product;
}>;
export type OrderDiscount = {
  id: number;
  code: string;
  value: number;
  minValue: number;
  start: string;
  end: string;
} & Timestamp;
export type Order = {
  id: number;
  province: string;
  district: string;
  ward: string;
  address: string;
  fullName: string;
  phone: string;
  status: "Đang xử lý" | "Đang vận chuyển" | "Vận chuyển thành công" | null;
  paymentMethod: string;
  shippingPrice: number;
  userId: number;
  discountId: number | null;
  user: User;
  items: OrderItem[];
  allowCannceled: boolean;
  isPaid: boolean;
  isOrdered: boolean;
  orderDate: string;
} & Timestamp &
  Partial<{
    discount: OrderDiscount;
  }>;
export type OrderItem = CartItem & {
  price: number;
  id: number;
} & Partial<{ order: Order }>;
export type Cart = {
  items: OrderItem[];
};
export type User = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  point: number;
} & Timestamp;
export type Sex = "Nam" | "Nữ" | "Unisex";
export type GroupProduct = {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  sex: Sex;
  isAdult: boolean;
} & Timestamp;

export type UserAddress = {
  id: number;
  userId: number;
  province: string;
  district: string;
  ward: string;
  address: string;
} & Timestamp;

export type Notification = {
  id: number;
  message: string;
  userId: number;
  type: string;
  readAt: string;
  readBy: number;
} & Timestamp;

export type Advertisement = {
  id: number;
  title: string;
  path: string;
  href: string;
  page: string;
} & Timestamp;

export type ResponseItems<T> = {
  items: T[];
  count: number;
};

export type RenderVariantValues = {
  keys: string[];
  values: FormattedVariants;
};

export type Filter = {
  p?: number;
  sortBy?: number;
  sortType?: number;
  min_price?: number;
  max_price?: number;
  v_ids?: string;
  group_product_slug?: string;
};
export type SortState = {
  by: string;
  isAsc: boolean;
};
export type FormattedVariants = {
  [key: string]: VariantValue[];
};
export type ErrorInput = {
  key: string;
  value: string;
};
export type SelectOption = {
  value: any;
  display?: any;
};
export type Province = {
  name: string;
  districts: District[];
};
export type District = {
  name: string;
  wards: Ward[];
};
export type Ward = {
  name: string;
};
export type BarChartData = {
  key: string;
  value: number;
};
export type GroupProductHeader = {
  name: string;
  slug: string;
  items: GroupProduct[];
};
export type FetchState = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};
