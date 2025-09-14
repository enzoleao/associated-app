"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { ReactNode, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { InputMask } from "@react-input/mask";
import { InputFile } from "./InputFile";
import { cn } from "@/lib/utils";
import { DatePickerField } from "./DatePickerField";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { paymentMethods, states } from "@/utils/mocks";

interface CreateAssociateDialogFormProps {
  children: ReactNode;
}

interface FormValues {
  email: string;
  name: string;
  cpf: string;
  phone: string;
  rg?: string;
  dob?: Date;
  profession_name: string;
  raw_address: string;
  city: string;
  state: string;
  cep: string;
}

const defaultFormValues: FormValues = {
  email: '',
  name: '',
  cpf: '',
  phone: '',
  rg: '',
  dob: undefined,
  profession_name: '',
  raw_address: '',
  city: '',
  state: '',
  cep: ''
};

export function CreateAssociateDialogForm({ children }: CreateAssociateDialogFormProps) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: defaultFormValues,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data:", data);
    reset(defaultFormValues);
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      reset(defaultFormValues);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
              {/* Nome */}
              <div className="w-full">
                <Label htmlFor="name">Nome Completo</Label>
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
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email + Telefone */}
              <section className="flex gap-2">
                <div className="w-full">
                  <Label htmlFor="email">Email</Label>
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
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="phone">Telefone</Label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: "Telefone é obrigatório" }}
                    render={({ field, fieldState }) => (
                      <>
                        <InputMask
                          {...field}
                          mask="(__) _____-____"
                          replacement={{ '_': /\d/ }}
                          id="phone"
                          placeholder="(99) 99999-9999"
                          className={cn(
                            "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 h-[46px]",
                            fieldState.error
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-blue-500"
                          )}
                        />
                        {fieldState.error && (
                          <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                        )}
                      </>
                    )}
                  />
                </div>
              </section>

              <section className="flex gap-2">
                <div className="w-full">
                  <Label htmlFor="cpf">CPF</Label>
                  <Controller
                    name="cpf"
                    control={control}
                    rules={{ required: "CPF é obrigatório" }}
                    render={({ field, fieldState }) => (
                      <>
                        <InputMask
                          {...field}
                          mask="___.___.___-__"
                          replacement={{ '_': /\d/ }}
                          id="cpf"
                          placeholder="000.000.000-00"
                          className={cn(
                            "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2",
                            fieldState.error
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-blue-500"
                          )}
                        />
                        {fieldState.error && (
                          <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                        )}
                      </>
                    )}
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="rg">RG</Label>
                  <Input
                    id="rg"
                    placeholder="0000000"
                    type="text"
                    {...register("rg")}
                    className={cn(
                      "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 max-h-[42px]",
                      errors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    )}
                  />
                  {errors.rg && (
                    <p className="text-red-500 text-sm mt-1">{errors.rg.message}</p>
                  )}
              </div>
              </section>
              <section className="flex gap-2">
                <div className="w-full flex flex-col gap-1">
                  <Label htmlFor="dob">Data de Nascimento</Label>
                  <DatePickerField
                    name="dob"
                    control={control}
                    error={errors.dob?.message}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="profession_name">Profissão</Label>
                  <Input
                    id="profession_name"
                    placeholder="Digite a profissão"
                    type="text"
                    {...register("profession_name")}
                    className={cn(
                      "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2",
                      errors.profession_name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    )}
                  />
                </div>
              </section>
            </div>
          </div>
          <div className="flex flex-col gap-4 border p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900">Endereço</h2>
            <div className="flex flex-col gap-3 ">
              <section className="flex gap-4 flex-col sm:flex-row">
                <div className="w-full">
                  <Label htmlFor="raw_address">Endereço</Label>
                  <Input
                    id="raw_address"
                    placeholder="Rua, avenida, etc ..."
                    type="text"
                    {...register("raw_address")}
                    className={cn(
                      "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2",
                      errors.raw_address
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    )}
                  />
                  {errors.raw_address && (
                    <p className="text-red-500 text-sm mt-1">{errors.raw_address.message}</p>
                  )}
                </div>
                <div className="w-full max-w-[145px]">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    placeholder="Cidade"
                    type="text"
                    {...register("city")}
                    className={cn(
                      "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2",
                      errors.city
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    )}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>
                <div className="w-full max-w-[170px] flex gap-1 flex-col">
                  <Label htmlFor="city">Estado</Label>
                  <Select {...register("city")} defaultValue="">
                    <SelectTrigger
                      size="large"
                      className={cn(
                        "w-full border rounded h-[46px] flex",
                        errors.city
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      )}
                    >
                      <SelectValue  placeholder="Escolha um Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((i)=> {
                        return <SelectItem value={i.id.toString()} key={i.id}>{i.name}</SelectItem>
                      })}
                    </SelectContent>
                  </Select>

                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>
              </section>
              <section className="flex gap-4 flex-col sm:flex-row">
                <div className="w-full max-w-[160px]">
                  <Label htmlFor="cep">CEP</Label>
                  <Controller
                    name="cep"
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <InputMask
                          {...field}
                          mask="_____-___"
                          replacement={{ '_': /\d/ }}
                          id="cep"
                          placeholder="00000-000"
                          className={cn(
                            "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2",
                            fieldState.error
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-blue-500"
                          )}
                        />
                        {fieldState.error && (
                          <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                        )}
                      </>
                    )}
                  />
                </div>
              </section>
            </div>
          </div>
          <div className="flex flex-col gap-4 border p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900">Financeiro</h2>
            <div className="flex flex-col gap-3 ">
              <section className="flex gap-4 flex-col sm:flex-row">
                <div className="w-full max-w-[220px] flex gap-1 flex-col">
                  <Label htmlFor="city">Tipo de Pagamento</Label>
                  <Select {...register("city")} defaultValue="">
                    <SelectTrigger
                      size="large"
                      className={cn(
                        "w-full border rounded h-[46px] flex",
                        errors.city
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      )}
                    >
                      <SelectValue  placeholder="Escolha um Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((i)=> {
                        return <SelectItem value={i.id.toString()} key={i.id}>{i.name}</SelectItem>
                      })}
                    </SelectContent>
                  </Select>

                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
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
