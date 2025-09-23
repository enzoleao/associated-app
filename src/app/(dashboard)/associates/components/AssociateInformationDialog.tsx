"use client";

import React, { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { useAssociateById } from "@/hooks/useAssociateById";
import {
  formatCpfCnpj,
  formatPhoneNumber,
  formatToDDMMYYYY,
} from "@/utils";
import Image from "next/image";
import { useLoading } from "@/contexts/LoadingContext";
import { downloadProfilePdfReport } from "./actions";
import { TooltipComponent } from "@/components/Tooltip";
import { Skeleton } from "@/components/ui/skeleton";

interface CreateAssociateDialogFormProps {
  children: ReactNode;
  associateId?: string;
}

export function getBadgeClasses(color: string) {
  switch (color) {
    case "red":
      return "text-red-700 bg-red-100";
    case "yellow":
      return "text-yellow-700 bg-yellow-100";
    case "green":
      return "text-green-700 bg-green-100";
    default:
      return "text-gray-700 bg-gray-100";
  }
}

export function AssociateInformationDialog({
  children,
  associateId,
}: CreateAssociateDialogFormProps) {
  const [currentAssociated, setCurrentAssociated] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const { data, isLoading } = useAssociateById(currentAssociated);

  async function sendAndDownload(name: string, associatedId: string) {
    showLoading();
    await downloadProfilePdfReport(name, associatedId);
    hideLoading();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen && associateId) setCurrentAssociated(associateId);
      }}
    >
      <TooltipComponent title="Visualizar dados do associado">
        <DialogTrigger asChild>{children}</DialogTrigger>
      </TooltipComponent>
      <DialogContent
        className="sm:max-w-3xl"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle asChild>
            <span>Detalhes do Associado</span>
          </DialogTitle>
          <DialogDescription asChild>
            <p>Segue abaixo os detalhes do associado</p>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Avatar + Nome + Status */}
          <div className="flex flex-col items-center gap-1.5">
            {isLoading ? (
              <>
                <Skeleton className="w-[150px] h-[150px] rounded-full" />
                <Skeleton className="w-40 h-5 mt-2" />
                <Skeleton className="w-24 h-6 mt-1 rounded-full" />
              </>
            ) : (
              <>
                {data?.image_path ? (
                  <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
                    <Image
                      src={data.image_path}
                      alt="profile-image"
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-[150px] h-[150px] rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-700">
                    {data?.initials ?? "?"}
                  </div>
                )}
                <span className="text-xl font-semibold text-gray-900">
                  {data?.name}
                </span>
                <Badge
                  className={`${getBadgeClasses(
                    data?.associate.associateStatus?.color
                  )} px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {data?.associate?.associateStatus?.name}
                </Badge>
              </>
            )}
          </div>

          {/* Informações Pessoais e Associação */}
          <div className="rounded-lg border p-4 text-gray-500 flex flex-col items-start">
            {isLoading ? (
              <div className="flex justify-between w-full">
                <div className="flex flex-col gap-2 w-full">
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-48 h-4" />
                  <Skeleton className="w-40 h-4" />
                  <Skeleton className="w-44 h-4" />
                </div>
                <div className="flex flex-col gap-2 w-full max-w-[300px]">
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-36 h-4" />
                  <Skeleton className="w-40 h-4" />
                </div>
              </div>
            ) : (
              <div className="flex justify-between w-full">
                <div className="flex flex-col items-start w-full">
                  <h2 className="font-medium text-gray-900 mb-3">
                    Informações Pessoais
                  </h2>
                  <span className="flex gap-1.5">
                    <p className="text-gray-600 font-medium">E-mail: </p>
                    <p className="text-gray-900">{data?.email}</p>
                  </span>
                  <span className="flex gap-1.5">
                    <p className="text-gray-600 font-medium">Telefone: </p>
                    <p className="text-gray-900">
                      {formatPhoneNumber(data?.phone)}
                    </p>
                  </span>
                  <span className="flex gap-1.5">
                    <p className="text-gray-600 font-medium">CPF: </p>
                    <p className="text-gray-900">{formatCpfCnpj(data?.cpf)}</p>
                  </span>
                  <span className="flex gap-1.5">
                    <p className="text-gray-600 font-medium">
                      Data de Nascimento:
                    </p>
                    <p className="text-gray-900">
                      {formatToDDMMYYYY(data?.birthday)}
                    </p>
                  </span>
                </div>

                <div className="flex flex-col items-start w-full max-w-[300px]">
                  <h2 className="font-medium text-gray-900 mb-3">
                    Informações da Associação
                  </h2>
                  <span className="flex gap-1.5">
                    <p className="text-gray-600 font-medium">Data de Adesão: </p>
                    <p className="text-gray-900">
                      {formatToDDMMYYYY(data?.associate?.membership_date)}
                    </p>
                  </span>
                  <span className="flex gap-1.5">
                    <p className="text-gray-600 font-medium">Plano: </p>
                    <p className="text-gray-900">
                      {data?.associate.associatePlan?.name}
                    </p>
                  </span>
                  <span className="flex gap-1.5">
                    <p className="text-gray-600 font-medium">
                      Último Pagamento:{" "}
                    </p>
                    <p className="text-gray-900">-</p>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Endereço */}
          <div className="rounded-lg border p-4 text-gray-500 flex flex-col items-start">
            <h2 className="font-medium text-gray-900 mb-3">Endereço</h2>
            {isLoading ? (
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="w-60 h-4" />
                <Skeleton className="w-40 h-4" />
                <Skeleton className="w-44 h-4" />
              </div>
            ) : (
              data?.associate.AssociateAddress?.map((address: any) => (
                <span className="flex flex-col items-start" key={address.id}>
                  <p className="text-gray-900">
                    {address.street}, {address.number}
                  </p>
                  <p className="text-gray-900">{address.neighborhood}</p>
                  <p className="text-gray-900">
                    {address.country_state.name} - {address.country_state.initials}
                  </p>
                  <span className="flex gap-1.5">
                    <p className="text-gray-600 font-medium">CEP: </p>
                    <p className="text-gray-900">{address.zip_code}</p>
                  </span>
                </span>
              ))
            )}
          </div>

          {/* Financeiro */}
          <div className="rounded-lg border p-4 text-gray-500 flex flex-col items-start">
            <h2 className="font-medium text-gray-900 mb-3">Financeiro</h2>
            {isLoading ? (
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="w-52 h-4" />
                <Skeleton className="w-40 h-4" />
              </div>
            ) : (
              <div className="flex flex-col items-start w-full">
                <span className="flex gap-1.5">
                  <p className="text-gray-600 font-medium">
                    Preferência de Pagamento:{" "}
                  </p>
                  <p className="text-gray-900">
                    {data?.associate?.paymentPreferenceMethod?.name}
                  </p>
                </span>
                <span className="flex gap-1.5">
                  <p className="text-gray-600 font-medium">Dia de Pagamento: </p>
                  <p className="text-gray-900">
                    {data?.associate.payment_due_date}
                  </p>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="destructive" size="lg">
              Fechar
            </Button>
          </DialogClose>
          <Button
            onClick={() => {
              if (data?.name && associateId)
                sendAndDownload(data.name, associateId);
            }}
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading || !data?.name || !associateId}
          >
            <IconDeviceFloppy className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
