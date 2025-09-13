"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { login as serverLogin } from "../../login/actions";
import { useUser } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";

type LoginFormInputs = {
  email: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const { login: setUser } = useUser();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await serverLogin(data);

      if (res?.error) {
        if (res.messages) {
          Object.entries(res.messages).forEach(([field, messages]) => {
            if (field in data) {
              setError(field as keyof LoginFormInputs, {
                type: "server",
                message: messages[0],
              });
            }
          });
        }
        return;
      }

      setUser(res.user);
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Ocorreu um erro, tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Entrar na sua conta
        </h2>
        <p className="text-gray-600">Acesse o painel administrativo</p>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="seu@email.com"
          type="email"
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

      <div>
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          placeholder="Digite sua senha"
          type="password"
          {...register("password", { required: "Senha é obrigatória" })}
          className={cn(
            "mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2",
            errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          )}
          autoComplete="current-password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex justify-between pt-2 pb-2">
        <div className="flex items-center gap-2">
          <Checkbox id="terms" />
          <Label
            htmlFor="terms"
            className="text-sm text-gray-900 cursor-pointer font-light"
          >
            Lembrar de mim
          </Label>
        </div>
        <Link
          href="/auth/forget-password"
          className="font-medium text-sm text-blue-600 hover:text-blue-500 cursor-pointer"
        >
          Esqueceu a senha?
        </Link>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full  text-white py-2 rounded text-sm h-11 flex items-center justify-center gap-2"
        disabled={isSubmitting}
      >
        <LogIn />
        Entrar
      </Button>
    </form>
  );
}
