import { Button } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"

import {
  MIN_WIDTH,
  formatAmount,
  formatDate,
  gridCell,
  gridCellTooltip,
} from "./base"

const expenseColDef: GridColDef[] = [
  {
    field: "_id",
    headerName: "ID",
    flex: 0.3,
    minWidth: 0.3 * MIN_WIDTH,
    renderCell: (params) => gridCellTooltip(params.value),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
    minWidth: MIN_WIDTH,
    valueGetter: (params) => formatDate(params.value),
    renderCell: (params) => gridCellTooltip(params.value),
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    flex: 1,
    minWidth: MIN_WIDTH,
    valueGetter: (params) => formatDate(params.value),
    renderCell: (params) => gridCellTooltip(params.value),
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    minWidth: MIN_WIDTH,
    valueGetter: (params) => formatDate(params.value),
    renderCell: (params) => gridCellTooltip(params.value),
  },
  {
    field: "subject",
    headerName: "Subject",
    flex: 1,
    minWidth: MIN_WIDTH,
    type: "string",
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
    renderCell: (params) => formatAmount(params.value),
  },
  {
    field: "person",
    headerName: "Person",
    flex: 0.75,
    minWidth: 0.75 * MIN_WIDTH,
    renderCell: (params) => gridCell(params.row.person || {}, "person"),
    valueGetter: (params) => params.value?.name || "-",
  },
  {
    field: "site",
    headerName: "Site",
    flex: 0.75,
    minWidth: 0.75 * MIN_WIDTH,
    renderCell: (params) => gridCell(params.row.site || {}, "site"),
    valueGetter: (params) => params.value?.name || "NA",
  },
  {
    field: "mode",
    headerName: "Mode",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
  },
  {
    field: "remarks",
    headerName: "Remarks",
    flex: 1,
    minWidth: MIN_WIDTH,
    renderCell: (params) => gridCellTooltip(params.value),
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
    renderCell: (params) => (
      <Button href={`/admin/expense?id=${params.id}`} fullWidth>
        View/Edit
      </Button>
    ),
  },
]

export default expenseColDef
