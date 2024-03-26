import { API_CONNECTOR } from "./apiConnector"

export const getBooks = async (page:number,limit:number) => {
  try {
    const { get } = API_CONNECTOR({
      extraPayload: { page: page, limit: limit }
    })
    const path = `/api/books`;
    const data = await get(path)
    return Promise.resolve(data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getOrders = async (page: number, limit: number, id:number) => {
  try {
    const { get } = API_CONNECTOR({
      extraPayload: { page: page, limit: limit, customerId: id },
    });
    const path = `/api/orders`;
    const data = await get(path);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const cancelOrder = async (id: number) => {
  try {
    const { put } = API_CONNECTOR({
      extraPayload: { id: id },
    });
    const path = `/api/order/cancel`;
    const data = await put(path);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const checkout = async (cart: Cart) => {
  try {
    let formData = new FormData();
    formData.append("body", JSON.stringify(cart));
    const { post } = API_CONNECTOR({});
    const path = `/api/order`;
    const data = await post(path, cart);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const signup = async (firstName:string, lastName:string, email:string, password:string) => {
  try {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }
    let formData = new FormData();
    formData.append("body", JSON.stringify(payload));
    const { post } = API_CONNECTOR({});
    const path = `/api/signup`;
    const data = await post(path, payload);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const login = async (
  email: string,
  password: string
) => {
  try {
    const payload = {
      email: email,
      password: password,
    };
    let formData = new FormData();
    formData.append("body", JSON.stringify(payload));
    const { post } = API_CONNECTOR({});
    const path = `/api/login`;
    const data = await post(path, payload);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

