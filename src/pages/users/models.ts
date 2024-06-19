import { IUser } from "../../models";

export interface IUsersTableData {
  page: number;
  perPage: number;
  total: number;
  portfolioUsers: IUser[];
};