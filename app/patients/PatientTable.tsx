'use client';

import React, { useState, useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Phone, Calendar, MoreHorizontal, X, Edit, Archive, Activity, Clock, CheckCircle, XCircle, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface PatientTableProps {
  data: Patient[];
  isLoading: boolean;
  isError: boolean;
  error: any;
  getRandomColor: (name: string) => string;
}

// Patient type used throughout the table
interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  // optional combined name if the backend provides it
  patient_name?: string;
  email?: string;
  phone_number?: string;
  department?: string;
  status?: string;
  date_of_birth?: string;
  [key: string]: any;
}

// Memoized row component
const MemoizedTableRow = React.memo(({ row, selectedMenu, setSelectedMenu, handleEdit, handleDischarge }: { 
  row: any;
  selectedMenu: string | undefined;
  setSelectedMenu: (id: string | undefined) => void;
  handleEdit: (patientId: number) => void;
  handleDischarge: (patientId: number) => void;
}) => {
  return (
    <TableRow data-state={row.getIsSelected() && "selected"}>
      {row.getVisibleCells().map((cell: any) => (
        <TableCell
          key={cell.id}
          className={cell.column.id === "actions" ? "text-center" : "py-3"}
          style={{ width: cell.column.getSize() }}
        >
          {flexRender(cell.column.columnDef.cell, {
            ...cell.getContext(),
            selectedMenu,
            setSelectedMenu,
            handleEdit,
            handleDischarge,
          })}
        </TableCell>
      ))}
    </TableRow>
  );
});

MemoizedTableRow.displayName = "MemoizedTableRow";

// Memoized status badge component
const StatusBadge = React.memo(({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: <Activity className="h-3 w-3" /> };
      case "pending":
        return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: <Clock className="h-3 w-3" /> };
      case "discharged":
        return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: <CheckCircle className="h-3 w-3" /> };
      case "critical":
        return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: <XCircle className="h-3 w-3" /> };
      default:
        return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", icon: <Activity className="h-3 w-3" /> };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge
      variant="outline"
      className={`
        text-xs font-medium px-2 py-1 rounded-[4px] capitalize
        ${config.bg} ${config.text} ${config.border}
      `}
    >
      <div className="flex items-center gap-1">
        {config.icon}
        <span>{status?.charAt(0).toUpperCase() + status?.slice(1) || "Active"}</span>
      </div>
    </Badge>
  );
});

StatusBadge.displayName = "StatusBadge";

// Memoized contact info components
const EmailCell = React.memo(({ email }: { email: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Mail className="h-3.5 w-3.5 text-neutral-500" />
      <span className="text-xs text-neutral-800">{email || "N/A"}</span>
    </div>
  );
});

EmailCell.displayName = "EmailCell";

const PhoneCell = React.memo(({ phone }: { phone: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Phone className="h-3.5 w-3.5 text-neutral-500" />
      <span className="text-xs text-neutral-800">{phone || "N/A"}</span>
    </div>
  );
});

PhoneCell.displayName = "PhoneCell";

const DateOfBirthCell = React.memo(({ date }: { date: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-3.5 w-3.5 text-neutral-500" />
      <span className="text-xs text-neutral-800">{date || "N/A"}</span>
    </div>
  );
});

DateOfBirthCell.displayName = "DateOfBirthCell";

// Memoized patient avatar component with clickable name
const PatientAvatar = React.memo(({ 
  patient, 
  getRandomColor 
}: { 
  patient: Patient; 
  getRandomColor: (name: string) => string;
}) => {
  const fullName = `${patient.first_name} ${patient.last_name}`;
  const initials = `${patient.first_name[0]}${patient.last_name[0]}`.toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <div
        className={`h-7 w-7 rounded-full flex items-center justify-center text-white text-xs ${getRandomColor(
          patient.first_name
        )}`}
      >
        {initials}
      </div>
      <Link 
        href={`patients-list/patient/${patient.id}`}
        className="text-xs font-semibold text-neutral-800 hover:text-orange-600 hover:font-bold transition-all duration-200 ease-in-out"
      >
        {fullName}
      </Link>
    </div>
  );
});

PatientAvatar.displayName = "PatientAvatar";

// Memoized department cell component
const DepartmentCell = React.memo(({ department }: { department: string }) => {
  const getDeptColor = (dept: string) => {
    switch(dept?.toLowerCase()) {
      case "cardiology": return "bg-red-100 text-red-800";
      case "orthopedics": return "bg-blue-100 text-blue-800";
      case "neurology": return "bg-purple-100 text-purple-800";
      case "pediatrics": return "bg-pink-100 text-pink-800";
      case "oncology": return "bg-amber-100 text-amber-800";
      case "surgery": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Stethoscope className="h-3.5 w-3.5 text-neutral-500" />
      <span className={`text-xs px-2 py-1 rounded-full ${getDeptColor(department)}`}>
        {department || "General"}
      </span>
    </div>
  );
});

DepartmentCell.displayName = "DepartmentCell";

// Actions cell component
const ActionsCell = React.memo(
  ({
    item,
    selectedMenu,
    setSelectedMenu,
    handleEdit,
    handleDischarge,
  }: {
    item: Patient;
    selectedMenu: string | undefined;
    setSelectedMenu: (id: string | undefined) => void;
    handleEdit: (patientId: string) => void;
    handleDischarge: (patientId: string) => void;
  }) => {
    const isOpen = selectedMenu === item.id.toString();

    return (
      <div className="flex justify-center">
        <DropdownMenu
          modal={false}
          open={isOpen}
          onOpenChange={(open) => {
            setSelectedMenu(open ? item.id.toString() : undefined);
          }}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 border border-border"
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <MoreHorizontal className="h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => handleEdit(item.id.toString())}
              className="font-medium text-xs flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Patient
            </DropdownMenuItem>

            <div className="h-px bg-border my-1" />

            <DropdownMenuItem
              onClick={() => handleDischarge(item.id.toString())}
              className="text-green-600 focus:text-green-600 font-medium text-xs flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Initiate Discharge
            </DropdownMenuItem>

            <div className="h-px bg-border my-1" />

            <DropdownMenuItem
              onClick={() => console.log("View medical history:", item.id)}
              className="text-blue-600 focus:text-blue-600 font-medium text-xs flex items-center gap-2"
            >
              <Activity className="h-4 w-4" />
              View History
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);

ActionsCell.displayName = "ActionsCell";

export default function PatientTable({ 
  data, 
  isLoading, 
  isError, 
  error, 
  getRandomColor 
}: PatientTableProps) {
  const [selectedMenu, setSelectedMenu] = useState<string | undefined>(undefined);

  const handleEdit = (patientId: number) => {
    console.log("Edit patient:", patientId);
    // Add your edit logic here
  };

  const handleDischarge = (patientId: number) => {
    console.log("Initiate discharge for patient:", patientId);
    // Add your discharge logic here
  };

  const columns: ColumnDef<Patient>[] = useMemo(() => [
    {
      accessorKey: "id",
      header: () => (
        <span className="text-xs font-semibold text-neutral-800">PATIENT ID</span>
      ),
      cell: ({ row }) => {
        const patientId = row.original.id;
        const formattedId = `${patientId.toString().padStart(3, '0')}`;
        return (
          <div className="flex items-center gap-2">
            <Link href={`patients-list/patient/${patientId}`}
                    className="text-xs font-semibold text-neutral-800 hover:text-orange-600 hover:font-bold transition-all duration-200 ease-in-out"

            >
            <span className="text-xs font-semibold text-neutral-800 hover:text-orange-600">
              #PAT-{formattedId}
            </span>
            </Link>
          </div>
        );
      },
      size: 100,
    },
    {
      accessorKey: "patient_name",
      header: () => (
        <span className="text-xs font-semibold text-neutral-800">
          PATIENT NAME
        </span>
      ),
      cell: ({ row }) => (
        <PatientAvatar patient={row.original} getRandomColor={getRandomColor} />
      ),
      size: 200,
    },
    {
      accessorKey: "email",
      header: () => (
        <span className="text-xs font-semibold text-neutral-800">EMAIL</span>
      ),
      cell: ({ row }) => {
        const email = row.getValue("email") as string;
        return <EmailCell email={email} />;
      },
      size: 180,
    },
    {
      accessorKey: "phone_number",
      header: () => (
        <span className="text-xs font-semibold text-neutral-800">PHONE</span>
      ),
      cell: ({ row }) => {
        const phone = row.getValue("phone_number") as string;
        return <PhoneCell phone={phone} />;
      },
      size: 140,
    },
    {
      accessorKey: "department",
      header: () => (
        <span className="text-xs font-semibold text-neutral-800">DEPARTMENT</span>
      ),
      cell: ({ row }) => {
        const department = row.getValue("department") as string;
        return <DepartmentCell department={department} />;
      },
      size: 140,
    },
    {
      accessorKey: "status",
      header: () => (
        <span className="text-xs font-semibold text-neutral-800">STATUS</span>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return <StatusBadge status={status} />;
      },
      size: 120,
    },
    {
      accessorKey: "date_of_birth",
      header: () => (
        <span className="text-xs font-semibold text-neutral-800">
          DATE OF BIRTH
        </span>
      ),
      cell: ({ row }) => {
        const date = row.getValue("date_of_birth") as string;
        return <DateOfBirthCell date={date} />;
      },
      size: 140,
    },
    {
      id: "actions",
      header: () => (
        <span className="text-xs font-semibold text-neutral-800">ACTIONS</span>
      ),
      cell: ({
        row,
        selectedMenu,
        setSelectedMenu,
        handleEdit,
        handleDischarge,
      }: any) => {
        const item = row.original;
        return (
          <ActionsCell
            item={item}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            handleEdit={handleEdit}
            handleDischarge={handleDischarge}
          />
        );
      },
      size: 100,
    },
  ], [getRandomColor]);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="rounded-lg border border-border bg-white shadow-sm overflow-x-auto">
        <div className="flex items-center justify-center h-24">
          <p className="text-sm text-neutral-500">Loading patients...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="rounded-lg border border-border bg-white shadow-sm overflow-x-auto">
        <div className="flex items-center justify-center h-24">
          <p className="text-sm text-red-500">
            Error loading patients: {error?.message || "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-white shadow-sm overflow-x-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted/50">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead 
                    key={header.id}
                    className="py-3"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <MemoizedTableRow
                key={row.id}
                row={row}
                selectedMenu={selectedMenu}
                setSelectedMenu={setSelectedMenu}
                handleEdit={handleEdit}
                handleDischarge={handleDischarge}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <p className="text-sm text-neutral-500">No patients found.</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}