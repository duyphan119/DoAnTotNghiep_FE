import { publicAxios } from "@/config/configAxios";
import { MSG_SUCCESS } from "@/utils/constants";

class UploadApi {
  uploadSingle(file: File): Promise<{ secure_url: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append("image", file);
        const { data, message } = await (publicAxios().post(
          "upload/single",
          formData
        ) as Promise<{ message: string; data: { secure_url: string } }>);

        resolve(data);
      } catch (error) {
        console.log("error:::", error);
      }
    });
  }

  uploadMultiple(files: FileList): Promise<Array<{ secure_url: string }>> {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append("images", files[i]);
        }
        const { data, message } = await (publicAxios().post(
          "upload/multiple",
          formData
        ) as Promise<{
          message: string;
          data: Array<{ secure_url: string }>;
        }>);

        resolve(message === MSG_SUCCESS ? data : []);
      } catch (error) {
        console.log("error:::", error);
      }
    });
  }
}

export default UploadApi;
