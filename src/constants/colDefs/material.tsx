import { Button, Typography } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"

import {
  MIN_WIDTH,
  formatAmount,
  formatDate,
  gridCell,
  gridCellTooltip,
} from "./base"

const MaterialColDef: GridColDef[] = [
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
    field: "billNo",
    headerName: "Bill No",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
    renderCell: (params) => gridCellTooltip(params.value),
  },
  {
    field: "item",
    headerName: "Item",
    flex: 1,
    minWidth: MIN_WIDTH,
    renderCell: (params) => (
      <>
        {params.value}
        {params.row.quantity > 1 && (
          <Typography sx={{ ml: 1 }} color="text.secondary">
            x {params.row.quantity}
          </Typography>
        )}
      </>
    ),
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
    renderCell: (params) => formatAmount(params.value),
    valueGetter: (params) => {
      const materialRate = params.row.materialRate || 0
      const shippingRate = params.row.shippingRate || 0
      const rate = materialRate + shippingRate
      const quantity = params.row.quantity || 0
      return rate * quantity
    },
  },
  {
    field: "site",
    headerName: "Site",
    flex: 0.75,
    minWidth: 0.75 * MIN_WIDTH,
    renderCell: (params) => gridCell(params.row.site || {}, "site"),
    valueGetter: (params) => params.value?.name || "-",
  },
  {
    field: "materialPerson",
    headerName: "Material Person",
    flex: 0.75,
    minWidth: 0.75 * MIN_WIDTH,
    renderCell: (params) =>
      gridCell(
        params.row.materialPerson || {},
        "person",
        params.row.materialRate
      ),
    valueGetter: (params) => params.value?.name || "NA",
  },
  {
    field: "shippingPerson",
    headerName: "Shipping Person",
    flex: 0.75,
    minWidth: 0.75 * MIN_WIDTH,
    renderCell: (params) =>
      gridCell(
        params.row.shippingPerson || {},
        "person",
        params.row.shippingRate
      ),
    valueGetter: (params) => params.value?.name || "NA",
  },
  {
    field: "materialRate",
    headerName: "Material Rate",
    type: "number",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
  },
  {
    field: "shippingRate",
    headerName: "Shipping Rate",
    type: "number",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
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
      <Button href={`/admin/material?id=${params.id}`} fullWidth>
        View/Edit
      </Button>
    ),
  },
]

const materialColDefPerson: GridColDef[] = [
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
    field: "billNo",
    headerName: "Bill No",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
    renderCell: (params) => gridCellTooltip(params.value),
  },
  {
    field: "item",
    headerName: "Item",
    flex: 1,
    minWidth: MIN_WIDTH,
    renderCell: (params) => (
      <>
        {params.value}
        {params.row.quantity > 1 && (
          <Typography sx={{ ml: 1 }} color="text.secondary">
            x {params.row.quantity}
          </Typography>
        )}
      </>
    ),
  },
  {
    field: "materialRate",
    headerName: "Material Amount",
    type: "number",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
    valueGetter: (params) => params.row.materialRate * params.row.quantity,
  },
  {
    field: "shippingRate",
    headerName: "Shipping Amount",
    type: "number",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
    valueGetter: (params) => params.row.shippingRate * params.row.quantity,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
    flex: 0.5,
    minWidth: 0.5 * MIN_WIDTH,
  },
  {
    field: "site",
    headerName: "Site",
    flex: 0.75,
    minWidth: 0.75 * MIN_WIDTH,
    renderCell: (params) => gridCell(params.row.site || {}, "site"),
    valueGetter: (params) => params.value?.name || "-",
  },
  {
    field: "materialPerson",
    headerName: "Material Person",
    flex: 0.75,
    minWidth: 0.75 * MIN_WIDTH,
    renderCell: (params) => gridCell(params.row.materialPerson || {}, "person"),
    valueGetter: (params) => params.value?.name || "NA",
  },
  {
    field: "shippingPerson",
    headerName: "Shipping Person",
    flex: 0.75,
    minWidth: 0.75 * MIN_WIDTH,
    renderCell: (params) => gridCell(params.row.shippingPerson || {}, "person"),
    valueGetter: (params) => params.value?.name || "NA",
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
      <Button href={`/admin/material?id=${params.id}`} fullWidth>
        View/Edit
      </Button>
    ),
  },
]

export { materialColDefPerson }
export default MaterialColDef
