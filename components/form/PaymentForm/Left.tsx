import { InputControl, RadioControl, SelectControl } from "@/components";
import { UserAddressModel } from "@/models";
import provinces from "@/province.json";
import { userAddressSelector } from "@/redux/slice/userAddressSlice";
import { CheckoutDTO } from "@/types/dtos";
import { DistrictJson, ProvinceJson, WardJson } from "@/types/json";
import { Grid } from "@mui/material";
import { ChangeEvent, FC, memo, useEffect } from "react";
import {
  FieldErrorsImpl,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { useSelector } from "react-redux";
import styles from "./_style.module.scss";

type Props = {
  register: UseFormRegister<CheckoutDTO>;
  errors: Partial<FieldErrorsImpl<CheckoutDTO>>;
  userAddress: UserAddressModel;
  visible: boolean;
  onChange: (userAddress: UserAddressModel) => void;
  disabled: boolean;
  onToggle: () => void;
  districts: DistrictJson[];
  wards: WardJson[];
  watch: UseFormWatch<CheckoutDTO>;
  onUpdateDistricts: (districts: DistrictJson[]) => void;
  onUpdateWards: (wards: WardJson[]) => void;
};

const Left: FC<Props> = ({
  register,
  errors,
  userAddress,
  visible,
  onChange,
  disabled,
  onToggle,
  districts,
  wards,
  watch,
  onUpdateDistricts,
  onUpdateWards,
}) => {
  const { userAddressData } = useSelector(userAddressSelector);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = +e.target.value;
    const result = userAddressData.items.find((_) => _.id === id);
    if (result) {
      onChange(result);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        if (name === "province") {
          const { province } = value;
          if (province !== "") {
            const findProvince = provinces.find(
              (p: ProvinceJson) => p.name === province
            );
            const districts = findProvince ? findProvince.districts : [];
            onUpdateDistricts(districts);

            value.district = "";
            value.ward = "";
          }
        }
        if (name === "district") {
          const { district, province } = value;
          if (province !== "" && district !== "") {
            const findDistrict = provinces
              .find((p: ProvinceJson) => p.name === province)
              ?.districts.find((d: DistrictJson) => d.name === district);
            const wards = findDistrict ? findDistrict.wards : [];
            onUpdateWards(wards);
            value.ward = "";
          } else {
            console.log("Error");
          }
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  console.log(errors);

  return (
    <Grid item xs={12} md={8}>
      <h1 className={styles.h1}>Thông tin đặt hàng</h1>
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12} md={6}>
          <InputControl
            label="Họ tên"
            error={errors.fullName}
            register={register("fullName", {
              required: {
                value: true,
                message: "Họ tên không được để trống",
              },
              minLength: {
                value: 6,
                message: "Mật khẩu ít nhất 6 kí tự",
              },
            })}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputControl
            label="Số điện thoại"
            error={errors.phone}
            register={register("phone", {
              required: {
                value: true,
                message: "Số điện thoại không được để trống",
              },
              pattern: {
                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                message: "Số điện thoại không hợp lệ",
              },
            })}
            disabled
          />
        </Grid>
        {visible && userAddress ? (
          <Grid item xs={12}>
            <SelectControl
              label="Địa chỉ"
              options={userAddressData.items.map((item: UserAddressModel) => ({
                value: item.id,
                display: item.getFullAddress(),
              }))}
              value={userAddress.id}
              onChange={handleChange}
              disabled
            />
          </Grid>
        ) : null}
        {!disabled ? (
          <Grid item xs={12}>
            <div
              style={{ cursor: "pointer", color: "var(--blue)" }}
              onClick={() => onToggle()}
            >
              {visible ? "+ Thêm địa chỉ khác" : "Sổ địa chỉ"}
            </div>
          </Grid>
        ) : null}
        {!visible ? (
          <>
            <Grid item xs={12}>
              <SelectControl
                label="Tỉnh / Thành phố"
                error={errors.province}
                options={[
                  {
                    value: "",
                    display: "Chọn Tỉnh / Thành phố",
                  },
                  ...provinces.map((pro: any) => ({
                    value: pro.name,
                  })),
                ]}
                register={register("province", {
                  validate: (value) =>
                    value !== "" || "Tỉnh / Thành phố không được để trống",
                })}
                required={true}
              />
            </Grid>
            {districts.length > 0 ? (
              <Grid item xs={12}>
                <SelectControl
                  label="Quận / Huyện"
                  options={[
                    { value: "", display: "Chọn Quận / Huyện" },
                    ...districts.map((dis: any) => ({
                      value: dis.name,
                    })),
                  ]}
                  register={register("district", {
                    validate: (value) =>
                      value !== "" || "Quận / Huyện không được để trống",
                  })}
                  required={true}
                  error={errors.district}
                />
              </Grid>
            ) : null}
            {wards.length > 0 ? (
              <Grid item xs={12}>
                <SelectControl
                  label="Phường / Xã"
                  error={errors.ward}
                  options={[
                    { value: "", display: "Chọn Phường / Xã" },
                    ...wards.map((w: any) => ({
                      value: w.name,
                    })),
                  ]}
                  register={register("ward", {
                    validate: (value) =>
                      value !== "" || "Phường / Xã không được để trống",
                  })}
                  required={true}
                />
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <InputControl
                label="Địa chỉ"
                error={errors.address}
                register={register("address", {
                  required: {
                    value: true,
                    message: "Địa chỉ không được để trống",
                  },
                })}
              />
            </Grid>
          </>
        ) : null}
      </Grid>
      <h1 className={styles.h1}>Phương thức thanh toán</h1>
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12}>
          <RadioControl
            defaultChecked={true}
            register={register("paymentMethod")}
            label="Thanh toán khi nhận hàng (COD)"
            value="COD"
            disabled
          />
        </Grid>
        {/* <Grid item xs={12}>
          <RadioControl
            register={register("paymentMethod")}
            label="Thanh toán qua MOMO"
            value="MOMO"
            disabled
          />
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default memo(Left);
