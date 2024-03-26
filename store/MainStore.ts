import { create } from "zustand";
import { getBooks, getOrders, cancelOrder, checkout, signup, login } from "@/lib/services";

interface MainState {
  loading: boolean;
  fetching: boolean;
  scrollUp: boolean;
  books: Book[];
  orders: Order[];
  cart: Cart | null;
  customer: Customer | null;
  page: number;
  lastPage: boolean;
  searchKey: string;
  retrieveBooks: () => void;
  setPage: (page: number) => void;
  addToCart: (book: Book, qty: number) => void;
  removeCart: (book: Book) => void;
  setSearchKey: (key: string) => void;
  setLoading: (val: boolean) => void;
  goCheckout: (cart: Cart) => void;
  registerAccount: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
  loginAccount: (email: string, password: string) => void;
  retrieveOrders: () => void;
  cancelMyOrder: (id: number) => void;
  resetPage: () => void;
}

export const useMainStore = create<MainState>((set, get) => ({
  loading: true,
  fetching: true,
  scrollUp: false,
  books: [],
  orders: [],
  cart: null,
  customer: null,
  page: 1,
  lastPage: false,
  searchKey: "",
  setPage: (page: number) => {
    set({ page: page });
  },
  setSearchKey: (key: string) => {
    set({ searchKey: key });
  },
  setLoading: (val: boolean) => {
    set({ loading: val == true });
  },
  setCart: (payload: Cart) => {
    set({ cart: payload });
  },
  addToCart: (book: Book, qty: number) => {
    const cart = get().cart || null;
    const customer = get().customer || null;
    const item = { book: book, qty: qty } as CartItem;
    if (cart) {
      cart.totalQty += qty;
      cart.points += qty * book.point;
      const idx = cart.items.findIndex((it: CartItem) => {
        return it.book.id == book.id;
      });
      if (idx >= 0) {
        cart.items[idx].qty += qty;
      } else {
        cart.items.push(item);
      }
      set({ cart: cart });
    } else {
      const cart = {
        items: [],
        customerId: customer ? customer.id : null,
        usedPoints: customer ? customer.points : null,
        totalQty: 1,
        points: book.point,
      } as Cart;
      cart.items.push(item);
      set({ cart: cart });
    }
  },
  removeCart: (book: Book) => {
    const cart = get().cart;
    const idx = cart!.items.findIndex((it: CartItem) => {
      return it.book.id == book.id;
    });
    if (idx == -1) return;
    cart!.items.splice(idx, 1);
    set({ cart: cart });
  },
  setBooks: (payload: Book[]) => {
    set({ books: payload });
  },
  retrieveBooks: async () => {
    const isLastPage = get().lastPage;
    if (isLastPage) return;
    set({ fetching: true });
    const page = get().page;
    const currentBooks = get().books;
    const limit = 10;
    const res: any = await getBooks(page, limit);
    var books: Book[] = [];
    if (res.success && res.books.length) {
      for (const it in res.books) {
        const tags = res.books[it].tags;
        if (tags) res.books[it].tags = tags.split(",");
        const book = res.books[it] as Book;
        books.push(book);
      }
    }
    if (res && !res.books) set({ lastPage: true });

    set({ books: [...currentBooks, ...books] });
    set({ fetching: false, loading: false });
  },
  goCheckout: async (cart: Cart) => {
    set({ loading: true });
    const res: any = await checkout(cart);
    set({ loading: false });
    if (res && res.success) {
      set({ cart: null });
    }
    return res;
  },
  registerAccount: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    set({ loading: true });
    const res: any = await signup(firstName, lastName, email, password);
    set({ loading: false });
    if (res && res.user) {
      set({ customer: res.user });
    }
    return res;
  },
  loginAccount: async (email: string, password: string) => {
    set({ loading: true });
    const res: any = await login(email, password);
    set({ loading: false });
    if (res && res.user) {
      set({ customer: res.user });
    }
    return res;
  },
  retrieveOrders: async () => {
    const isLastPage = get().lastPage;
    if (isLastPage) return;
    set({ fetching: true });
    const page = get().page;
    const currentOrders = get().orders;
    const customer = get().customer;
    const limit = 10;
    const res: any = await getOrders(page, limit, customer ? customer!.id : 0);
    var orders: Order[] = [];
    if (res.success && res.orders.length) {
      for (const it in res.orders) {
        const order = res.orders[it] as Order;
        orders.push(order);
      }
    }
    if (res && !res.orders) set({ lastPage: true });

    set({ orders: [...currentOrders, ...orders] });
    set({ fetching: false });
    set({ loading: false });
  },
  cancelMyOrder: async (id: number) => {
    const res: any = await cancelOrder(id);
    if (res && res.success) {
      let orders = get().orders;
      const ix = orders.findIndex((it: Order) => {
        return it.id == id;
      });
      orders[ix].canceled = 1;
      set({ orders: orders });
    }
    return res;
  },
  resetPage: () => {
    set({ lastPage: false, loading: false, fetching: false, page: 1 });
  },
}));
