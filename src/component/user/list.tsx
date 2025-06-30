"use client";

import Table from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import toast from "react-hot-toast";

import { getAllUsers } from "@/api/users";
import { Actions } from "../ui/table.actions";
import { User } from "@/interface/auth/user.interface";
import Loader from "../ui/loader";

export const UserList = () => {
  const columnHelper = createColumnHelper<User>();
  // const queryClient = useQueryClient();

  // Fetch users
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers({ page: 1, limit: 20 }),
  });

  // Mutation for deleting a user (you can add it later)
  // const { mutate } = useMutation({...});

  const handleDelete = async (id: string) => {
    void id;
    toast.error("Delete function not implemented");
    // Add your delete logic here when ready
  };

  const columns = [
    columnHelper.accessor("firstName", {
      cell: (info) => info.getValue(),
      header: () => <span>First Name</span>,
    }),
    columnHelper.accessor("lastName", {
      cell: (info) => info.getValue(),
      header: () => <span>Last Name</span>,
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: () => <span>Email</span>,
    }),
    columnHelper.accessor("role", {
      cell: (info) => <span className="capitalize">{info.getValue()}</span>,
      header: () => <span>Role</span>,
    }),
    columnHelper.accessor("phoneNumber", {
      cell: (info) => <span>{info.getValue() || "-"}</span>,
      header: () => <span>Phone Number</span>,
    }),
    columnHelper.accessor("createdAt", {
      header: () => <span>Created At</span>,
      cell: (info) => (
        <i>
          {new Date(info.getValue()).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
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
            handleDelete={() => handleDelete(info.row.original._id)}
            updateLink={`/user/update/${info.row.original._id}`}
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
