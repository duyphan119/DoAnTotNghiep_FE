import { GroupProductApi } from "../api";
import { GroupProductParams } from "../types/params";
import { GroupProductModel } from "../models";
import ResponseGetAllModel from "../models/ResponseGetAllModel";
import { CreateGroupProductDTO } from "../types/dtos";

class GroupProductRepository {
  _api: GroupProductApi;

  constructor() {
    this._api = new GroupProductApi();
  }

  getAll(
    params?: GroupProductParams
  ): Promise<ResponseGetAllModel<GroupProductModel>> {
    return this._api.getAll(params);
  }

  create({
    files,
    dto,
  }: {
    files: FileList | null;
    dto: CreateGroupProductDTO;
  }): Promise<GroupProductModel> {
    return this._api.create({ files, dto });
  }

  update({
    id,
    files,
    dto,
  }: {
    id: number;
    files: FileList | null;
    dto: Partial<CreateGroupProductDTO>;
  }): Promise<GroupProductModel> {
    return this._api.update({ id, files, dto });
  }

  softDeleteSingle(id: number): Promise<boolean> {
    return this._api.softDeleteSingle(id);
  }

  softDeleteMultiple(ids: number[]): Promise<boolean> {
    return this._api.softDeleteMultiple(ids);
  }

  getById(id: number): Promise<GroupProductModel> {
    return this._api.getById(id);
  }
}

export default GroupProductRepository;
