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

  addFirst(item: T) {
    this.items.push(item);
    this.count += 1;
  }

  addLast(item: T) {
    this.items.unshift(item);
    this.count += 1;
  }
}

export default ResponseGetAllModel;
