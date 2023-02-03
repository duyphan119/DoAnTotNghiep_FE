import { call, put, takeEvery } from "redux-saga/effects";
import { getAllGroupProducts } from "../../apis/groupProduct";
import {
  createProduct,
  getAllProducts,
  ProductQueryParams,
} from "../../apis/product";
import { uploadSingle } from "../../apis/upload";
import { MSG_SUCCESS } from "../../utils/constants";
import {
  groupProductManagementReducers,
  groupProductManagementActions,
} from "../slice/groupProductManagementSlice";
import { ActionPayload } from "../store";

function* fetchGroupProductData({
  payload: params,
}: ActionPayload<ProductQueryParams>): any {
  try {
    const { p, sortBy, sortType, limit } = params;
    const { message, data } = yield call(() =>
      getAllGroupProducts({
        p: p || 1,
        limit,
        sortBy,
        sortType,
        withDeleted: true,
      })
    );

    yield put(
      groupProductManagementActions.setGroupProductData(
        message === MSG_SUCCESS ? data : { items: 0, count: 0 }
      )
    );
  } catch (error) {
    console.log("groupProductManagementActions.fetchGroupProductData", error);
    yield put(groupProductManagementActions.fetchError());
  }
}

// function* fetchCreateProduct({
//   payload,
// }: ActionPayload<CreateProductPayload>): any {
//   let isError = true;
//   try {
//     const { files, inputs: dto } = payload;
//     if (files) {
//       const formData = new FormData();
//       formData.append("image", files[0]);
//       const { message, data: dataImage } = yield call(() =>
//         uploadSingle(formData)
//       );
//       if (message === MSG_SUCCESS) {
//         console.log("Uploaded file: ", dataImage);
//         const url = dataImage.secure_url;
//         const { message: msg } = yield call(() =>
//           createProduct({
//             ...dto,
//             thumbnail: url,
//             groupProductId: +dto.groupProductId,
//           })
//         );
//         if (msg === MSG_SUCCESS) {
//           isError = false;
//           yield put(productManagementActions.fetchSuccess());
//         }
//       }
//     }
//   } catch (error) {
//     console.log("productManamentSaga.fetchCreateProduct", error);
//   }
//   if (isError) yield put(productManagementActions.fetchError());
// }

export function* groupProductManamentSaga() {
  yield takeEvery(
    groupProductManagementReducers.fetchGroupProductData,
    fetchGroupProductData
  );
}
