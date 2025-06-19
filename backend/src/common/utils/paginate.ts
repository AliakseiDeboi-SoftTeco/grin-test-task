export interface Paginated<T> {
  total: number;
  items: T[];
}

export function paginate<T>(
  list: T[],
  page: number,
  limit: number,
): Paginated<T> {
  const total = list.length;
  const offset = (page - 1) * limit;
  const items = list.slice(offset, offset + limit);
  return { total, items };
}
