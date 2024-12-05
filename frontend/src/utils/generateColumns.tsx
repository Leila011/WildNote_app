import { useLocation, useNavigate } from "@solidjs/router";
import { ColumnDef } from "@tanstack/solid-table";
import { createEffect } from "solid-js/types/server/reactive.js";
import { IconDots } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"

export const generateColumns = (schema: any, table: string): ColumnDef<any>[] => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const firstColumn =  {
      id: "select",
      header: (props) => (
        <Checkbox
          checked={props.table.getIsAllPageRowsSelected()}
          indeterminate={props.table.getIsSomePageRowsSelected()}
          onChange={(value) => props.table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: (props) => (
        <Checkbox
          checked={props.row.getIsSelected()}
          onChange={(value) => props.row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false
  }

  const dropDownDots =  {
    id: "actions",
    enableHiding: false,
    cell: (props) => {
      return (
        <DropdownMenu placement="bottom-end">
          <DropdownMenuTrigger as={Button<"button">} variant="ghost" class="size-8 p-0">
            <span class="sr-only">Open menu</span>
            <IconDots />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(props.row.original.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Send</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }}

    const startButton = {
      id: "button",
      cell: (props) => {
        return (
          <Button
            variant="default"
            onClick={() => navigate(`${location.pathname}/${props.row.original.id}`)}
            >
            {table === "sample"?"View Observations" : "View Samples"} 
          </Button>
        )
      }
    }
    const attributesColumns = schema.map((column: any) => ({
      accessorKey: column.name,
      header: column.name.charAt(0).toUpperCase() + column.name.slice(1).replace('_', ' '),
    })); 
    

    if(table === "observation") return [firstColumn, ...attributesColumns, dropDownDots];
    return [firstColumn, ...attributesColumns, startButton, dropDownDots];

  };