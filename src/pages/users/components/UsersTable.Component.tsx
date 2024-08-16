import {
  Input,
  InputGroup,
  Table,
  Progress,
  Stack,
  SelectPicker,
  Whisper,
  IconButton,
  Popover,
  Dropdown,
  Pagination
} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import MoreIcon from '@rsuite/icons/legacy/More';
import { NameCell, ImageCell } from './CellsUsers.Component';
import { MainButton } from '../../../components/shared';
import { useThemeContext } from '../../../context/themeContext/Theme.Context';
import DrawerViewUsers from './DrawerViewUsers.Component';
import { useUserTable } from '../hooks/useUserTable';
import { IUser } from '../../../models';
import { useRef } from 'react';
import { USERS } from '../../../language';
import ModalDeleteUser from './ModalDeleteUser.Component';

const { Column, HeaderCell, Cell } = Table;

const ratingList = Array.from({ length: 5 }).map((_, index) => {
  return {
    value: index + 1,
    label: Array.from({ length: index + 1 })
      .map(() => '⭐️')
      .join('')
  };
});

const UsersTable = () => {
  const { 
    selectedUser, 
    onOpenEditUser,
    setShowDrawer,
    showDrawer,
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
  } = useUserTable();
  const ref = useRef<any>();
  const { theme, language, } = useThemeContext();

  return (
    <>
      <Stack className="table-toolbar" spacing={6} wrap alignItems="flex-start" justifyContent="space-between">
        <MainButton 
          theme={theme} 
          appearance="ghost" 
          onClick={() => onOpenEditUser(null)}
        >
          {USERS[language].C}
        </MainButton>

        <Stack spacing={6} alignItems="center">
          <SelectPicker
            label={USERS[language].D}
            data={ratingList}
            searchable={false}
            value={rating}
            onChange={setRating}
          />
          <InputGroup inside>
            <Input placeholder={USERS[language].E} value={searchKeyword} onChange={setSearchKeyword} />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </Stack>
      </Stack>

      <Table
        autoHeight
        data={filteredData}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={(dataKey, sortType) => handleSortColumn(dataKey as keyof IUser, sortType || "asc")}
      >
        <Column width={50} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id">
            {rowData => <span title={rowData.id}>...{String(rowData.id).slice(String(rowData.id).length - 3, String(rowData.id).length)}</span>}
          </Cell>
        </Column>

        <Column width={80} align="center">
          <HeaderCell>Avatar</HeaderCell>
          <ImageCell dataKey="avatar" />
        </Column>

        <Column minWidth={160} flexGrow={1} sortable>
          <HeaderCell>{USERS[language].F}</HeaderCell>
          <NameCell dataKey="fullName" />
        </Column>

        <Column width={230} sortable>
          <HeaderCell>{USERS[language].G}</HeaderCell>
          <Cell style={{ padding: '10px 0' }} dataKey="skills">
            {rowData => <Progress percent={rowData.skills} showInfo={false} />}
          </Cell>
        </Column>

        <Column width={100} sortable>
          <HeaderCell>{USERS[language].D}</HeaderCell>
          <Cell dataKey="rating">
            {rowData =>
              Array.from({ length: rowData.rating }).map((_, i) => <span key={i}>⭐️</span>)
            }
          </Cell>
        </Column>

        <Column width={100} sortable>
          <HeaderCell>{USERS[language].H}</HeaderCell>
          <Cell dataKey="income">{rowData => `$${rowData.income}`}</Cell>
        </Column>

        <Column width={300}>
          <HeaderCell>{USERS[language].I}</HeaderCell>
          <Cell dataKey="email" />
        </Column>

        <Column width={120}>
          <HeaderCell>
            <MoreIcon />
          </HeaderCell>
          <Cell className="link-group">{rowData => (
            <Whisper 
              placement="autoVerticalEnd" 
              trigger="click"
              ref={ref}
              speaker={(
                <Popover full>
                  <Dropdown.Menu>
                    <Dropdown.Item 
                      onSelect={() => {
                        onOpenEditUser(rowData as IUser);
                        ref?.current?.close();
                      }}
                    >
                      {USERS[language].J}
                    </Dropdown.Item>
                    <Dropdown.Item 
                      onSelect={() => {
                        handleSetIdToDelete(rowData.id);
                        ref?.current?.close();
                      }}
                    >
                      {USERS[language].K}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Popover>
              )}
            >
              <IconButton appearance="subtle" icon={<MoreIcon />} />
            </Whisper>
          )}
          </Cell>
        </Column>
      </Table>

      <div style={{ padding: "5px 0px" }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={4}
          size="xs"
          locale={{
            total: `Total: ${data.total}`,
          }}
          layout={['total', '-', 'limit', '|', 'pager']}
          total={data.total}
          limitOptions={[150, 200, 300]}
          limit={data.perPage}
          activePage={data.page}
          onChangePage={(page) => setData({ ...data, page})}
          onChangeLimit={(perPage) => setData({ ...data, perPage})}
        />
      </div>

      <DrawerViewUsers 
        open={showDrawer} 
        onClose={() => setShowDrawer(false)} 
        selectedUser={selectedUser}
        onOpenDrawer={setShowDrawer}
        onReload={getAllPortfolioUsers}
      />

      <ModalDeleteUser
        modalProps={{
          open: userIdToDelete !== "",
          onClose: () => handleSetIdToDelete(""),
        }}
        handleDeleteUser={handleDeleteUser}
        user={filteredData.find((user) => user.id === userIdToDelete)!}
      />
    </>
  );
};

export default UsersTable;