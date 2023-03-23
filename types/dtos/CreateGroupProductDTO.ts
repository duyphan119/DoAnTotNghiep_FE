type CreateGroupProductDTO = {
  name: string;
  description?: string;
  thumbnail?: string;
  sex?: "Nam" | "Nữ" | "Unisex";
  isAdult?: boolean;
};

export default CreateGroupProductDTO;
