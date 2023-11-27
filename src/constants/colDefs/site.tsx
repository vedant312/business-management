import { Check, Close } from "@mui/icons-material"
import { Button } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"

import { MIN_WIDTH, gridCellTooltip } from "./base"

const siteColDefs: GridColDef[] = [
  {
    field: "_id",
    headerName: "ID",
    flex: 0.3,
    minWidth: 0.3 * MIN_WIDTH,
    type: "string",
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
    type: "date",
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
    type: "date",
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    minWidth: MIN_WIDTH,
    type: "string",
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1.25,
    minWidth: 1.25 * MIN_WIDTH,
  },
  {
    field: "agreementDate",
    headerName: "Aggreement Date",
    flex: 1,
    minWidth: MIN_WIDTH,
    type: "date",
    valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
  },
  {
    field: "completionDate",
    headerName: "Completion Date",
    flex: 1,
    minWidth: MIN_WIDTH,
    type: "date",
    valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
  },
  {
    field: "comments",
    headerName: "Comments",
    flex: 1,
    minWidth: MIN_WIDTH,
    renderCell: (params) => gridCellTooltip(params.value),
  },
  {
    field: "isActive",
    headerName: "Active",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
    align: "center",
    renderCell: (params) => (params.value ? <Check /> : <Close />),
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
    renderCell: (params) => (
      <Button fullWidth href={`/admin/site/${params.id}`}>
        View
      </Button>
    ),
  },
]

export default siteColDefs
