import { UploadApi } from "../api";

class UploadRepository {
  _api: UploadApi;

  constructor() {
    this._api = new UploadApi();
  }

  uploadSingle(file: File): Promise<{ secure_url: string }> {
    return this._api.uploadSingle(file);
  }

  uploadMultiple(files: FileList) {
    return this._api.uploadMultiple(files);
  }
}

export default UploadRepository;
