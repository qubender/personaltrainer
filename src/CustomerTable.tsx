import type { Customer } from "./Customer"
import { useState } from "react"
import type { NewCustomer } from "./Customer";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { TextField } from '@mui/material'

interface Props {
    customers: Customer[]
    newCustomer: NewCustomer
    addCustomer: () => void
    setNewCustomer: React.Dispatch<React.SetStateAction<NewCustomer>>
}

function CustomerTable({ customers, newCustomer, setNewCustomer, addCustomer }: Props) {

    const [order, setOrder] = useState<'asc' | 'desc'>('asc')
    const [orderBy, setOrderBy] = useState<keyof Customer>('firstname')
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)

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

    const filteredCustomers = sortedCustomers.filter((customer) =>
        Object.values({
            firstname: customer.firstname,
            lastname: customer.lastname,
            streetaddress: customer.streetaddress,
            postcode: customer.postcode,
            city: customer.city,
            email: customer.email,
            phone: customer.phone
        }).some((value) =>
            value.toLowerCase().includes(search.toLowerCase())
        )
    )

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

        <>

            <Button onClick={() => setOpen(true)}>
                Add customer
            </Button>
            <TableContainer component={Paper}>

                <TextField
                    label="Search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
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
                        {filteredCustomers.map((customer) => (
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
            <Dialog open={open} onClose={() => setOpen(false)}>
                <TextField
                    label="First name"
                    value={newCustomer.firstname}
                    onChange={(e) =>
                        setNewCustomer({
                            ...newCustomer,
                            firstname: e.target.value
                        })
                    }
                />
                <TextField
                    label="Last name"
                    value={newCustomer.lastname}
                    onChange={(e) =>
                        setNewCustomer({
                            ...newCustomer,
                            lastname: e.target.value
                        })
                    }
                />
                <TextField
                    label="Street address"
                    value={newCustomer.streetaddress}
                    onChange={(e) =>
                        setNewCustomer({
                            ...newCustomer,
                            streetaddress: e.target.value
                        })
                    }
                />
                <TextField
                    label="Post code"
                    value={newCustomer.postcode}
                    onChange={(e) =>
                        setNewCustomer({
                            ...newCustomer,
                            postcode: e.target.value
                        })
                    }
                />
                <TextField
                    label="City"
                    value={newCustomer.city}
                    onChange={(e) =>
                        setNewCustomer({
                            ...newCustomer,
                            city: e.target.value
                        })
                    }
                />
                <TextField
                    label="Email"
                    value={newCustomer.email}
                    onChange={(e) =>
                        setNewCustomer({
                            ...newCustomer,
                            email: e.target.value
                        })
                    }
                />
                <TextField
                    label="Phone number"
                    value={newCustomer.phone}
                    onChange={(e) =>
                        setNewCustomer({
                            ...newCustomer,
                            phone: e.target.value
                        })
                    }
                />
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>
                        Cancel
                    </Button>

                    <Button onClick={async () => {
                        await addCustomer()
                        setOpen(false)
                    }}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default CustomerTable