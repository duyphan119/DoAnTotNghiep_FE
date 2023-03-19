import DistrictJson from "./DistrictJson";

type ProvinceJson = {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  phone_code: number;
  districts: DistrictJson[];
};
export default ProvinceJson;
