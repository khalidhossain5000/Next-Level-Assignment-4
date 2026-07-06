import { Response } from "express";

interface IMeta {
  page: number;
  skip: number;
  limit: number;
}
interface IData<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  metaData?: IMeta;
}

const sendResponse = async <T>(res: Response, data: IData<T>) => {
  res.send(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    meta: data.metaData,
  });
};

export default sendResponse;
