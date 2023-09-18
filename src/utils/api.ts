const combineBaseUrl = (path: string) => `/api${path}`;

export const get = async <T>(path: string): Promise<T> => {
  const response = await fetch(combineBaseUrl(path), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((e) => {
    throw new Error(e);
  });

  return response.json() as T;
};

export const post = async <T, U>(path: string, body: U): Promise<T> => {
  const response = await fetch(combineBaseUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).catch((e) => {
    throw new Error(e);
  });

  return response.json() as T;
};

export const put = async <T, U>(path: string, body: U): Promise<T> => {
  const response = await fetch(path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).catch((e) => {
    throw new Error(e);
  });
  return response.json() as T;
};

export const destroy = async <T>(path: string): Promise<T> => {
  const response = await fetch(path, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((e) => {
    throw new Error(e);
  });

  if (response.status === 204) return {} as T;
  return response.json() as T;
};
