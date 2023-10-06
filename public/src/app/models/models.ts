export interface Album {
  id: string,
  name: string,
  img: string;
}

export interface ResponseData {
  code: number,
  created?: boolean,
  message?: string,
  data?: any;
}

export interface User {
  id: string;
  email: string;
  username: string;
  token: string;
}
