import WardJson from "./WardJson";

type DistrictJson = {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
  wards: WardJson[];
};

export default DistrictJson;
