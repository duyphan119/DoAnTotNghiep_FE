import { CheckoutDTO } from "@/types/dtos";
import { Grid } from "@mui/material";
import { FC } from "react";
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { InputControl, SelectControl } from "../common";
import provinces from "@/province.json";

type Props = {
  register: UseFormRegister<CheckoutDTO>;
  errors: Partial<FieldErrorsImpl<CheckoutDTO>>;
};

const OrderInfo: FC<Props> = ({ register, errors }) => {
  return (
    <Grid container columnSpacing={3} rowSpacing={3}>
      {/* <Grid item xs={12} md={6}>
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
            onClick={() => dispatch({ payload: { visible: !visible } })}
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
              options={provinces.map((pro: any) => ({
                value: pro.name,
              }))}
              register={register("province", {
                required: {
                  value: true,
                  message: "Tỉnh / Thành phố không được để trống",
                },
              })}
              required={true}
            />
          </Grid>
          {districts.length > 0 ? (
            <Grid item xs={12}>
              <SelectControl
                label="Quận / Huyện"
                options={districts.map((dis: any) => ({
                  value: dis.name,
                }))}
                register={register("district", {
                  required: {
                    value: true,
                    message: "Quận / Huyện không được để trống",
                  },
                })}
                required={true}
              />
            </Grid>
          ) : null}
          {wards.length > 0 ? (
            <Grid item xs={12}>
              <SelectControl
                label="Phường / Xã"
                options={wards.map((w: any) => ({
                  value: w.name,
                }))}
                register={register("ward", {
                  required: {
                    value: true,
                    message: "Phường / Xã không được để trống",
                  },
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
              disabled
            />
          </Grid>
        </>
      ) : null} */}
    </Grid>
  );
};

export default OrderInfo;
