"use client";

import React, { useState, ReactNode } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { useLoading } from "@/contexts/LoadingContext";
import { useQueryClient } from "@tanstack/react-query";



interface CreateAssociateDialogFormProps {
  children: ReactNode;
  userId?: string; // novo prop
}

export function DependentsModal({ children, userId }: CreateAssociateDialogFormProps) {
  const [currentUser, setCurrentUser] = useState<string>('');
  const [open, setOpen] = useState(false);

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
          <DialogTitle>Dependentes de {currentUser || "Associado"}</DialogTitle>
          <DialogDescription>Segue abaixo os dependentes do associado</DialogDescription>
        </DialogHeader>
        {/* resto do conteúdo */}
      </DialogContent>
    </Dialog>
  );
}