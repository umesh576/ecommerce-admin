"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/login.schema";
import { LuAsterisk } from "react-icons/lu";
import toast from "react-hot-toast";
import { ILogin } from "@/interface/auth/auth.interface";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { useAuth } from "@/context/auth.context";

const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
    mode: "all",
  });

  // Mutations
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      console.log("response", response);
      Cookies.set("access_token", response.token, { expires: 1 });
      localStorage.setItem("user", JSON.stringify(response.admin));
      setUser(response.admin);
      toast.success(response?.message ?? "Login successful");
      router.replace("/");
    },

    onError: (error) => {
      console.log(error);
      toast.error(error?.message ?? "Login failed");
    },
  });

  console.log(errors);

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    console.log(data);
    await mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={" flex flex-col gap-4 md:gap-8 w-full"}>
        <div className="flex flex-col gap-1">
          <div className="flex ">
            <label
              className="text-base tracking-wide font-semibold text-gray-800"
              htmlFor="email"
            >
              Email{" "}
            </label>
            <LuAsterisk className="text-xs text-red-500" />
          </div>
          <input
            {...register("email")}
            type="text"
            name="email"
            placeholder="johndoe@gmail.com"
            className={`text-lg border ${
              errors.email ? "border-red-500 text-red-500 " : "border-gray-300"
            } p-2 rounded-md placeholder:text-gray-500`}
          />
          {errors?.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <label
              className="text-base tracking-wide font-semibold text-gray-800"
              htmlFor="password"
            >
              Password
            </label>
            <LuAsterisk className="text-xs text-red-500" />
          </div>

          <input
            {...register("password")}
            type="password"
            name="password"
            placeholder="password"
            className={`text-lg border ${
              errors.email ? "border-red-500 text-red-500 " : "border-gray-300"
            } p-2 rounded-md placeholder:text-gray-500`}
          />
          {errors?.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button
          disabled={isPending}
          className="hidden md:block text-lg font-semibold px-4 py-3 bg-orange-500 rounded-md text-white cursor-pointer disabled:cursor-not-allowed hover:bg-orange-700 transition-all duration-300"
          type="submit"
        >
          {isPending ? "Logging" : "Login"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
