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

const associatesData = [
  {
    id: "1",
    name: "Roberto Almeida Jr",
    email: "roberto.almeida@email.com",
    cpf: "12345678909",
    image: "https://bucket-production-eaf6.up.railway.app/associated-production/public%2Fassociates%2Fpremium_photo-1689568126014-06fea9d5d341.jpeg",
    status: { 
      id: 2, 
      name: "Inativo" ,
      color: "red",
    },
    plan: { 
      id: 1, 
      name: "Standard" 
    },
    dependents_count: 2,
    membership_start_date: "2025-09-11",
    last_payment: "2025-09-02",
  },
  {
    id: "2",
    name: "Fernanda Costa",
    email: "fernanda.costa@email.com",
    cpf: "98765432100",
    image: "https://bucket-production-eaf6.up.railway.app/associated-production/public%2Fassociates%2FThree-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture.jpg",
    status: { 
      id: 1, 
      name: "Ativo",
      color: "green", 
    },
    plan: { id: 2, name: "Premium" },
    dependents_count: 0,
    membership_start_date: "2024-05-20",
    last_payment: "2025-08-28",
  },
  {
    id: "3",
    name: "Carlos Henrique",
    email: "carlos.henrique@email.com",
    cpf: "11122233344",
    image: "https://bucket-production-eaf6.up.railway.app/associated-production/public%2Fassociates%2Fpexels-andrewperformance1-697509.jpg",
    status: { 
      id: 1, 
      name: "Ativo",
      color: "green",  
    },
    plan: { 
      id: 3, 
      name: "Family" 
    },
    dependents_count: 3,
    membership_start_date: "2023-11-15",
    last_payment: "2025-09-05",
  },
  {
    id: "4",
    name: "Juliana Mendes",
    email: "juliana.mendes@email.com",
    cpf: "55566677788",
    image: "https://bucket-production-eaf6.up.railway.app/associated-production/public%2Fassociates%2Fcloseup-portrait-girl-employee-job-seeker_274222-25866.jpg",
    status: { 
      id: 3, 
      name: "Pendente",
      color: "yellow" 
    },
    plan: { 
      id: 1, 
      name: "Standard" 
    },
    dependents_count: 1,
    membership_start_date: "2025-01-10",
    last_payment: "2025-07-30",
  },
  {
    id: "5",
    name: "Marcos Oliveira",
    email: "marcos.oliveira@email.com",
    cpf: "00011122233",
    image: "https://bucket-production-eaf6.up.railway.app/associated-production/public%2Fassociates%2FPosdal%2C%20Bradley.jpg",
    status: { 
      id: 2, 
      name: "Inativo",
      color: "red", 
    },
    plan: { 
      id: 2, 
      name: "Premium" 
    },
    dependents_count: 2,
    membership_start_date: "2022-08-05",
    last_payment: "2024-12-22",
  },
  {
    id: "6",
    name: "Ana Paula Souza",
    email: "ana.paula@email.com",
    cpf: "44455566677",
    image: "https://bucket-production-eaf6.up.railway.app/associated-production/public%2Fassociates%2FHKstrategies-755-1-1024x683.jpg",
    status: { 
      id: 1, 
      name: "Ativo",
      color: "green" 
    },
    plan: { 
      id: 3, 
      name: "Family" 
    },
    dependents_count: 4,
    membership_start_date: "2021-03-14",
    last_payment: "2025-09-10",
  },
]

export function getBadgeClasses(status_name: string) {
  switch (status_name) {
    case "Inativo":
      return "text-red-500 bg-red-100";
    case "Ativo":
      return "text-green-500 bg-green-100";
    case "Pendente":
      return "text-yellow-500 bg-yellow-100";
  }
}


export type Associate = typeof associatesData[number]

export const columns: ColumnDef<Associate>[] = [
  {
    id: "associated",
    header: "ASSOCIADO",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-3 pr-4">
        <img
          src={row.original.image}
          alt={row.original.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="font-medium text-gray-900">{row.original.name}</p>
          <p className="text-sm text-gray-500">{row.original.email}</p>
          <p className="text-sm text-gray-400">{formatCpfCnpj(row.original.cpf)}</p>
        </div>
      </div>
    ),
  },
  {
    accessorFn: (row) => row.status.name,
    id: "status",
    header: "STATUS",
    cell: ({ row }) => (
      <div>
        <Badge
          variant="secondary"
          className={`${getBadgeClasses(row.original.status.name)}`}
        >
          {row.getValue("status")}
        </Badge>
      </div>
    ),
  },
  {
    accessorFn: (row) => row.plan.name,
    id: "plan",
    header: "PLANO",
    cell: ({ row }) => <div>{row.getValue("plan")}</div>,
  },
  {
    accessorKey: "dependents_count",
    header: "DEPENDENTES",
    cell: ({ row }) => (
      <div className="text-start flex items-center gap-2">
        {row.getValue("dependents_count")}
        <Button onClick={()=> console.log(row.original)} className="w-7 h-7 bg-transparent shadow-none text-blue-500 hover:bg-blue-100">
          <IconEye />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "membership_start_date",
    header: "ENTRADA",
    cell: ({ row }) => <div>{formatToDDMMYYYY(row.getValue("membership_start_date"))}</div>,
  },
  {
    accessorKey: "last_payment",
    header: "ÚLTIMO PAGAMENTO",
    cell: ({ row }) => <div>{formatToDDMMYYYY(row.getValue("last_payment"))}</div>,
  },
  {
    id: "actions",
    header: "AÇÕES",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button onClick={()=> console.log(row.original)} className="w-7 h-7 bg-transparent shadow-none text-blue-500 hover:bg-blue-100">
          <IconEye />
        </Button>
        <Button onClick={()=> console.log(row.original)} className="w-7 h-7 bg-transparent shadow-none text-yellow-500 hover:bg-yellow-100">
          <IconPencilMinus />
        </Button>
        <Button onClick={()=> console.log(row.original)} className="w-7 h-7 bg-transparent shadow-none text-red-500 hover:bg-red-100">
          <IconTrash />
        </Button>
      </div>
    ),
  },
]

export function AssociatesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    {}
  )
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: associatesData,
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
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-3 text-sm text-gray-600"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No results.
                </TableCell>
              </TableRow>
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
