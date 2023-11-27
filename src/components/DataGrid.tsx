import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import { useState } from "react"

interface DataGridProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[]
  columns: GridColDef[]
  hiddenColumns?: string[]
}

const CustomDataGrid = ({ rows, columns, hiddenColumns }: DataGridProps) => {
  const [pageSize, setPageSize] = useState(25)

  let columnVisibility: { [column: string]: boolean } = {
    _id: false,
    createdAt: false,
    updatedAt: false,
  }

  if (hiddenColumns) {
    hiddenColumns.forEach((column) => {
      columnVisibility[column] = false
    })
  }

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      autoHeight
      initialState={{ columns: { columnVisibilityModel: columnVisibility } }}
      components={{ Toolbar: GridToolbar }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      disableDensitySelector
      disableColumnFilter
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[10, 25, 50, 100]}
      getRowId={(row) => row._id}
    />
  )
}

export default CustomDataGrid
