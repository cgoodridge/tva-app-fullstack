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
        id: 'pageTitle',
        type: 'string',
        label: 'Name',
        minWidth: 170
    },
    {
        id: 'releaseDate',
        label: 'Release Date',
        type: 'date',
        minWidth: 100,
        format: (value) => moment(value.toDate()).format("MMM-DD-YYYY"),
    },
    {
        id: 'phase',
        label: 'Phase',
        type: 'string',
        minWidth: 170,
        align: 'left',

    },

];

const checkWhiteSpace = (name) => {
    if (name) {
        return name.indexOf(' ') >= 0;
    }
}

const TimelineEventList = ({ timelineEvents, nexusEvents }) => (
    <>
{console.log("timelineEvents", timelineEvents)}
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
                    {timelineEvents.map((row, key) => {
                        return (
                            <TableRow hover tabIndex={-1} key={key}>
                                {columns.map((column, key) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={key} align={column.align}>
                                            {column.format && column.type === 'string' ? value : column.format && column.type === 'date' ? column.format(value) : column.format && column.type === 'time' ? column.format(value) : value}
                                        </TableCell>
                                    );
                                })}
                                <TableCell>
                                    <Link key={key} to={checkWhiteSpace(`${row['eventTitle']}`) ? `/event/${row['eventTitle'].replace(/ /g, "_")}` : `/event/${row['eventTitle']}`} state={{ eventData: timelineEvents.find((event) => event.code == `${row['code']}`) }}>
                                        <Button variant="outlined" size="small" color="secondary">
                                            Prime Event
                                        </Button>
                                    </Link>
                                    {row?.hasNexusEvent ?
                                        <Link key={key} to={`/event/${row['code']}`} state={{ eventData: nexusEvents.find((event) => event.code == `${row['code']}`) }}>
                                            <Button variant="outlined" size="small" color="primary">
                                                Nexus Event
                                            </Button>
                                        </Link>
                                    :
                                    ""
                                    }

                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>
);

export default TimelineEventList;