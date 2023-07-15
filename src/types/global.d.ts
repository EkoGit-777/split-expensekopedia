import 'vite/client'

export {}

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  interface Pagination {
    current_page: number,
    from: number,
    last_page: number,
    links: object[],
    path: string,
    per_page: number,
    to: number,
    total: number,
  }
  interface ApiCollection<T> {
    data: T[],
    meta?: Pagination,
  }
  interface FormError {
    [k: string]: string[],
  }
  interface Item {
    id: number|null,
    name: string,
    price: number | currency,
  }
  interface People {
    id: number|null,
    customerId: number|null,
    name: string,
    showBill: boolean,
    paid: boolean,
    items: Item[],
  }
  interface Discount {
    id: number|null,
    percent: number,
    cash: number,
  }
  interface Cost {
    id: number|null,
    title: string,
    nominal: number,
  }
}