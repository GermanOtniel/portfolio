import { Popover, Whisper, Checkbox, Table, CellProps } from 'rsuite';
import { USERS } from '../../../language';
import { useThemeContext } from '../../../context/themeContext/Theme.Context';

const { Cell } = Table;

export const NameCell = ({ rowData, dataKey, ...props }: CellProps<any>) => {
  const { language } = useThemeContext();

  const speaker = (
    <Popover title={USERS[language].T}>
      <p>
        <b>{USERS[language].F}:</b> {rowData.fullName}
      </p>
      <p>
        <b>{USERS[language].Ñ}:</b> {rowData.email}
      </p>
      <p>
        <b>{USERS[language].O}:</b> {rowData.city}
      </p>
      <p>
        <b>{USERS[language].P}:</b> {rowData.street}
      </p>
    </Popover>
  );

  return (
    <Cell {...props}>
      <Whisper placement="top" speaker={speaker}>
        {/* eslint-disable-next-line */}
        <a>{dataKey ? rowData[dataKey] : null}</a>
      </Whisper>
    </Cell>
  );
};

export const ImageCell = ({ rowData, dataKey, ...props }: CellProps<any>) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        width: 40,
        height: 40,
        background: '#f5f5f5',
        borderRadius: 6,
        marginTop: 2,
        overflow: 'hidden',
        display: 'inline-block'
      }}
    >
      <img alt={`file ${dataKey || rowData}`} src={rowData[dataKey!]} width="40" />
    </div>
  </Cell>
);

export const CheckCell = ({
  rowData,
  onChange,
  checkedKeys,
  dataKey,
  ...props
}: CellProps<any> & {
  checkedKeys: string[];
  onChange: (value: any, checked: boolean) => void;
}) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div style={{ lineHeight: '46px' }}>
      <Checkbox
        value={rowData[dataKey!]}
        inline
        onChange={onChange}
        checked={checkedKeys.some(item => item === rowData[dataKey!])}
      />
    </div>
  </Cell>
);