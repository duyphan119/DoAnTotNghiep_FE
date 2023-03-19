import DateJson from "./DateJson";

type GroupProductJson = {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  sex: "Nam" | "Nữ" | "Unisex";
  isAdult: boolean;
} & DateJson;

export default GroupProductJson;
