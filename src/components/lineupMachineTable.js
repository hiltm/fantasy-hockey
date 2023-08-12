import React, { useEffect } from 'react';
import { useTable } from 'react-table';
import './scheduleGrid.scss';

function ScheduleGridComponent({ columns, data }) {
  // const [players] = useState([
  //   { name: 'Alex Ovechkin', id: '8471214' },
  //   { name: 'Mika Zibanejad', id: '8476459' },
  //   { name: 'Jonathan Huberdeau', id: '8476456' },
  //   { name: 'Jake Guentzel', id: '8477404' },
  //   { name: 'Ryan Nugent-Hopkins', id: '8476454' },
  //   { name: 'J.T. Miller', id: '8476468' },
  //   { name: 'Filip Forsberg', id: '8476887' },
  //   { name: 'Brady Tkachuk', id: '8480801' },
  //   { name: 'Max Domi', id: '8477503' },
  //   { name: 'Chris Kreider', id: '8475184' },
  // ]);
  // const [defensePlayers] = useState([
  //   { name: 'Brent Burns', id: '8470613' },
  //   { name: 'Ryan Pulock', id: '8477506' },
  //   { name: 'Mark Giordano', id: '8470966' },
  //   { name: 'Quinn Hughes', id: '8480800' },
  //   { name: 'Adam Fox', id: '8479323' },
  //   { name: 'Rasmus Ristolainen', id: '8477499' },
  // ]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  useEffect(() => {
    // console.log(columns, data);
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ScheduleGridComponent;