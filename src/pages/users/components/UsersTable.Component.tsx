import {
  Input,
  InputGroup,
  Table,
  Progress,
  Checkbox,
  Stack,
  SelectPicker,
  Whisper,
  IconButton,
  Popover,
  Dropdown
} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import MoreIcon from '@rsuite/icons/legacy/More';
import { NameCell, ImageCell, CheckCell } from './CellsUsers.Component';
import { MainButton } from '../../../components/shared';
import { useThemeContext } from '../../../context/themeContext/Theme.Context';
import DrawerViewUsers from './DrawerViewUsers.Component';
import { useUserTable } from '../hooks/useUserTable';
import { IUser } from '../../../models';

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
  } = useUserTable();

  const { theme } = useThemeContext();

  return (
    <>
      <Stack className="table-toolbar" spacing={6} wrap alignItems="flex-start" justifyContent="space-between">
        <MainButton 
          theme={theme} 
          appearance="ghost" 
          onClick={() => onOpenEditUser(null)}
        >
          Add User
        </MainButton>

        <Stack spacing={6} alignItems="center">
          <SelectPicker
            label="Rating"
            data={ratingList}
            searchable={false}
            value={rating}
            onChange={setRating}
          />
          <InputGroup inside>
            <Input placeholder="Search" value={searchKeyword} onChange={setSearchKeyword} />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </Stack>
      </Stack>

      <Table
        autoHeight
        data={filteredData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={(dataKey, sortType) => handleSortColumn(dataKey as keyof typeof data[0], sortType || "asc")}
      >
        <Column width={50} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={50} fixed>
          <HeaderCell style={{ padding: 0 }}>
            <div style={{ lineHeight: '40px' }}>
              <Checkbox
                inline
                checked={checked}
                indeterminate={indeterminate}
                onChange={(value, checked) => handleCheckAll(value, checked)}
              />
            </div>
          </HeaderCell>
          <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={(value) => {
            console.log(value)
          }} />
        </Column>
        <Column width={80} align="center">
          <HeaderCell>Avatar</HeaderCell>
          <ImageCell dataKey="avatar" />
        </Column>

        <Column minWidth={160} flexGrow={1} sortable>
          <HeaderCell>Name</HeaderCell>
          <NameCell dataKey="fullName" />
        </Column>

        <Column width={230} sortable>
          <HeaderCell>Skill Proficiency</HeaderCell>
          <Cell style={{ padding: '10px 0' }} dataKey="skills">
            {rowData => <Progress percent={rowData.skills} showInfo={false} />}
          </Cell>
        </Column>

        <Column width={100} sortable>
          <HeaderCell>Rating</HeaderCell>
          <Cell dataKey="rating">
            {rowData =>
              Array.from({ length: rowData.rating }).map((_, i) => <span key={i}>⭐️</span>)
            }
          </Cell>
        </Column>

        <Column width={100} sortable>
          <HeaderCell>Income</HeaderCell>
          <Cell dataKey="income">{rowData => `$${rowData.income}`}</Cell>
        </Column>

        <Column width={300}>
          <HeaderCell>Email</HeaderCell>
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
              speaker={(
                <Popover full>
                  <Dropdown.Menu>
                    <Dropdown.Item 
                      onSelect={() => onOpenEditUser(rowData as IUser)}
                    >
                      Edit Profile
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

      <DrawerViewUsers 
        open={showDrawer} 
        onClose={() => setShowDrawer(false)} 
        selectedUser={selectedUser}
        onOpenDrawer={setShowDrawer}
      />
    </>
  );
};

export default UsersTable;