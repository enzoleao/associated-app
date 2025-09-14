"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { ReactNode, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputFile } from "./InputFile";
import { DatePickerField } from "./DatePickerField";
import { paymentMethods, states } from "@/utils/mocks";
import { ControlledInput } from "./ControlledInput";
import { ControlledMaskedInput } from "./ControlledInputMask";
import { ControlledSelect } from "./ControlledSelect";

interface CreateAssociateDialogFormProps {
  children: ReactNode;
}

interface FormValues {
  email: string; name: string; cpf: string; phone: string; rg?: string;
  dob?: Date; profession_name: string; raw_address: string; city: string;
  state: string; cep: string; payment_method: string;
}

const defaultFormValues: FormValues = {
  email: '', name: '', cpf: '', phone: '', rg: '', dob: undefined,
  profession_name: '', raw_address: '', city: '', state: '',
  payment_method: '', cep: ''
};

export function CreateAssociateDialogForm({ children }: CreateAssociateDialogFormProps) {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
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

  const stateOptions = states.map(s => ({ value: s.id.toString(), label: s.name }));
  const paymentMethodOptions = paymentMethods.map(p => ({ value: p.id.toString(), label: p.name }));

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl" onInteractOutside={(event) => event.preventDefault()}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader className="gap-1.5">
            <DialogTitle>Cadastrar Associado</DialogTitle>
            <DialogDescription>Preencha os dados completos do novo associado</DialogDescription>
          </DialogHeader>

          <div className="w-full flex items-center justify-center">
            <InputFile />
          </div>

          <div className="space-y-3 rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-900">Dados Pessoais</h2>
            <ControlledInput control={control} name="name" label="Nome completo" placeholder="Digite o nome completo" rules={{ required: "Nome é obrigatório" }} />
            <section className="flex flex-col gap-3 sm:flex-row">
              <ControlledInput control={control} name="email" label="Email" placeholder="seu@email.com" type="email" rules={{ required: "Email é obrigatório" }} />
              <ControlledMaskedInput control={control} name="phone" label="Telefone" mask="(__) _____-____" placeholder="(99) 99999-9999" rules={{ required: "Telefone é obrigatório" }} />
            </section>
            <section className="flex flex-col gap-3 sm:flex-row">
              <ControlledMaskedInput control={control} name="cpf" label="CPF" mask="___.___.___-__" placeholder="000.000.000-00" rules={{ required: "CPF é obrigatório" }} />
              <ControlledInput control={control} name="rg" label="RG (Opcional)" placeholder="0000000" type="text" />
            </section>
            <section className="flex flex-col gap-3 sm:flex-row">
              <div className="w-full flex flex-col gap-1.5">
                <Label>Data de Nascimento</Label>
                <DatePickerField name="dob" control={control} error={errors.dob?.message} />
              </div>
              <ControlledInput control={control} name="profession_name" label="Profissão (Opcional)" placeholder="Digite a profissão" type="text" />
            </section>
          </div>

          <div className="space-y-3 rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-900">Endereço</h2>
            <section className="flex flex-col gap-3 sm:flex-row">
              <ControlledInput control={control} name="raw_address" label="Endereço" placeholder="Rua, avenida, etc ..." />
              <div className="w-full sm:max-w-[145px]">
                <ControlledInput control={control} name="city" label="Cidade" placeholder="Cidade" />
              </div>
              <div className="w-full sm:max-w-[170px]">
                <ControlledSelect control={control} name="state" label="Estado" placeholder="Escolha um Estado" options={stateOptions} rules={{ required: "Estado é obrigatório" }} />
              </div>
            </section>
            <div className="w-full max-w-[160px]">
              <ControlledMaskedInput control={control} name="cep" label="CEP" mask="_____-___" placeholder="00000-000" />
            </div>
          </div>

          <div className="space-y-3 rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-900">Financeiro</h2>
            <div className="w-full max-w-[220px]">
              <ControlledSelect control={control} name="payment_method" label="Tipo de Pagamento" placeholder="Escolha o método" options={paymentMethodOptions} rules={{ required: "Tipo de pagamento é obrigatório" }} />
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button type="button" variant="destructive" className="h-11">Fechar</Button>
            </DialogClose>
            <Button type="submit" className="h-11" variant="primary">
              <IconDeviceFloppy className="mr-2 h-4 w-4" />
              Cadastrar Associado
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}