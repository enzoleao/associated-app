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
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useDependentsAssociated } from "@/hooks/useDependentsAssociated";
import { formatCpfCnpj, formatToDDMMYYYY } from "@/utils";

interface CreateAssociateDialogFormProps {
  children: ReactNode;
  associateId?: string;
}

export function DependentsModal({
  children,
  associateId,
}: CreateAssociateDialogFormProps) {
  const [currentAssociated, setCurrentAssociated] = useState<string>("");
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useDependentsAssociated(currentAssociated);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen && associateId) setCurrentAssociated(associateId);
      }}
    >
      <DialogTrigger asChild>
        {children}
        </DialogTrigger>
      <DialogContent className="sm:max-w-3xl"   
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        >
        <DialogHeader>
          <DialogTitle asChild>
            {isLoading ? (
                <div>
                <Skeleton className="h-6 w-64" />
                </div>
            ) : (
                <span>Dependentes de {data?.user.name ?? ""}</span>
            )}
            </DialogTitle>

            <DialogDescription asChild>
            {isLoading ? (
                <div className="mt-2">
                <Skeleton className="h-4 w-72" />
                </div>
            ) : (
                <p>Segue abaixo os dependentes do associado</p>
            )}
            </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {isLoading
            ? Array.from({ length: 2 }).map((_, idx) => (
                <div
                  key={idx}
                  className="space-y-3 rounded-lg border p-4 grid grid-cols-2 gap-4"
                >
                  <div>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-5 w-36" />
                  </div>
                </div>
              ))
            : data?.dependent?.length
            ? data.dependent.map((dep: any, idx: number) => (
                <div
                  key={idx}
                  className="space-y-3 rounded-lg border p-4 grid grid-cols-2 gap-4"
                >
                  <div>
                    <Label className="mb-1">Nome</Label>
                    <p className="text-gray-700">{dep.name ?? "-"}</p>
                  </div>
                  <div>
                    <Label className="mb-1">Parentesco</Label>
                    <p className="text-gray-700">{dep.dependent_relationship?.name ?? "-"}</p>
                  </div>
                  <div>
                    <Label className="mb-1">Data de Nascimento</Label>
                    <p className="text-gray-700">{dep.birthday ? formatToDDMMYYYY(dep.birthday) : "-"}</p>
                  </div>
                  <div>
                    <Label className="mb-1">CPF</Label>
                    <p className="text-gray-700">{dep.cpf ? formatCpfCnpj(dep.cpf) : "-"}</p>
                  </div>
                </div>
              ))
            : (
              <div className="rounded-lg border p-4 text-center text-gray-500">
                Nenhum dependente cadastrado
              </div>
            )}
        </div>

        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="destructive" size="lg">
              Fechar
            </Button>
          </DialogClose>
          <Button type="submit" variant="primary" size="lg">
            <IconDeviceFloppy className="mr-2 h-4 w-4" />
            Cadastrar Dependente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
