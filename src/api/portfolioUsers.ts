import { IUser, IUserDB } from "../models";
import axios, { AxiosResponse } from "axios";
import { IAxiosResponse, IGenericResponse } from "./responsesTypes";

interface IGetAllResponse extends IGenericResponse {
  page: number;
  pages: number;
  total: number;
  portfolioUsers: IUser[];
};
interface IGetAllRequestResponse extends IGenericResponse {
  page: number;
  pages: number;
  total: number;
  portfolioUsers: IUserDB[];
};


const allUsersSetter = (portfolioUsersDB: IUserDB[]): IUser[] => {
  return portfolioUsersDB.map((item) => ({
    id: item.id.toString(),
    avatar: item.avatar,
    lastName: item.last_name,
    firstName: item.first_name,
    fullName: item.full_name,
    skills: item.skills,
    city: item.city,
    street: item.street,
    email: item.email,
    rating: item.rating,
    income: item.income,
  }));
};
export const getAll = async (pagination?: { page: number; perPage: number; }): Promise<IGetAllResponse> => {
  try {
    const response: AxiosResponse<IAxiosResponse<IGetAllRequestResponse>> = await axios.get(
      `${process.env.REACT_APP_API_URL}/portfolioUser/`,
      { params: pagination ? { ...pagination } : undefined }
    );
    return {
      ...response.data.data,
      portfolioUsers: allUsersSetter(response.data.data.portfolioUsers)
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

interface ICreatePortfolioUserResponse extends IGenericResponse {
  portfolioUser: IUser;
};
interface ICreatePortfolioUserRequestResponse extends IGenericResponse {
  portfolioUser: IUserDB;
};


const createUserSetter = (portfolioUserDB: IUserDB): IUser => {
  return {
    id: String(portfolioUserDB.id),
    avatar: portfolioUserDB.avatar,
    lastName: portfolioUserDB.last_name,
    firstName: portfolioUserDB.first_name,
    fullName: portfolioUserDB.full_name,
    skills: portfolioUserDB.skills,
    city: portfolioUserDB.city,
    street: portfolioUserDB.street,
    email: portfolioUserDB.email,
    rating: portfolioUserDB.rating,
    income: portfolioUserDB.income,
  };
};
export const create = async (portfolioUser: IUser): Promise<ICreatePortfolioUserResponse> => {
  try {
    const response: AxiosResponse<IAxiosResponse<ICreatePortfolioUserRequestResponse>> = await axios.post(
      `${process.env.REACT_APP_API_URL}/portfolioUser/`,
      { ...portfolioUser }
    );
    return {
      ...response.data.data,
      portfolioUser: createUserSetter(response.data.data.portfolioUser)
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

interface IUpdatePortfolioUserResponse extends IGenericResponse {
  portfolioUser: IUser;
};
interface IUpdatePortfolioUserRequestResponse extends IGenericResponse {
  portfolioUser: IUserDB;
};

const updateUserSetter = (portfolioUserDB: IUserDB): IUser => {
  return {
    id: String(portfolioUserDB.id),
    avatar: portfolioUserDB.avatar,
    lastName: portfolioUserDB.last_name,
    firstName: portfolioUserDB.first_name,
    fullName: portfolioUserDB.full_name,
    skills: portfolioUserDB.skills,
    city: portfolioUserDB.city,
    street: portfolioUserDB.street,
    email: portfolioUserDB.email,
    rating: portfolioUserDB.rating,
    income: portfolioUserDB.income,
  };
};
export const update = async (portfolioUser: IUser): Promise<IUpdatePortfolioUserResponse> => {
  try {
    const response: AxiosResponse<IAxiosResponse<IUpdatePortfolioUserRequestResponse>> = await axios.put(
      `${process.env.REACT_APP_API_URL}/portfolioUser/${portfolioUser.id}`,
      { ...portfolioUser },
    );
    return {
      ...response.data.data,
      portfolioUser: updateUserSetter(response.data.data.portfolioUser)
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const remove = async (portfolioUserId: string) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/portfolioUser/${portfolioUserId}`);
  } catch (error) {
    throw new Error(`${error}`);
  }
};