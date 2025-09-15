"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputFile } from "./InputFile";
import { ControlledInput } from "./ControlledInput";
import { ControlledMaskedInput } from "./ControlledInputMask";
import { ControlledSelect } from "./ControlledSelect";
import { DatePickerField } from "./DatePickerField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { days, paymentMethods, states } from "@/utils/mocks";
import { getAddressByCEP, getPresignUrlProfileUpload, uploadProfileImage } from "../actions";
import { Label } from "@/components/ui/label";
import { ControlledColorPicker } from "./ColorPicker";

interface CreateAssociateDialogFormProps {
  children: ReactNode;
}

interface CreateAssociateFormValues {
  email: string;
  name: string;
  cpf: string;
  phone: string;
  rg?: string;
  birthday?: Date;
  profession_name: string;
  street: string;
  city: string;
  state: string;
  cep: string;
  payment_method: string;
  number: string;
  neighborhood: string;
  association_date?: Date;
  payment_expiraton_day: string;
  profile_image?: string; 
  color: string
}

const defaultFormValues: CreateAssociateFormValues = {
  email: "", name: "", cpf: "", phone: "", rg: "", birthday: undefined,
  profession_name: "", street: "", city: "", state: "", cep: "",
  payment_method: "", number: "", neighborhood: "", association_date: undefined,
  payment_expiraton_day: "",
  color: "#000000",
};

export function CreateAssociateDialogForm({ children }: CreateAssociateDialogFormProps) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreateAssociateFormValues>({
    defaultValues: defaultFormValues,
  });

  const cepValue = watch("cep");

  useEffect(() => {
    const numericCEP = cepValue.replace(/\D/g, "");
    if (numericCEP.length === 8) {
      (async () => {
        const res = await getAddressByCEP({cep: cepValue});
        setValue("street", res.data?.logradouro || "");
        setValue("neighborhood", res.data?.bairro || "");
        setValue("city", res.data?.localidade || "");
        const stateOption = states.find(s => s.initials === res.data?.uf);
        if (stateOption) setValue("state", stateOption.id.toString());
      })();
    }
  }, [cepValue, setValue]);

  const onSubmit: SubmitHandler<CreateAssociateFormValues> = async (data) => {
    try {
      let imageKey: string | undefined;

      if (selectedFile) {
        const presignRes = await getPresignUrlProfileUpload({content_type: selectedFile.type})
        if (presignRes.data)
          await uploadProfileImage({file: selectedFile, presign_url: presignRes.data.upload_url })

      }

      const payload = { ...data, profile_image: imageKey };
      console.log("Payload final:", payload);


      reset(defaultFormValues);
      setSelectedFile(null);
      setOpen(false);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    }
  };

  
  const stateOptions = states.map(s => ({ value: s.id.toString(), label: s.name }));
  const paymentMethodOptions = paymentMethods.map(p => ({ value: p.id.toString(), label: p.name }));
  const daysOptions = days.map(d => ({ value: d.day.toString(), label: d.day }));

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) reset(defaultFormValues); }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Cadastrar Associado</DialogTitle>
            <DialogDescription>Preencha os dados completos do novo associado</DialogDescription>
          </DialogHeader>

          <div className="w-full flex items-center justify-center">
            <InputFile onFileSelect={setSelectedFile} />
          </div>

          <div className="space-y-3 rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-900">Dados Pessoais</h2>
            <ControlledInput control={control} name="name" label="Nome completo" placeholder="Digite o nome completo" rules={{ required: "Nome é obrigatório" }} />
            <div className="flex flex-col gap-3 sm:flex-row">
              <ControlledInput control={control} name="email" label="Email" placeholder="seu@email.com" type="email" rules={{ required: "Email é obrigatório" }} />
              <ControlledMaskedInput control={control} name="phone" label="Telefone" mask="(__) _____-____" placeholder="(99) 99999-9999" rules={{ required: "Telefone é obrigatório" }} />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ControlledMaskedInput control={control} name="cpf" label="CPF" mask="___.___.___-__" placeholder="000.000.000-00" rules={{ required: "CPF é obrigatório" }} />
              <ControlledInput control={control} name="rg" label="RG (Opcional)" placeholder="0000000" />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="w-full flex flex-col gap-1.5">
                <Label>Data de Nascimento</Label>
                <DatePickerField name="birthday" control={control} error={errors.birthday?.message} />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row w-full">
                <ControlledInput control={control} name="profession_name" label="Profissão (Opcional)" placeholder="Digite a profissão" />
              </div>
            </div>
            <div className="space-y-3 max-w-24">
              <ControlledColorPicker
                control={control}
                name="color"
                label="Cor do Usuário"
              />
            </div>
          </div>
          <div className="space-y-3 rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-900">Endereço</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ControlledMaskedInput control={control} name="cep" label="CEP" mask="_____-___" placeholder="00000-000" />
              <ControlledInput control={control} name="street" label="Rua/Avenida" placeholder="Rua, avenida, etc ..." />
              <ControlledInput control={control} name="number" label="Número" placeholder="Nº" />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ControlledInput control={control} name="neighborhood" label="Bairro" placeholder="Bairro" />
              <ControlledInput control={control} name="city" label="Cidade" placeholder="Cidade" />
              <ControlledSelect control={control} name="state" label="Estado" placeholder="Escolha um Estado" options={stateOptions} rules={{ required: "Estado é obrigatório" }} />
            </div>
          </div>

          <div className="space-y-3 rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-900">Associação</h2>
            <div className="w-full flex flex-col gap-1.5 max-w-48">
              <Label>Data de Associação</Label>
              <DatePickerField name="association_date" control={control} error={errors.association_date?.message} />
            </div>
          </div>

          <div className="space-y-3 rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-900">Financeiro</h2>
            <div className="flex gap-4">
              <ControlledSelect control={control} name="payment_method" label="Tipo de Pagamento" placeholder="Escolha o método" options={paymentMethodOptions} rules={{ required: "Tipo de pagamento é obrigatório" }} />
              <ControlledSelect control={control} name="payment_expiraton_day" label="Dia de vencimento" placeholder="Escolha um dia" options={daysOptions} rules={{ required: "Dia de vencimento é obrigatório" }} />
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
