/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../ui/input";
import { IProductInput } from "@/interface/auth/product.interface";
import productInputSchema from "@/schemas/product.schema";
import { createProduct } from "@/api/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import FileUpload from "../ui/file-upload";
import CategorySelect from "../ui/category-select";
const ProductForm = () => {
  const methods = useForm({
    resolver: yupResolver(productInputSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
      images: [],
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      toast.success(data?.message ?? "Product created");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      methods.reset();
    },
    onError: (error) => {
      toast.error(error?.message ?? "Operation failed");
    },
  });

  const onSubmit: SubmitHandler<IProductInput> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("category", data.category);
    formData.append("price", data.price.toString());

    // Handle file inputs
    if (data.coverImage instanceof File) {
      formData.append("coverImage", data.coverImage);
    }

    if (Array.isArray(data.images)) {
      data.images.forEach((image, i) => {
        if (image instanceof File) {
          formData.append(`images`, image);
        }
      });
    }
    mutate(formData);
  };

  return (
    <FormProvider {...methods}>
      <form
        //  @ts-expect-error //type
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-lg mx-auto p-4"
      >
        <div className="flex flex-col gap-4">
          <Input name="name" label="Product Name" placeholder="iPhone 15" />
          <Input
            name="description"
            label="Description"
            placeholder="Enter product description"
            multiline={true}
          />
          {/* <Input name="category" label="Category" placeholder="Electronics" /> */}
          <Input
            name="price"
            label="Price"
            type="number"
            placeholder="999.99"
          />
          <CategorySelect />

          <FileUpload name="coverImage" label="Cover Image" multiple={false} />
          <FileUpload
            name="images"
            label="Gallery Images"
            multiple={true}
            maxFiles={5}
          />

          <button
            disabled={isPending}
            type="submit"
            className="disabled:cursor-not-allowed mt-4 w-full bg-blue-500 text-white py-3 px-4 rounded-md tracking-wider font-bold cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProductForm;
