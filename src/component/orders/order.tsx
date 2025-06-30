"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/api/order";
import { createColumnHelper } from "@tanstack/react-table";
// import Table from "@/components/ui/table";
import Table from "../ui/table";
// import Loader from "@/components/ui/loader";
import Loader from "../ui/loader";
// import { Order } from "@/interface/auth/order.interface";
import { Order } from "@/interface/auth/order.interface";
import toast from "react-hot-toast";

const OrderList = () => {
  const columnHelper = createColumnHelper<Order>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  console.log(data?.data?.data);

  if (isLoading) return <Loader />;
  if (isError) return toast.error("Failed to load orders");

  const columns = [
    columnHelper.accessor(
      (row) => `${row.user.firstName} ${row.user.lastName}`,
      {
        id: "user",
        header: "Customer",
        cell: (info) => <span>{info.getValue()}</span>,
      }
    ),
    columnHelper.accessor("user.email", {
      header: "Email",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("totalAmount", {
      header: "Total",
      cell: (info) => <span>${info.getValue()}</span>,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("createdAt", {
      header: "Order Date",
      cell: (info) => (
        <span>{new Date(info.getValue()).toLocaleDateString()}</span>
      ),
    }),
    columnHelper.accessor("items", {
      header: "Items",
      cell: (info) => (
        <ul className="text-xs">
          {info.getValue().map((p, idx) => (
            <li key={idx}>
              {p.product?.name ?? "-"} × {p.quantity}
            </li>
          ))}
        </ul>
      ),
    }),
  ];

  return (
    <div>
      <Table columns={columns} data={data?.data?.data ?? []} />
    </div>
  );
};

export default OrderList;
