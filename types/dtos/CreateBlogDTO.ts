type CreateBlogDTO = {
  title: string;
  content: string;
  blogCategoryId: number;
  thumbnail?: string;
  heading?: string;
  metaDescription?: string;
  metaKeywords?: string;
};

export default CreateBlogDTO;
