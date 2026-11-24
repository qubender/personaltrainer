import type { Customer } from "./Customer"
import { useState } from "react"
/*import { alpha } from '@mui/material'
import Box from '@mui/material/Box'*/
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
//import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
/*import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'*/
import Paper from '@mui/material/Paper';
/*import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils'*/

interface Props {
    customers: Customer[]
}

function CustomerTable({ customers }: Props) {

    const [order, setOrder] = useState<'asc' | 'desc'>('asc')
    const [orderBy, setOrderBy] = useState<keyof Customer>('firstname')

    const handleSort = (property: keyof Customer) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const sortedCustomers = [...customers].sort((a, b) => {
        const valueA = String(a[orderBy]).toLowerCase()
        const valueB = String(b[orderBy]).toLowerCase()
        return order === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA)
    })

    const headCells = [
        { id: "firstname", numeric: false, disablePadding: true, label: "Firstname" },
        { id: "lastname", numeric: false, disablePadding: false, label: "Lastname" },
        { id: "streetaddress", numeric: false, disablePadding: false, label: "Street address" },
        { id: "postcode", numeric: false, disablePadding: false, label: "Postcode" },
        { id: "city", numeric: false, disablePadding: false, label: "City" },
        { id: "email", numeric: false, disablePadding: false, label: "Email" },
        { id: "phone", numeric: false, disablePadding: false, label: "Phone" },
    ];

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headCells.map((cell) => (
                            <TableCell key={cell.id}>
                                <TableSortLabel
                                    active={orderBy === cell.id}
                                    direction={orderBy === cell.id ? order : 'asc'}
                                    onClick={() => handleSort(cell.id as keyof Customer)}
                                >
                                    {cell.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {sortedCustomers.map((customer) => (
                        <TableRow key={customer._links.self.href}>
                            <TableCell>{customer.firstname}</TableCell>
                            <TableCell>{customer.lastname}</TableCell>
                            <TableCell>{customer.streetaddress}</TableCell>
                            <TableCell>{customer.postcode}</TableCell>
                            <TableCell>{customer.city}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


export default CustomerTable