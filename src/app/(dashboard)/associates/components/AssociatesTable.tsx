"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
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
import { useState, useMemo, useEffect } from "react"
import { useFilters } from "@/contexts/FilterContext"
import { DependentsModal } from "./DependentsModal"

export function getBadgeClasses(color: string) {
  switch(color) {
    case 'red': 
      return 'text-red-700 bg-red-100'
    case 'yellow': 
      return 'text-yellow-700 bg-yellow-100'
    case 'green': 
      return 'text-green-700 bg-green-100'
    default:
      return 'text-gray-700 bg-gray-100'
  }
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
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: row.original.color
                  ? row.original.color + '5D' 
                  : 'rgba(128, 128, 128, 0.3)',
              }}
            >
              <span className="text-black font-medium">{row.original.initials}</span>
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
        <DependentsModal associateId={row.original.associate.id}>
          <Button
            className="w-7 h-7 bg-transparent shadow-none text-blue-500 hover:bg-blue-100"
          >
            <IconEye />
          </Button>
        </DependentsModal>
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

const PAGE_SIZE = 10;

const MemoizedTableBody = React.memo(function MemoizedTableBody({
  rows,
  loading
}: {
  rows: any[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <>
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
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
        ))}
      </>
    );
  }
  return (
    <>
      {rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="h-[85px]">
          {row.getVisibleCells().map((cell: { id: React.Key | null | undefined; column: { columnDef: { cell: string | number | bigint | boolean | React.ComponentType<any> | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined } }; getContext: () => any }) => (
            <TableCell key={cell.id} className="px-4 py-3 text-sm text-gray-600">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
});

export function AssociatesTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [currentPage, setCurrentPage] = useState(1);

  const { searchTerm, associateStatusId } = useFilters();
  const { data: associatesFetchData, isLoading, isFetching } = useAssociates({
    search_term: searchTerm,
    associate_status_id: associateStatusId,
    page: currentPage,
    per_page: PAGE_SIZE,
  });
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, associateStatusId]);

  const mappedData = useMemo(() =>
    (associatesFetchData?.data || []).map((item: any) => ({
      id: item.id || "-",
      name: item.name || "-",
      email: item.email || "-",
      color: item.color || "gray",
      cpf: item.cpf || "-",
      image: item.image_path || "-",
      initials: item.initials || "-",
      status: item.associate?.associateStatus || { id: "-", name: "-", color: "gray" },
      plan: item.associate?.associatePlan || { id: "-", name: "-" },
      dependents_count: item.associate?._count?.dependent ?? 0,
      membership_start_date: item.associate?.membership_date || "-",
      last_payment: item.associate?.last_payment || "-",
      associate: item.associate || { id: "-" }
    })),
    [associatesFetchData?.data]
  );

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
  });

  const totalItems = associatesFetchData?.meta?.total_items || 0;
  const currentMetaPage = associatesFetchData?.meta?.page || currentPage;
  const perPage = associatesFetchData?.meta?.per_page || PAGE_SIZE;

  const startItem = totalItems === 0 ? 0 : (currentMetaPage - 1) * perPage + 1;
  const endItem = Math.min(currentMetaPage * perPage, totalItems);

  const totalPages = associatesFetchData?.meta?.total_pages || 1;

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
            <MemoizedTableBody rows={table.getRowModel().rows} loading={isLoading || isFetching} />
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length} className="px-4 py-4 text-sm font-light text-gray-700">
                <div className="flex justify-between items-center">
                  <span>
                    Mostrando {startItem}-{endItem} de {totalItems} associados
                  </span>
                  <div className="flex justify-end mt-2 gap-2">
                    <Button
                      variant="primary"
                      disabled={currentMetaPage <= 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      Anterior
                    </Button>
                    <span className="flex items-center px-2">
                      {currentMetaPage} / {totalPages}
                    </span>
                    <Button
                      variant="primary"
                      disabled={currentMetaPage >= totalPages}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      Próxima
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
  
    </div>
  )
}
