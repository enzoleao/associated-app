"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, LogIn } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { resetPassword } from "../actions";
import { toast } from "sonner";
import { useState } from "react";

type ResetFormInput = {
  password: string;
  confirmPassword: string;
};

export function ResetPasswordForm() {
  const [success, setSuccess] = useState(false)
  const { id } = useParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetFormInput>();

  const onSubmit: SubmitHandler<ResetFormInput> = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        toast.error("As senhas não coincidem."); 
        return;
      }

      await resetPassword({ password: data.password, token: id as string });

      toast.success("Senha alterada com sucesso! Redirecionando..."); 
      setSuccess(true)
      setTimeout(() => {
        router.push("/auth/login");
      }, 4000);
    } catch (err) {
      toast.error("Ocorreu um erro, tente novamente."); 
    }
  };
  if (success) {
    return (
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col items-center justify-center mt-2 gap-4 p-4 border rounded bg-green-50">
          <CheckCircle className="w-12 h-12 text-green-600" />
          <h2 className="text-xl font-bold text-green-700">Senha atualizada com sucesso!</h2>
          <p className="text-green-700 text-center">
            Aguarde, você será redirecionado para tela de login.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 flex flex-col gap-1"
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Redefinir sua senha
        </h2>
        <p className="text-gray-600">Preencha os campos abaixo.</p>
      </div>

      <div>
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          placeholder="Digite sua nova senha"
          type="password"
          {...register("password", { required: "A senha é obrigatória" })}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirme a senha</Label>
        <Input
          id="confirmPassword"
          placeholder="Confirme sua nova senha"
          type="password"
          {...register("confirmPassword", {
            required: "A confirmação da senha é obrigatória",
            validate: (value) =>
              value === watch("password") || "As senhas não coincidem",
          })}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full text-white py-2 rounded text-sm h-11 flex items-center justify-center gap-2"
      >
        <LogIn />
        ALTERAR SENHA
      </Button>
    </form>
  );
}
