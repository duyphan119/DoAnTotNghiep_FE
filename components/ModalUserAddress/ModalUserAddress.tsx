import { Modal, Box, Grid, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MSG_SUCCESS } from "../../utils/constants";
import provinces from "../../province.json";
import { District, Province, UserAddress, Ward } from "../../utils/types";
import { ButtonControl, InputControl, SelectControl } from "../../components";
import { useAppDispatch } from "../../redux/store";
import { userAddressActions } from "../../redux/slice/userAddressSlice";
import { UserAddressModel } from "../../models";
import { CreateUserAddressDTO } from "../../types/dtos";

type Props = Partial<{
  open: boolean;
  onClose: any;
  onCreate: any;
  onEdit: any;
}> & { row: UserAddressModel };

const ModalUserAddress = ({ open, onClose, row }: Props) => {
  const appDispatch = useAppDispatch();
  const [districts, setDistricts] = useState<any>(() => {
    const province = provinces.find(
      (province: Province) =>
        province.districts.findIndex(
          (district: District) => row && district.name === row.district
        ) !== -1
    );
    if (province) return province.districts;
    return [];
  });
  const [wards, setWards] = useState<any>(() => {
    const district = districts.find(
      (d: District) =>
        d.wards.findIndex((ward: Ward) => row && ward.name === row.ward) !== -1
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
      address: row.address,
      ward: row.ward,
      district: row.district,
      province: row.province,
    },
  });

  const onSubmit: SubmitHandler<CreateUserAddressDTO> = (values) => {
    if (row.id > 0) {
      appDispatch(userAddressActions.fetchUpdate({ id: row.id, dto: values }));
    } else {
      appDispatch(userAddressActions.fetchCreate(values));
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

  return (
    <Modal open={open || false} onClose={onClose}>
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
              {row.id > 0 ? "Sửa địa chỉ" : "Thêm địa chỉ"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <SelectControl
              error={errors.province}
              required={true}
              options={provinces.map((pro: any) => ({ value: pro.name }))}
              label="Tỉnh / Thành phố"
              register={register("province", {
                required: {
                  value: true,
                  message: "Tỉnh / Thành phố không được để trống",
                },
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectControl
              error={errors.district}
              required={true}
              options={districts.map((dis: any) => ({ value: dis.name }))}
              label="Quận / Huyện"
              register={register("district", {
                required: {
                  value: true,
                  message: "Quận / Huyện không được để trống",
                },
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectControl
              error={errors.ward}
              required={true}
              options={wards.map((w: any) => ({ value: w.name }))}
              label="Phường / Xã"
              register={register("ward", {
                required: {
                  value: true,
                  message: "Phường / Xã không được để trống",
                },
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <InputControl
              error={errors.address}
              register={register("address", {
                required: {
                  value: true,
                  message: "Địa chỉ không được để trống",
                },
              })}
              label="Địa chỉ"
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="flex-end"
              style={{ gap: "8px" }}
            >
              <ButtonControl variant="outlined" onClick={onClose}>
                Đóng
              </ButtonControl>
              <ButtonControl type="submit">Lưu</ButtonControl>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalUserAddress;
