import React, { useState, ChangeEvent, useRef } from 'react';
import * as XLSX from 'xlsx';
import { MainButton } from '../../../components/shared';
import { useThemeContext } from '../../../context/themeContext/Theme.Context';
import { Button, Tooltip, Whisper } from 'rsuite';

const ExcelReader: React.FC = () => {
  const refFile = useRef<HTMLInputElement | null>(null);
  const [data, setData] = useState<string[][]>([]);
  const { theme, } = useThemeContext();
  const [overColRow, setOverColRow] = useState({
    rowId: "",
    colId: "",
  });
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const binaryStr = e.target?.result;
      if (typeof binaryStr !== 'string') return;

      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData: string[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "", blankrows: false, rawNumbers: true });
      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const handleDeleteColumn = (columnIndex: number) => {
    let copyData = [...data];
    copyData.forEach((row, index) => {
      copyData[index].splice(columnIndex, 1);
    })
    setData(copyData);
  };

  const handleDeleteRow = (rowIndex: number) => {
    const copyData = [...data];
    copyData.splice(rowIndex, 1);
    setData(copyData);
  };
  
  return (
    <>
      <div className='table-toolbar' style={{ display: "flex", flexDirection: "column", justifyContent: "end", alignItems: "end", gap: 8 }}>
        <MainButton
          theme={theme} 
          appearance="ghost" 
          onClick={() => refFile.current?.click()}
        >
          Cargar Excel
        </MainButton>
        <p style={{ fontSize: "10px", fontWeight: "light" }}>{fileName}</p>
      </div>
      <div className='custom-table-container' style={{ overflow: "scroll" }}>
        <input 
          ref={refFile} 
          type="file" 
          style={{ display: "none" }} 
          accept=".xlsx, .xls" 
          onChange={handleFileUpload} 
        />
        {data.length > 0 && (
          <table style={{ overflow: "scroll", borderCollapse: "collapse", margin: "0 auto" }}>
            <tbody style={{ width: "auto" }}>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} style={{ backgroundColor: overColRow.colId === String(rowIndex) ? "red" : "inherit" }}>
                  {row.map((item, index) => (
                    <React.Fragment
                      key={index} 
                    >
                      <td 
                        style={{ minWidth: "150px", backgroundColor: overColRow.rowId === String(index) ? "red" : "inherit" }} 
                        className='custom-table-cell'
                        onMouseOver={() => setOverColRow({ colId: String(rowIndex), rowId: String(index) })}
                      >
                          <Whisper
                            trigger="hover"
                            placement="top"
                            controlId={`control-id-top`}
                            enterable
                            speaker={
                              <Tooltip style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                <Button onClick={() => handleDeleteRow(rowIndex)}>Borrar fila</Button>
                                <Button onClick={() => handleDeleteColumn(index)}>Borrar columna</Button>
                              </Tooltip>
                            }
                          >
                            <p>{item || " - "}</p>
                          </Whisper>
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ExcelReader;
