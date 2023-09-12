export interface Album {
  id: string,
  name: string,
  img: string
}

export interface ResponseData {
  code: number,
  created?: boolean,
  message?: string,
  data?: any
}
