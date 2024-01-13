"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { Card, CardHeader, CardTitle, CardContent } from "../components/ui";
import { Input, Button, Label } from "../components/ui/forms";
import { useQueryClient } from "../hooks/use-query-client";
import { useYupValidationResolver } from "../hooks/use-yup-validation-resolver";
import { apiClient } from "../utils/axios";

import { useToast } from "@/components/ui/toast";
import { useQID } from "@/hooks/use-qid";

interface ILoginFormInput {
  username: string;
  password: string;
}

const validationSchema = yup.object({
  username: yup.string().required("username is required"),
  password: yup
    .string()
    .min(6, "Password must be of atleast 6 characters.")
    .required("Password is required"),
});

export function LoginForm() {
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<ILoginFormInput>({ resolver });

  const queryClient = useQueryClient();
  const { setQID } = useQID();

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<ILoginFormInput> = async (input) => {
    try {
      const data = await queryClient.fetchQuery(["user"], async () => {
        const res = await apiClient.post("/auth/login", input);
        return res.data;
      });

      setQID(data.access_token);
      router.push("/");

      router.refresh();
    } catch (err: any) {
      const e = err?.response?.data?.error;

      if (e === "Forbidden") {
        toast({
          variant: "destructive",
          title: "Invalid Details",
          description:
            "Incorrect username or password. Please try again with correct details.",
        });
        resetField("password");
      }
    }
  };

  return (
    <Card className={`w-[350px]`}>
      <CardHeader>
        <CardTitle className={`text-2xl mb-3 text-center`}>
          Login into your account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className={`flex flex-col gap-5 mb-10`}>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="johndoe"
                {...register("username")}
              />
              {errors.username ? (
                <p role="alert" className={`text-xs text-red-500`}>
                  {errors.username.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="really-secure-password"
                {...register("password")}
              />
              {errors.password ? (
                <p role="alert" className={`text-xs text-red-500`}>
                  {errors.password.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className={`flex justify-center`}>
            <Button>Login</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
