class ResponseGetAllModel<T> {
  items: T[];
  count: number;

  constructor(items?: T[], count?: number) {
    this.items = items ?? [];
    this.count = count ?? 0;
  }

  getTotalPages(limit: number) {
    return Math.ceil(this.count / limit);
  }
}

export default ResponseGetAllModel;
