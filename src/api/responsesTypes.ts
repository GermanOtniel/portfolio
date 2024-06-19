export interface IAxiosResponse<T> {
  code: number;
  status: boolean;
  data: T
};

export interface IGenericResponse {
  code: number;
  error: boolean;
  message: string;
};