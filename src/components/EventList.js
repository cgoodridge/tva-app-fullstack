import React from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import moment from 'moment';


const columns = [
  {
    id: 'code',
    type: 'string',
    label: 'Event',
    minWidth: 170
  },
  {
    id: 'dateTime',
    label: 'Date',
    type: 'date',
    minWidth: 100,
    format: (value) => moment(value).format("MMM-DD-YYYY"),
  },
  {
    id: 'dateTime',
    label: 'Time',
    type: 'time',
    minWidth: 170,
    align: 'left',
    format: (value) => moment(value).format("h:mm a"),
  },
  {
    id: 'location',
    label: 'Location',
    type: 'string',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },

];


const EventList = ({ nexusEvents }) => (
  <>
    <TableContainer className="tableContainer">
      <Table stickyHeader aria-label="sticky table">
        <TableHead >
          <TableRow>
            {columns.map((column, key) => (
              <TableCell
                key={key}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
            <TableCell>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nexusEvents.map((row, key) => {
            return (
              <TableRow hover tabIndex={-1} key={key}>
                {row.isNexusEvent ? columns.map((column, key) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={key} align={column.align}>
                      {column.format && column.type === 'string' ? value : column.format && column.type === 'date' ? column.format(value) : column.format && column.type === 'time' ? column.format(value) : value}
                    </TableCell>
                  );
                }) : <></>}
                <TableCell>
                  <Link key={key} to={`/event/${row['code']}`} state={{ eventData: row }}>
                    <Button variant="outlined" size="small" color="primary">
                      View Event
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

export default EventList;