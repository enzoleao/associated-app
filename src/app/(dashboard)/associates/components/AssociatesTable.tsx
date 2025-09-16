"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCpfCnpj, formatToDDMMYYYY } from "@/utils"
import { IconEye, IconPencilMinus, IconTrash } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { useAssociates } from "@/hooks/useAssociates"
import { useState } from "react"
import { useFilters } from "@/contexts/FilterContext"

export function getBadgeClasses(color: string) {
  return `text-${color}-700 bg-${color}-100`
}


export const columns: ColumnDef<any>[] = [
  {
  id: "associated",
  header: "ASSOCIADO",
  enableHiding: false,
  cell: ({ row }) => {
    const hasImage = !!row.original.image && row.original.image !== '-';
    return (
      <div className="flex items-center gap-3 pr-4">
        {hasImage ? (
          <img
            src={row.original.image}
            alt={row.original.name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 font-medium">{row.original.initials}</span>
          </div>
        )}
        <div className="flex flex-col">
          <p className="font-medium text-gray-900">{row.original.name || "-"}</p>
          <p className="text-sm text-gray-500">{row.original.email || "-"}</p>
          <p className="text-sm text-gray-400">{formatCpfCnpj(row.original.cpf || "-")}</p>
        </div>
      </div>
    );
  },
},
  {
    accessorFn: (row) => row.status.name,
    id: "status",
    header: "STATUS",
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className={`${getBadgeClasses(row.original.status?.color || "-")}`}
      >
        {row.original.status?.name || "-"}
      </Badge>
    ),
  },
  {
    accessorFn: (row) => row.plan.name,
    id: "plan",
    header: "PLANO",
    cell: ({ row }) => <div>{row.original.plan?.name || "-"}</div>,
  },
  {
    accessorKey: "dependents_count",
    header: "DEPENDENTES",
    cell: ({ row }) => (
      <div className="text-start flex items-center gap-2">
        {row.original.dependents_count ?? 0}
        <Button
          onClick={() => console.log(row.original)}
          className="w-7 h-7 bg-transparent shadow-none text-blue-500 hover:bg-blue-100"
        >
          <IconEye />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "membership_start_date",
    header: "ENTRADA",
    cell: ({ row }) => (
      <div>{row.original.membership_start_date !== "-" ? formatToDDMMYYYY(row.original.membership_start_date) : "-"}</div>
    ),
  },
  {
    accessorKey: "last_payment",
    header: "ÚLTIMO PAGAMENTO",
    cell: ({ row }) => (
      <div>{row.original.last_payment !== "-" ? formatToDDMMYYYY(row.original.last_payment) : "-"}</div>
    ),
  },
  {
    id: "actions",
    header: "AÇÕES",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          onClick={() => console.log(row.original)}
          className="w-7 h-7 bg-transparent shadow-none text-blue-500 hover:bg-blue-100"
        >
          <IconEye />
        </Button>
        <Button
          onClick={() => console.log(row.original)}
          className="w-7 h-7 bg-transparent shadow-none text-yellow-500 hover:bg-yellow-100"
        >
          <IconPencilMinus />
        </Button>
        <Button
          onClick={() => console.log(row.original)}
          className="w-7 h-7 bg-transparent shadow-none text-red-500 hover:bg-red-100"
        >
          <IconTrash />
        </Button>
      </div>
    ),
  },
]

export function AssociatesTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

      const { searchTerm, associateStatusId } = useFilters();


  const { data: associatesFetchData, isLoading: associateFetchLoading } = useAssociates({search_term: searchTerm, associate_status_id: associateStatusId})

 const mappedData = React.useMemo(() => 
  (associatesFetchData?.data || []).map((item: {
    initials: any; id: any; name: any; email: any; cpf: any; image_path: any; associate: { associateStatus: any; associatePlan: any; dependents_count: any; membership_date: any; last_payment: any, initials: any } 
}) => ({
    id: item.id || "-",
    name: item.name || "-",
    email: item.email || "-",
    cpf: item.cpf || "-",
    image: item.image_path || "-",
    initials: item.initials,
    status: item.associate?.associateStatus || { id: "-", name: "-", color: "gray" },
    plan: item.associate?.associatePlan || { id: "-", name: "-" },
    dependents_count: item.associate?.dependents_count ?? 0,
    membership_start_date: item.associate?.membership_date || "-",
    last_payment: item.associate?.last_payment || "-",
  }))
, [associatesFetchData?.data])

  const table = useReactTable({
    data: mappedData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-3 font-semibold text-gray-500 bg-gray-50 text-xs"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
          {associateFetchLoading ? (
  Array.from({ length: 5 }).map((_, i) => (
    <TableRow key={i} className="h-[85px]">
      <TableCell className="px-4 py-3 w-[420px]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
          <div className="flex flex-col gap-1">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </TableCell>

      <TableCell className="px-4 py-3 w-[102px]">
        <div className="h-5 w-14 bg-gray-200 rounded-full animate-pulse"></div>
      </TableCell>

      <TableCell className="px-4 py-3 w-[98px]">
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
      </TableCell>

      <TableCell className="px-4 py-3 max-w-[150px]">
        <div className="h-4 w-6 bg-gray-200 rounded animate-pulse"></div>
      </TableCell>

      <TableCell className="px-4 py-3">
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
      </TableCell>

      <TableCell className="px-4 py-3">
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
      </TableCell>

      <TableCell className="flex gap-2 px-4 py-3 mt-3">
        <div className="h-7 w-7 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-7 w-7 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-7 w-7 bg-gray-200 rounded-full animate-pulse"></div>
      </TableCell>
    </TableRow>
  ))
  ) : (
    table.getRowModel().rows.map((row) => (
      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="h-[85px]">
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id} className="px-4 py-3 text-sm text-gray-600">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))
  )}

          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length} className="px-4 py-4 text-sm font-light text-gray-700">
                Mostrando {table.getRowModel().rows.length} de {table.getCoreRowModel().rows.length} associados
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}
