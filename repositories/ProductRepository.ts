import { ProductApi } from "@/api";
import { ProductParams } from "@/types/params";
import { ProductModel, ResponseGetAllModel } from "@/models";
import { CreateProductDTO } from "@/types/dtos";

class ProductRepository {
  _api: ProductApi;

  constructor() {
    this._api = new ProductApi();
  }

  getAll(params?: ProductParams): Promise<ResponseGetAllModel<ProductModel>> {
    return this._api.getAll(params);
  }

  create(dto: CreateProductDTO): Promise<ProductModel> {
    return this._api.create(dto);
  }

  update({
    id,
    dto,
  }: {
    id: number;
    dto: Partial<CreateProductDTO>;
  }): Promise<ProductModel> {
    return this._api.update({ id, dto });
  }

  softDeleteSingle(id: number): Promise<boolean> {
    return this._api.softDeleteSingle(id);
  }

  softDeleteMultiple(ids: number[]): Promise<boolean> {
    return this._api.softDeleteMultiple(ids);
  }

  getById(id: number): Promise<ProductModel> {
    return this._api.getById(id);
  }
}

export default ProductRepository;
