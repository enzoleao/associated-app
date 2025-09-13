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
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Dados completos dos associados
const associatesData = [
  {
    id: "1",
    name: "Roberto Almeida Jr",
    email: "roberto.almeida@email.com",
    cpf: "12345678909",
    image: "https://bucket-production-eaf6.up.railway.app/associated-production/public%2Fassociates%2Fpremium_photo-1689568126014-06fea9d5d341.jpeg",
    status: { id: 2, name: "Inativo" },
    plan: { id: 1, name: "Standard" },
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
    status: { id: 1, name: "Ativo" },
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
    status: { id: 1, name: "Ativo" },
    plan: { id: 3, name: "Family" },
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
    status: { id: 3, name: "Aguardando Pagamento" },
    plan: { id: 1, name: "Standard" },
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
    status: { id: 2, name: "Inativo" },
    plan: { id: 2, name: "Premium" },
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
    status: { id: 1, name: "Ativo" },
    plan: { id: 3, name: "Family" },
    dependents_count: 4,
    membership_start_date: "2021-03-14",
    last_payment: "2025-09-10",
  },
]

export type Associate = typeof associatesData[number]

export const columns: ColumnDef<Associate>[] = [
  {
    accessorKey: "image",
    header: "Foto",
    cell: ({ row }) => (
      <img
        src={row.getValue("image")}
        alt={row.original.name}
        className="h-10 w-10 rounded-full object-cover"
      />
    ),
  },
  {
    accessorKey: "name",
    header: () => <Button variant="ghost">Nome <ArrowUpDown /></Button>,
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: () => <Button variant="ghost">Email <ArrowUpDown /></Button>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "cpf",
    header: "CPF",
    cell: ({ row }) => <div>{row.getValue("cpf")}</div>,
  },
  {
    // Usando accessorFn para acessar propriedade aninhada
    accessorFn: (row) => row.status.name,
    id: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorFn: (row) => row.plan.name,
    id: "plan",
    header: "Plano",
    cell: ({ row }) => <div>{row.getValue("plan")}</div>,
  },
  {
    accessorKey: "dependents_count",
    header: "Dependentes",
    cell: ({ row }) => <div className="text-center">{row.getValue("dependents_count")}</div>,
  },
  {
    accessorKey: "membership_start_date",
    header: "Início",
    cell: ({ row }) => <div>{row.getValue("membership_start_date")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Ver associado</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
export function AssociatesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
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
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
