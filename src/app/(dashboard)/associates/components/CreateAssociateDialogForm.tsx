"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { ReactNode } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputFile } from "./InputFile";
import { cn } from "@/lib/utils";

interface CreateAssociateDialogFormProps {
  children: ReactNode;
}

interface FormValues {
  email: string;
  name: string;
  cpf: string;
  phone: string;
  rg?: string;  // O campo RG é opcional
}

export function CreateAssociateDialogForm({ children }: CreateAssociateDialogFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-4xl"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <DialogHeader className="gap-1.5">
            <DialogTitle>Cadastrar Associado</DialogTitle>
            <DialogDescription>
              Preencha os dados completos do novo associado
            </DialogDescription>
          </DialogHeader>
            <div className="w-full flex items-center justify-center">
                <InputFile />
            </div>
            <div className="flex flex-col gap-4 border p-6 rounded-lg">
                <h2 className="text-lg font-medium text-gray-900">Dados Pessoais</h2>
                <div className="flex flex-col gap-3">
                  <div className="w-full">
                      <Label className="text-sm font-medium text-gray-700" htmlFor="name">Nome Completo</Label>
                      <Input
                          id="name"
                          placeholder="Digite o nome completo"
                          type="text"
                          {...register("name", { required: "Nome é obrigatório" })}
                          className={cn(
                          "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2",
                          errors.name
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-blue-500"
                          )}
                          autoComplete="name"
              
                      />
                      {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                  </div>
                  <section className="flex gap-2">
                    <div className="w-full">
                          <Label className="text-sm font-medium text-gray-700" htmlFor="email">Email</Label>
                          <Input
                              id="email"
                              placeholder="seu@email.com"
                              type="text"
                              {...register("email", { required: "Email é obrigatório" })}
                              className={cn(
                              "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2",
                              errors.email
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-gray-300 focus:ring-blue-500"
                              )}
                              autoComplete="username"
                  
                          />
                          {errors.email && (
                              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                          )}
                    </div>
                    <div className="w-full">
                        <Label className="text-sm font-medium text-gray-700" htmlFor="phone">Telefone</Label>
                        <Input
                            id="phone"
                            placeholder="(99) 99999-9999"
                            type="text"
                            {...register("phone", { required: "Telefone é obrigatório" })}
                            className={cn(
                            "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2",
                            errors.phone
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                            )}
                            autoComplete="phone"
                
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                    </div>
                  </section>
                  <section className="flex gap-2">
                    <div className="w-full">
                          <Label className="text-sm font-medium text-gray-700" htmlFor="cpf">CPF</Label>
                          <Input
                              id="cpf"
                              placeholder="000.000.000-00"
                              type="text"
                              {...register("cpf", { required: "CPF é obrigatório" })}
                              className={cn(
                              "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2",
                              errors.cpf
                                  ? "border-red-500 focus:ring-red-500"
                                  : "border-gray-300 focus:ring-blue-500"
                              )}
                              autoComplete="cpf"
                  
                          />
                          {errors.cpf && (
                              <p className="text-red-500 text-sm mt-1">{errors.cpf.message}</p>
                          )}
                    </div>
                    <div className="w-full">
                        <Label className="text-sm font-medium text-gray-700" htmlFor="rg">RG</Label>
                        <Input
                            id="rg"
                            placeholder="000000000"
                            type="text"
                            {...register("rg")}  
                            className={cn(
                            "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2",
                            errors.rg
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                            )}
                            autoComplete="rg"
                
                        />
                    </div>
                  </section>
                </div>
            </div>
          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button type="button" variant="destructive" className="h-11">
                Fechar
              </Button>
            </DialogClose>
            <Button type="submit" className="ml-2 h-11" variant="primary">
              <IconDeviceFloppy />
              Cadastrar Associado
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
