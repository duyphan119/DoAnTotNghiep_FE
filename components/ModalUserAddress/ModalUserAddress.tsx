import { Modal, Box, Grid, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createUserAddress,
  CreateUserAddressDTO,
  updateUserAddress,
} from "../../apis/useraddress";
import { MSG_SUCCESS } from "../../utils/constants";
import provinces from "../../province.json";
import { UserAddress } from "../../utils/types";

type Props = Partial<{
  open: boolean;
  onClose: any;
  onCreate: any;
  onEdit: any;
  row: UserAddress | null;
}>;

const ModalUserAddress = (props: Props) => {
  const [districts, setDistricts] = useState<any>(() => {
    const province = provinces.find(
      (province: any) =>
        province.districts.findIndex(
          (district: any) => props.row && district.name === props.row.district
        ) !== -1
    );
    if (province) return province.districts;
    return [];
  });
  const [wards, setWards] = useState<any>(() => {
    const district = districts.find(
      (d: any) =>
        d.wards.findIndex(
          (ward: any) => props.row && ward.name === props.row.ward
        ) !== -1
    );
    if (district) return district.wards;
    return [];
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateUserAddressDTO>({
    defaultValues: {
      address: props.row ? props.row.address : "",
      ward: props.row ? props.row.ward : "",
      district: props.row ? props.row.district : "",
      province: props.row ? props.row.province : "",
    },
  });

  const onSubmit: SubmitHandler<CreateUserAddressDTO> = async (values) => {
    try {
      if (props.row) {
        const { message, data } = await updateUserAddress(props.row.id, values);
        if (message === MSG_SUCCESS) {
          props.onEdit(props.row.id, data);
        }
      } else {
        const { message, data } = await createUserAddress(values);
        if (message === MSG_SUCCESS) {
          props.onCreate(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        if (name === "province") {
          const { province } = value;
          if (province !== "") {
            setDistricts(
              provinces.find((p: any) => p.name === province)?.districts
            );
            value.district = "";
            value.ward = "";
          }
        }
        if (name === "district") {
          const { district, province } = value;
          if (province !== "" && district !== "") {
            const dis = provinces
              .find((p: any) => p.name === province)
              ?.districts.find((d: any) => d.name === district);
            setWards(dis ? dis.wards : []);
            value.ward = "";
          } else {
            console.log("ngu");
          }
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  console.log(errors);

  return (
    <Modal open={props.open || false} onClose={props.onClose}>
      <Box
        bgcolor="#fff"
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform: "translate(-50%, -50%)",
          width: {
            md: "50vw",
            xs: "80vw",
          },
          p: 2,
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item xs={12}>
            <Typography component="h4" variant="h4">
              {props.row ? "Sửa địa chỉ" : "Thêm địa chỉ"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className="form-group">
              {errors.province && errors.province.type === "required" && (
                <div className="form-error">
                  Tỉnh / Thành phố không được để trống
                </div>
              )}
              <select
                className="form-control"
                {...register("province", { required: true })}
              >
                <option value="">Chọn Tỉnh / Thành phố</option>
                {provinces.map((pro: any) => {
                  return (
                    <option value={pro.name} key={pro.name}>
                      {pro.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="" className="form-label required">
                Tỉnh / Thành phố
              </label>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-group">
              {errors.district && errors.district.type === "required" && (
                <div className="form-error">
                  Quận / Huyện không được để trống
                </div>
              )}
              <select
                className="form-control"
                {...register("district", { required: true })}
              >
                <option value="">Chọn Quận / Huyện</option>
                {districts.map((dis: any) => {
                  return (
                    <option value={dis.name} key={dis.name}>
                      {dis.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="" className="form-label required">
                Quận / Huyện
              </label>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-group">
              {errors.ward && errors.ward.type === "required" && (
                <div className="form-error">
                  Phường / Xã không được để trống
                </div>
              )}
              <select
                className="form-control"
                {...register("ward", { required: true })}
              >
                <option value="">Chọn Phường / Xã</option>
                {wards.map((w: any) => {
                  return (
                    <option value={w.name} key={w.name}>
                      {w.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="" className="form-label required">
                Phường / Xã
              </label>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-group">
              {errors.address && errors.address.type === "required" && (
                <div className="form-error">Địa chỉ không được để trống</div>
              )}
              <input
                type="text"
                className="form-control"
                {...register("address", { required: true })}
              />
              <label htmlFor="" className="form-label required">
                Địa chỉ
              </label>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="flex-end"
              style={{ gap: "8px" }}
            >
              <Button type="button" variant="outlined" onClick={props.onClose}>
                Đóng
              </Button>
              <Button type="submit" variant="contained">
                Lưu
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalUserAddress;
