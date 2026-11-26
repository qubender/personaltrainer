import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import type { Training } from "./Training";
import type { Customer } from "./Customer"

interface Props {
    trainings: Training[]
}

function TrainingTable({ trainings }: Props) {

    const columns: GridColDef<Training>[] = [
        {
            field: 'customer',
            headerName: 'Customer',
            flex: 1,
            valueGetter: (value, row) =>
                row.customer
                    ? `${row.customer.firstname} ${row.customer.lastname}`
                    : 'Unknown'

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