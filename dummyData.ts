export const variants: any = [
    {
      id: 1,
      name: "Đen",
      type: "Màu sắc",
    },
    {
      id: 2,
      name: "Trắng",
      type: "Màu sắc",
    },
    {
      id: 3,
      name: "Đỏ",
      type: "Màu sắc",
    },
    {
      id: 4,
      name: "Xanh lá",
      type: "Màu sắc",
    },
    {
      id: 5,
      name: "40",
      type: "Kích cỡ",
    },
    {
      id: 6,
      name: "40.5",
      type: "Kích cỡ",
    },
    {
      id: 7,
      name: "41",
      type: "Kích cỡ",
    },
    {
      id: 8,
      name: "41.5",
      type: "Kích cỡ",
    },
  ];
export const product: any = {
    thumbnail:
      "https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/316110296_2415429105296220_1127092158882483255_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=8XbN8tXLJzsAX9rOdG3&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfBKNMHPch046CJlHP9QtOuQgWvTAtoZeiabRGBChmXfjw&oe=637CA08C",
    name: "Áo sơ mi nữ",
    price: 120000,
    slug: "ao-so-mi-nu",
  };
export const  getListProducts = (size: number): any[] => new Array(size).fill('').map((_, index) => ({...product, id: index, name: product.name+" "+index, slug: product.slug+"-"+index}))
export const images: any[] = [
  {
    id: 1,
    path: "https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/316110296_2415429105296220_1127092158882483255_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=8XbN8tXLJzsAX9rOdG3&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfBKNMHPch046CJlHP9QtOuQgWvTAtoZeiabRGBChmXfjw&oe=637CA08C"
  },{
    id: 2,
    path: "https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/316110296_2415429105296220_1127092158882483255_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=8XbN8tXLJzsAX9rOdG3&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfBKNMHPch046CJlHP9QtOuQgWvTAtoZeiabRGBChmXfjw&oe=637CA08C"
  },{
    id: 3,
    path: "https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/316110296_2415429105296220_1127092158882483255_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=8XbN8tXLJzsAX9rOdG3&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfBKNMHPch046CJlHP9QtOuQgWvTAtoZeiabRGBChmXfjw&oe=637CA08C"
  },{
    id: 4,
    path: "https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/316110296_2415429105296220_1127092158882483255_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=8XbN8tXLJzsAX9rOdG3&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfBKNMHPch046CJlHP9QtOuQgWvTAtoZeiabRGBChmXfjw&oe=637CA08C"
  },
]