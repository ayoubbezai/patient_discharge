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
import { Mail, Phone, Calendar, MoreHorizontal, X,Users, Edit, Briefcase, Clock, CheckCircle, Star, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// Staff type used throughout the table
interface Staff {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone_number?: string;
  department?: string;
  role?: string;
  shift?: string;
  status?: string;
  hire_date?: string;
  experience_years?: number;
  [key: string]: any;
}

interface StaffTableProps {
  data: Staff[];
  isLoading: boolean;
  isError: boolean;
  error: any;
  getRandomColor: (name: string) => string;
}

// Memoized row component
const MemoizedTableRow = React.memo(({ row, selectedMenu, setSelectedMenu, handleEdit, handleView }: { 
  row: any;
  selectedMenu: string | undefined;
  setSelectedMenu: (id: string | undefined) => void;
  handleEdit: (staffId: number) => void;
  handleView: (staffId: number) => void;
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
            handleView,
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
        return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: <CheckCircle className="h-3 w-3" /> };
      case "on-leave":
        return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: <Clock className="h-3 w-3" /> };
      case "off-duty":
        return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: <Clock className="h-3 w-3" /> };
      default:
        return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", icon: <CheckCircle className="h-3 w-3" /> };
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
        <span>{status?.replace('-', ' ')?.charAt(0).toUpperCase() + status?.replace('-', ' ')?.slice(1) || "Active"}</span>
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

const HireDateCell = React.memo(({ date }: { date: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-3.5 w-3.5 text-neutral-500" />
      <span className="text-xs text-neutral-800">{date || "N/A"}</span>
    </div>
  );
});

HireDateCell.displayName = "HireDateCell";

// Memoized staff avatar component with clickable name
const StaffAvatar = React.memo(({ 
  staff, 
  getRandomColor 
}: { 
  staff: Staff; 
  getRandomColor: (name: string) => string;
}) => {
  const fullName = `${staff.first_name} ${staff.last_name}`;
  const initials = `${staff.first_name[0]}${staff.last_name[0]}`.toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <div
        className={`h-7 w-7 rounded-full flex items-center justify-center text-white text-xs ${getRandomColor(
          staff.first_name
        )}`}
      >
        {initials}
      </div>
      <Link 
        href={`staff/${staff.id}`}
        className="text-xs font-semibold text-neutral-800 hover:text-orange-600 hover:font-bold transition-all duration-200 ease-in-out"
      >
        {fullName}
      </Link>
    </div>
  );
});

StaffAvatar.displayName = "StaffAvatar";

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
      case "emergency": return "bg-red-100 text-red-800";
      case "radiology": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Briefcase className="h-3.5 w-3.5 text-neutral-500" />
      <span className={`text-xs px-2 py-1 rounded-full ${getDeptColor(department)}`}>
        {department || "General"}
      </span>
    </div>
  );
});

DepartmentCell.displayName = "DepartmentCell";

// Memoized role cell component
const RoleCell = React.memo(({ role }: { role: string }) => {
  const isDoctor = role?.toLowerCase().includes('doctor') || role?.toLowerCase().includes('surgeon') || role?.toLowerCase().includes('ologist');
  
  return (
    <div className="flex items-center gap-2">
      {isDoctor ? (
        <GraduationCap className="h-3.5 w-3.5 text-blue-500" />
      ) : (
        <Users className="h-3.5 w-3.5 text-pink-500" />
      )}
      <span className="text-xs text-neutral-800">{role || "N/A"}</span>
    </div>
  );
});

RoleCell.displayName = "RoleCell";

// Memoized experience cell component
const ExperienceCell = React.memo(({ years }: { years: number }) => {
  return (
    <div className="flex items-center gap-2">
      <Star className="h-3.5 w-3.5 text-amber-500" />
      <span className="text-xs text-neutral-800">{years || 0} years</span>
    </div>
  );
});

ExperienceCell.displayName = "ExperienceCell";

// Actions cell component
const ActionsCell = React.memo(
  ({
    item,
    selectedMenu,
    setSelectedMenu,
    handleEdit,
    handleView,
  }: {
    item: Staff;
    selectedMenu: string | undefined;
    setSelectedMenu: (id: string | undefined) => void;
    handleEdit: (staffId: number) => void;
    handleView: (staffId: number) => void;
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
              {isOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <MoreHorizontal className="h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => handleView(item.id)}
              className="font-medium text-xs flex items-center gap-2"
            >
              <Briefcase className="h-4 w-4" />
              View Profile
            </DropdownMenuItem>

            <div className="h-px bg-border my-1" />

            <DropdownMenuItem
              onClick={() => handleEdit(item.id)}
              className="text-blue-600 focus:text-blue-600 font-medium text-xs flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Staff
            </DropdownMenuItem>

            <div className="h-px bg-border my-1" />

            <DropdownMenuItem
              onClick={() => console.log("Assign shift:", item.id)}
              className="text-green-600 focus:text-green-600 font-medium text-xs flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              Assign Shift
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);

ActionsCell.displayName = "ActionsCell";

export default function StaffTable({ 
  data, 
  isLoading, 
  isError, 
  error, 
  getRandomColor 
}: StaffTableProps) {
  const [selectedMenu, setSelectedMenu] = useState<string | undefined>(undefined);

  const handleEdit = (staffId: number) => {
    console.log("Edit staff:", staffId);
    // Add your edit logic here
  };

  const handleView = (staffId: number) => {
    console.log("View staff:", staffId);
    // Add your view logic here
  };

  const columns: ColumnDef<Staff>[] = useMemo(() => [
    {
      accessorKey: "id",
      header: () => (
        <span className="text-xs font-semibold text-neutral-800">STAFF ID</span>
      ),
      cell: ({ row }) => {
        const staffId = row.original.id;
        const formattedId = `${staffId.toString().padStart(3, '0')}`;
        return (
          <div className="flex items-center gap-2">
            <Link href={`staff/${staffId}`}
                  className="text-xs font-semibold text-neutral-800 hover:text-orange-600 hover:font-bold transition-all duration-200 ease-in-out"
            >
            <span className="text-xs font-semibold text-neutral-800 hover:text-orange-600">
              #STAFF-{formattedId}
            </span>
            </Link>
          </div>
        );
      },
      size: 100,
    },
    {
      accessorKey: "name",
      header: () => (
        <span className="text-xs font-semibold text-neutral-800">
          STAFF NAME
        </span>
      ),
      cell: ({ row }) => (
        <StaffAvatar staff={row.original} getRandomColor={getRandomColor} />
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
      accessorKey: "role",
      header: () => (
        <span className="text-xs font-semibold text-neutral-800">ROLE</span>
      ),
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        return <RoleCell role={role} />;
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
      accessorKey: "experience_years",
      header: () => (
        <span className="text-xs font-semibold text-neutral-800">
          EXPERIENCE
        </span>
      ),
      cell: ({ row }) => {
        const years = row.getValue("experience_years") as number;
        return <ExperienceCell years={years} />;
      },
      size: 100,
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
        handleView,
      }: any) => {
        const item = row.original;
        return (
          <ActionsCell
            item={item}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            handleEdit={handleEdit}
            handleView={handleView}
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
          <p className="text-sm text-neutral-500">Loading staff...</p>
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
            Error loading staff: {error?.message || "Unknown error"}
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
                handleView={handleView}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <p className="text-sm text-neutral-500">No staff found.</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}