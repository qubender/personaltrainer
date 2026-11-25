import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import type { Training } from "./Training";
import type { Customer } from "./Customer"

interface Props {
    trainings: Training[]
    customers: Customer[]
}

function TrainingTable({ trainings, customers }: Props) {

    const columns: GridColDef<Training>[] = [
        {
            field: 'customer',
            headerName: 'Customer',
            flex: 1,
            renderCell: (params) => {
                
                const customer =customers.find(
                    (c) => c._links.self.href === params.row._links.customer.href
                )

                return customer
                    ? `${customer.firstname} ${customer.lastname}`
                    : 'Unknown'
            }
        },
        {
            field: 'date',
            headerName: 'Date',
            flex: 1,
            renderCell: (params) =>
                new Date(params.value).toLocaleString('fi-FI')
        },
         {
            field: 'duration',
            headerName: 'Duration (min)',
            flex: 1
        },
        {
            field: 'activity',
            headerName: 'Activity',
            flex: 1
        }
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={trainings}
                columns={columns}
                getRowId={(training) => training._links.self.href}
                showToolbar
            />
        </div>
    );
}

export default TrainingTable