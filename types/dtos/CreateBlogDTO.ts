type CreateBlogDTO = {
  title: string;
  content: string;
  blogCategoryId: number;
  thumbnail?: string;
  heading?: string;
};

export default CreateBlogDTO;
