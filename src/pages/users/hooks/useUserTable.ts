import { useState } from "react";
import { IUser } from "../../../models";
import { mockUsers } from "../../../mocks";
import { ValueType } from 'rsuite/esm/Checkbox';
import { SortType } from 'rsuite/esm/Table';

const data = mockUsers(20);

export const useUserTable = () => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof typeof data[0]>();
  const [sortType, setSortType] = useState<SortType>("asc");
  const [searchKeyword, setSearchKeyword] = useState('');
  const [rating, setRating] = useState<number | null>(null);

  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }

  const handleCheckAll = (_value: ValueType | undefined, checked: boolean) => {
    const keys = checked ? data.map(item => item.id) : [];
    setCheckedKeys(keys);
  };
  // const handleCheck = (_value: ValueType | undefined, checked: boolean) => {
  //   const keys = checked ? [...checkedKeys, _value] : checkedKeys.filter(item => item !== _value);
  //   setCheckedKeys(keys);
  // };

  const handleSortColumn = (sortColumn: keyof typeof data[0], sortType: SortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const filteredData = () => {
    const filtered = data.filter(item => {
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
  };

  const onOpenEditUser = (user: IUser | null) => {
    setSelectedUser(user);
    setShowDrawer(true);
  };

  return {
    selectedUser,
    setSelectedUser,
    onOpenEditUser,
    showDrawer,
    setShowDrawer,

    rating,
    setRating,
    searchKeyword,
    setSearchKeyword,
    filteredData,
    sortColumn,
    sortType,
    handleSortColumn,
    data,
    checked,
    indeterminate,
    handleCheckAll,
    checkedKeys,

  };
};