"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, CheckCircle, Undo2 } from "lucide-react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { forgetPassword } from "../../forget-password/actions";

type LoginFormInputs = {
  email: string;
};

export function ForgetPasswordForm() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await forgetPassword(data);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Ocorreu um erro, tente novamente.");
    }
  };

  if (success) {
    return (
      <div className="flex flex-col justify-center items-center gap-6">
        <h2 className="text-2xl font-bold text-gray-900">Recuperar senha</h2>
        <div className="flex flex-col items-center justify-center mt-2 gap-4 p-4 border rounded bg-green-50">
          <CheckCircle className="w-12 h-12 text-green-600" />
          <h2 className="text-xl font-bold text-green-700">Solicitação enviada!</h2>
          <p className="text-green-700 text-center">
            Verifique seu email para instruções de recuperação de senha.
          </p>
          <Link href="/auth/login">
          </Link>
        </div>
        <Link 
          href="/auth/login" 
          className="w-full bg-blue-600 text-white py-2 rounded text-sm h-11 flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            <Undo2 />
            VOLTAR
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Recuperar senha</h2>
        <p className="text-gray-600">Digite seu email para receber as instruções</p>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="seu@email.com"
          type="email"
          {...register("email", { required: "Email é obrigatório" })}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded text-sm h-11 flex items-center justify-center gap-2 hover:bg-blue-700"
      >
        <LogIn />
        SOLICITAR
      </Button>

      <Link href="/auth/login">
        <Button className="w-full text-black bg-white rounded text-sm h-11 border hover:text-black hover:bg-gray-100 mt-2">
          <Undo2 />
          Voltar
        </Button>
      </Link>
    </form>
  );
}
