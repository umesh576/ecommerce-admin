"use client";

import Table from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { Actions } from "../ui/table.actions";
import toast from "react-hot-toast";
import { deleteProductById, getAllProducts } from "@/api/product";
import Loader from "../ui/loader";

type Product = {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export const ProductList = () => {
  const columnHelper = createColumnHelper<Product>();
  const queryClient = useQueryClient();

  // Fetch products
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  // Mutation for deleting a Product
  const { mutate } = useMutation({
    mutationFn: deleteProductById,
    onSuccess(data) {
      if (data.success) {
        toast.success(data?.message);

        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    },
    onError(error) {
      toast.error(
        error?.message || "An error occurred while deleting the category"
      );
    },
  });

  // Function to handle deletion
  const handleDelete = async (id: string) => {
    console.log("Deleting product with id:", id);
    try {
      await mutate(id);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span>Product Name</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.description, {
      id: "description",
      cell: (info) => <i>{info.getValue() ?? "-"}</i>,
      header: () => <span>Description</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("createdAt", {
      header: () => <span>Created At</span>,
      footer: (info) => info.column.id,
      cell: (info) => (
        <i>
          {new Date(info.getValue()).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </i>
      ),
    }),
    columnHelper.accessor("updatedAt", {
      header: "Updated At",
      footer: (info) => info.column.id,
      cell: (info) => (
        <i>
          {new Date(info.getValue()).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </i>
      ),
    }),
    columnHelper.accessor("_id", {
      header: "Actions",
      cell: (info) => {
        return (
          <Actions
            handleDelete={() => {
              handleDelete(info.row.original._id);
            }}
            updateLink={`/product/update/${info.row.original._id}`}
          />
        );
      },
    }),
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Table columns={columns} data={data?.data?.data ?? []} />
    </div>
  );
};
