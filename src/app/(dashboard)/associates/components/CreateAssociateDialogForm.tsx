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
import { days } from "@/utils/mocks";
import { createAssociated, getAddressByCEP, getPresignUrlProfileUpload, uploadProfileImage } from "../actions";
import { Label } from "@/components/ui/label";
import { ControlledColorPicker } from "./ColorPicker";
import { toast } from "sonner";
import { useLoading } from "@/contexts/LoadingContext";
import { useQueryClient } from "@tanstack/react-query";
import { usePaymentMethods } from "@/hooks/usePaymentMethods";
import { useAssociatePlans } from "@/hooks/useAssociatePlans";
import { useAssociateStatus } from "@/hooks/useAssociateStatus";
import { useStates } from "@/hooks/useStates";

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
  state_id: string;
  zip_code: string;
  payment_method_preference_id: string;
  number: string;
  neighborhood: string;
  membership_date?: Date;
  payment_due_date: string;
  image_path?: string; 
  color: string;
  associate_plan_id: string;
  associate_status_id: string;
}

const defaultFormValues: CreateAssociateFormValues = {
  email: "", name: "", cpf: "", phone: "", rg: "", birthday: undefined,
  profession_name: "", street: "", city: "", state_id: "", zip_code: "",
  payment_method_preference_id: "", number: "", neighborhood: "", membership_date: undefined,
  payment_due_date: "",
  color: "#000000",
  associate_plan_id: '',
  associate_status_id: ''
};

export function CreateAssociateDialogForm({ children }: CreateAssociateDialogFormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { showLoading, hideLoading } = useLoading();

  const { data: paymentMethods } = usePaymentMethods({ enabled: open });
  const { data: associatePlans } = useAssociatePlans({ enabled: open });
  const { data: countryStates } = useStates({ enabled: open });
  const { data: associateStatus } = useAssociateStatus({ enabled: open });

  

  const { control, handleSubmit, reset, setValue, watch, setError, formState: { errors } } = useForm<CreateAssociateFormValues>({
    defaultValues: defaultFormValues,
  });

  const cepValue = watch("zip_code");

  useEffect(() => {
    const numericCEP = cepValue.replace(/\D/g, "");
    if (numericCEP.length === 8) {
      (async () => {
        const res = await getAddressByCEP({cep: cepValue});
        setValue("street", res.data?.logradouro || "");
        setValue("neighborhood", res.data?.bairro || "");
        setValue("city", res.data?.localidade || "");
        const stateOption = countryStates?.find((s: { initials: string | undefined; }) => s.initials === res.data?.uf);
        if (stateOption) setValue("state_id", stateOption.id.toString());
      })();
    }
  }, [cepValue, setValue]);

 const onSubmit: SubmitHandler<CreateAssociateFormValues> = async (data) => {
  try {
    showLoading("Cadastrando associado")
    let imageKey: string | undefined;
    if (selectedFile) {
      const presignRes = await getPresignUrlProfileUpload({
        content_type: selectedFile.type,
      });

      if (presignRes?.data) {
        imageKey = presignRes.data.key;

        await uploadProfileImage({
          file: selectedFile,
          presign_url: presignRes.data.upload_url,
        });
      }
    }

    const payload = {
      ...data,
      image_path: imageKey,
      birthday: data.birthday
        ? data.birthday.toISOString().split("T")[0]
        : undefined,
      membership_date: data.membership_date
        ? data.membership_date.toISOString().split("T")[0]
        : undefined,
      state_id: data.state_id,
      payment_method_preference_id: data.payment_method_preference_id,
      associate_status_id: Number(data.associate_status_id)
    };

    const response = await createAssociated(payload);
    hideLoading()
    if (response.success === false) {
      if (response.messages) {
        Object.entries(response.messages).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            setError(field as keyof CreateAssociateFormValues, {
              type: "server",
              message: messages[0],
            });
          }
        });
      }

      toast.error(response.error || "Erro ao cadastrar associado", {
        position: "top-center",
      });
      return;
    }
      toast.success("Associado cadastrado com sucesso.", {
          position: "top-center",
        });

    queryClient.invalidateQueries({ queryKey: ['associates'] });
    queryClient.invalidateQueries({ queryKey: ['associate-report'] });


    reset(defaultFormValues);
    setSelectedFile(null);
    setOpen(false);
  } catch (error) {
    console.error("Erro ao enviar formulário:", error);
  }
};


  
  const daysOptions = days.map(d => ({ id: d.day.toString(), name: d.day }));

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) reset(defaultFormValues); }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent 
        className="sm:max-w-4xl"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        >
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
              <div className="w-full">
                <ControlledInput control={control} name="email" label="Email" placeholder="seu@email.com" type="email" rules={{ required: "Email é obrigatório" }} />
              </div>
              <ControlledMaskedInput control={control} name="phone" label="Telefone" mask="(__) _____-____" placeholder="(99) 99999-9999" rules={{ required: "Telefone é obrigatório" }} />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ControlledMaskedInput control={control} name="cpf" label="CPF" mask="___.___.___-__" placeholder="000.000.000-00" rules={{ required: "CPF é obrigatório" }} />
              <div className="w-full">
                <ControlledInput control={control} name="rg" label="RG (Opcional)" placeholder="0000000" />
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="w-full flex flex-col gap-1.5">
                <Label>Data de Nascimento</Label>
                <DatePickerField name="birthday" control={control} error={errors.birthday?.message} rules={{ required: "Data de nascimento é obrigatório" }}  required/>
              </div>
              <div className="w-full rounded-none">
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
              <ControlledMaskedInput control={control} name="zip_code" label="CEP" mask="_____-___" placeholder="00000-000" rules={{ required: "CEP é obrigatório" }} />
              <ControlledInput control={control} name="street" label="Rua/Avenida" placeholder="Rua, avenida, etc ..." rules={{ required: "Rua/Avenida é obrigatório" }} />
              <ControlledInput control={control} name="number" label="Número" placeholder="Nº" />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ControlledInput control={control} name="neighborhood" label="Bairro" placeholder="Bairro" rules={{ required: "Bairro é obrigatório" }} />
              <ControlledInput control={control} name="city" label="Cidade" placeholder="Cidade" rules={{ required: "Cidade é obrigatório" }} />
              <ControlledSelect control={control} name="state_id" label="Estado" placeholder="Escolha um Estado" options={countryStates} rules={{ required: "Estado é obrigatório" }} />
            </div>
          </div>

          <div className="space-y-3 rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-900">Associação</h2>
            <section className="flex w-full gap-4">
              <div className="w-full flex flex-col gap-1.5 max-w-48">
                <Label>Data de Associação</Label>
                <DatePickerField name="membership_date" control={control} error={errors.membership_date?.message} />
              </div>
              <ControlledSelect control={control} name="associate_plan_id" label="Plano" placeholder="Escolha um Plano" options={associatePlans} rules={{ required: "Plano é obrigatório" }} />
              <ControlledSelect control={control} name="associate_status_id" label="Status" placeholder="Escolha um status" options={associateStatus} rules={{ required: "Status é obrigatório" }} />
            </section>
          </div>

          <div className="space-y-3 rounded-lg border p-6">
            <h2 className="text-lg font-medium text-gray-900">Financeiro</h2>
            <div className="flex gap-4">
              <ControlledSelect control={control} name="payment_method_preference_id" label="Tipo de Pagamento" placeholder="Escolha o método" options={paymentMethods} rules={{ required: "Tipo de pagamento é obrigatório" }} />
              <ControlledSelect control={control} name="payment_due_date" label="Dia de vencimento" placeholder="Escolha um dia" options={daysOptions} rules={{ required: "Dia de vencimento é obrigatório" }} />
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
