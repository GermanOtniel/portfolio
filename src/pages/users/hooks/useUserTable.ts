import { useCallback, useEffect, useMemo, useState } from "react";
import { IUser } from "../../../models";
import { SortType } from 'rsuite/esm/Table';
import { getAll, remove } from "../../../api";
import { IUsersTableData } from "../models";
import { useLoaderContext } from "../../../context/loaderContext/LoaderContext";
import { useToaster } from "rsuite";
import { errorMessage } from "../../../components/shared";


export const useUserTable = () => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [sortColumn, setSortColumn] = useState<keyof IUser>();
  const [sortType, setSortType] = useState<SortType>("asc");
  const [searchKeyword, setSearchKeyword] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [data, setData] = useState<IUsersTableData>({
    page: 1,
    perPage: 100,
    portfolioUsers: [],
    total: 0
  });
  const [userIdToDelete, setUserIdToDelete] = useState<string>("");
  const { onShow } = useLoaderContext();
  const toaster = useToaster();

  const getAllPortfolioUsers = useCallback(async () => {
    try {
      onShow(true);
      const response = await getAll({ page: data.page, perPage: data.perPage });
      setData({
        page: data.page,
        perPage: data.perPage,
        total: response.total,
        portfolioUsers: response.portfolioUsers,
      });
      onShow(false);
    } catch (error) {
      setData({
        page: data.page,
        perPage: data.perPage,
        portfolioUsers: [],
        total: 0
      });
    }
    // eslint-disable-next-line
  }, [setData, data.page, data.perPage]);

  useEffect(() => {
    getAllPortfolioUsers();
  }, [getAllPortfolioUsers]);

  const handleSetIdToDelete = (userId: string) => {
    setUserIdToDelete(userId);
  };

  const handleSortColumn = (sortColumn: keyof IUser, sortType: SortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const filteredData = useMemo(() => {
    const copyData = [...data.portfolioUsers];
    const filtered = copyData.filter(item => {
      if (!item.fullName.includes(searchKeyword)) {
        return false;
      }

      if (rating && item.rating !== rating) {
        return false;
      }

      return true;
    });

    if (sortColumn && sortType) {
      return filtered.sort((a, b) => {
        let x: any = a[sortColumn];
        let y: any = b[sortColumn];

        if (typeof x === 'string') {
          x = x.charCodeAt(0);
        }
        if (typeof y === 'string') {
          y = y.charCodeAt(0);
        }

        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return filtered;
  }, [data, rating, searchKeyword, sortColumn, sortType]);

  const onOpenEditUser = (user: IUser | null) => {
    setSelectedUser(user);
    setShowDrawer(true);
  };

  const handleDeleteUser = async () => {
    try {
      console.log(userIdToDelete);
      onShow(true);
      await remove(userIdToDelete);
      onShow(false);
      setUserIdToDelete("");
      getAllPortfolioUsers();
    } catch (e) {
      toaster.push(
        errorMessage(`Ha ocurrido un error inesperado \n ${String(e)}`),
        { placement: "bottomCenter", duration: 5000 }
      );
    }
  };

  return {
    selectedUser,
    setSelectedUser,
    onOpenEditUser,
    showDrawer,
    setShowDrawer,
    getAllPortfolioUsers,
    rating,
    setRating,
    searchKeyword,
    setSearchKeyword,
    filteredData,
    sortColumn,
    sortType,
    handleSortColumn,
    data,
    setData,
    handleSetIdToDelete,
    userIdToDelete,
    handleDeleteUser,
  };
};