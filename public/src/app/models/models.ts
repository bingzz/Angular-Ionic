export interface Album {
  id: string,
  albumName: string,
  img?: any;
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

export interface LocalFile {
  name: string;
  path: string;
  data: string;
}

export interface Nav {
  navigate: string;
  name: string;
  title: string;
}
