import { ColumnDef } from "@tanstack/solid-table";

export const generateColumns = (schema: any): ColumnDef<any>[] => {
    return schema.map((column: any) => ({
      accessorKey: column.name,
      header: column.name.charAt(0).toUpperCase() + column.name.slice(1).replace('_', ' '),
    }));
  };