"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../ui/input";
import { ICategoryInput } from "@/interface/auth/category.interface";
// import categoryInputSchema from "@/schemas/category.schema";
import categoryInputSchema from "@/schema/category.schema";
import { createCategory } from "@/api/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const CategoryForm = () => {
  const methods = useForm<ICategoryInput>({
    resolver: yupResolver(categoryInputSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      toast.success(data?.message ?? "category created");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      methods.reset();
    },
    onError: (error) => {
      toast.error(error?.message ?? "operation failed");
    },
  });

  const onSubmit = (data: ICategoryInput) => {
    console.log(data);
    mutate(data);
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-lg mx-auto p-4"
      >
        <div className="flex flex-col gap-4">
          <Input
            name={"name"}
            label={"Category Name"}
            placeholder={"Electronics"}
          />
          <Input
            name="description"
            label="Description"
            placeholder="Enter description (optional)"
            multiline={true}
          />

          <button
            disabled={isPending}
            type="submit"
            className="disabled:cursor-not-allowed  mt-4 w-full bg-orange-500 text-white py-3 px-4 rounded-md tracking-wider font-bold cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CategoryForm;
