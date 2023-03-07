import LoginDTO from "./LoginDTO";

type RegisterDTO = {
  phone: string;
  fullName: string;
} & LoginDTO;

export default RegisterDTO;
