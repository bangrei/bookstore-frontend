import axios from 'axios';

interface PaintOptions {
  token?: string | null;
  extraPayload?: any | null;
  headers?: any | null;
  body?: any | null;
}

export const API_CONNECTOR = (options: PaintOptions) => {
  let params = {
    token: options.token ? options.token : undefined,
  };
  if (options.extraPayload) {
    params = {
      ...params,
      ...options.extraPayload,
    };
  }
  let baseUrl = process.env.NEXT_PUBLIC_ENDPOINT!;
  if (!baseUrl) baseUrl = "https://book-amazon.vercel.app";
  let opt = {
    baseURL: `${baseUrl}/`,
    params: params,
    headers: options.headers,
    body: undefined,
  };
  if (options.body) {
    opt.body = options.body;
  }
  let api = axios.create(opt);

  const post = (endpoint: string, data:any = undefined, config = undefined) => {
    return new Promise((resolve, reject) => {
      api
        .post(endpoint, data, config)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => reject(err));
    });
  };
  const put = (endpoint: string, data = undefined, config = undefined) => {
    return new Promise((resolve, reject) => {
      api
        .put(endpoint, data, config)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => reject(err));
    });
  };

  const get = (endpoint: string, config = undefined) => {
    return new Promise((resolve, reject) => {
      api
        .get(endpoint, config)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => reject(err));
    });
  };

  const remove = async (endpoint: string, config = undefined) => {
    return new Promise((resolve, reject) => {
      api
        .delete(endpoint, config)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => reject(err));
    });
  };
  return {
    get,
    post,
    remove,
    put,
  };
};