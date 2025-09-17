"use client";

import React, { useState, ReactNode } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { useLoading } from "@/contexts/LoadingContext";
import { useQueryClient } from "@tanstack/react-query";
import { useDependentsAssociated } from "@/hooks/useDependentsAssociated";



interface CreateAssociateDialogFormProps {
  children: ReactNode;
  userId?: string; // novo prop
}

export function DependentsModal({ children, userId }: CreateAssociateDialogFormProps) {
  const [currentUser, setCurrentUser] = useState<string>('');
  const [open, setOpen] = useState(false);

    const { data, isLoading, isError, error } = useDependentsAssociated(currentUser);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen && userId) setCurrentUser(userId); // seta currentUser ao abrir
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
            <button onClick={()=> console.log(data)}></button>
          <DialogTitle>Dependentes de {currentUser || "Associado"}</DialogTitle>
          <DialogDescription>Segue abaixo os dependentes do associado</DialogDescription>
        </DialogHeader>
        {/* resto do conteúdo */}
        <div className="space-y-3 rounded-lg border p-4 grid grid-cols-2 gap-4"> 
            <div> 
                <Label className="mb-1">Nome</Label> 
                <p className="text-gray-700">Enzo Gabriel Pinheiro de Leao</p> 
            </div> 
            <div> 
                <Label className="mb-1">Parentesco</Label> 
                <p className="text-gray-700">Filha</p> 
            </div> 
            <div> 
                <Label className="mb-1">Data de Nascimento</Label> 
                <p className="text-gray-700">15/08/2010</p> 
            </div> 
            <div> 
                <Label className="mb-1">CPF</Label> 
                <p className="text-gray-700">123.456.789-00</p> 
            </div> 
        </div>
        <div className="space-y-3 rounded-lg border p-4 grid grid-cols-2 gap-4"> 
            <div> 
                <Label className="mb-1">Nome</Label> 
                <p className="text-gray-700">Enzo Gabriel Pinheiro de Leao</p> 
            </div> 
            <div> 
                <Label className="mb-1">Parentesco</Label> 
                <p className="text-gray-700">Filha</p> 
            </div> 
            <div> 
                <Label className="mb-1">Data de Nascimento</Label> 
                <p className="text-gray-700">15/08/2010</p> 
            </div> 
            <div> 
                <Label className="mb-1">CPF</Label> 
                <p className="text-gray-700">123.456.789-00</p> 
            </div> 
        </div> 
        <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
                <Button type="button" variant="destructive" size="lg">Fechar</Button>
            </DialogClose>
            <Button type="submit" variant="primary" size="lg">
                <IconDeviceFloppy className="mr-2 h-4 w-4" />
                Cadastrar Associado
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}