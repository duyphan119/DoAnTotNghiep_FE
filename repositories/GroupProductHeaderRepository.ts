import { GroupProductHeaderApi } from "../api";
import { GroupProductHeaderModel } from "../models";

class GroupProductHeaderRepository {
  _api: GroupProductHeaderApi;

  constructor() {
    this._api = new GroupProductHeaderApi();
  }

  getAll(): Promise<GroupProductHeaderModel[]> {
    return this._api.getAll();
  }
}

export default GroupProductHeaderRepository;
