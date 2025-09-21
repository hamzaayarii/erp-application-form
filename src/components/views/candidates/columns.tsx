import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { RiFilePaper2Line } from "react-icons/ri";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Candidate = {
    id: string;

    fullName: string;
    topic: string;
    deposit: string;
    status:
        | "Accepted"
        | "Pending"
        | "Affected"
        | "Rejected"
        | "Banned"
        | "Finished";
    lastAction: string;
    applicationForm: string;
};

export const columns: ColumnDef<Candidate>[] = [
    {
        accessorKey: "fullName",
        header: "Full Name",
    },
    {
        accessorKey: "topic",
        header: "Topic ID",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status: string = row.getValue("status");

            return (
                <div className="w-full flex justify-center items-center">
                    <div
                        className={cn(
                            "px-2 py-1 rounded-lg w-full text-center text-white text-xs font-bold",
                            status === "Accepted" && "bg-blue-500",
                            status === "Pending" && "bg-gray-400",
                            status === "Affected" && "bg-yellow-500",
                            status === "Rejected" && "bg-red-500",
                            status === "Banned" && "bg-black ",
                            status === "Finished" && "bg-green-500"
                        )}
                    >
                        {status}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "deposit",
        header: "Deposit",
    },
    {
        accessorKey: "lastAction",
        header: "Last Action",
    },
    {
        accessorKey: "applicationForm",
        header: "Application Form",
        cell: ({ row }) => {
            return (
                <TableCell className="w-full flex justify-center" key={row.id}>
                    <a
                        href={row.getValue("applicationForm") as string}
                        rel="noreferrer"
                        className="text-blue-500 underline"
                    >
                        <RiFilePaper2Line />
                    </a>
                </TableCell>
            );
        },
    },
];
