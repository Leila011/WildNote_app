import { useLocation, useNavigate } from "@solidjs/router";
import { ColumnDef } from "@tanstack/solid-table";
import { Show } from "solid-js";
import { deleteRow } from "~/api/deleteRow";
import { updateValue } from "~/api/updateValue";
import { IconDots } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const generateColumns = (
  schema: any = [],
  table: string,
  refetch?: ()=>void
): ColumnDef<any>[] => {
  const navigate = useNavigate();
  const location = useLocation();

  const firstColumn = {
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
    enableHiding: false,
  };

  const dropDownDots = {
    id: "actions",
    enableHiding: false,
    cell: (props) => {
      return (
        <DropdownMenu placement="bottom-end">
          <DropdownMenuTrigger
            as={Button<"button">}
            variant="ghost"
            class="size-8 p-0"
          >
            <span class="sr-only">Open menu</span>
            <IconDots />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Show when= {table === "experiment"}>
            <DropdownMenuItem
                onClick={async () => {
                  await updateValue("experiment", "status", props.row.original.experiment_id, "completed");
                  refetch && refetch();
                }}
            >Mark as completed</DropdownMenuItem>
            </Show>
            <DropdownMenuItem
            onClick={async () => {
              const response = await deleteRow(table, props.row.original[table + "_id"]);
              console.log(response);
              refetch && refetch();
            }} >Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };

  const showButton = {
    id: "button",
    cell: (props) => {
      // Determine the correct column name based on the table type
      const idColumnName =
        table === "experiment"
          ? "experiment_id"
          : table === "sample"
            ? "sample_id"
            : table === "observation"
              ? "observation_id"
              : table === "subject"
                ? "subject_id"
                : "id";

      return (
        <Button
          variant="default"
          onClick={() =>
            navigate(`${location.pathname}/${props.row.original[table + "_id"]}`)
          }
        >
          {table === "sample" ? "View Observations" : "View Samples"}
        </Button>
      );
    },
  };

  const startButton = {
    id: "button",
    cell: (props) => {
      // Determine the correct column name based on the table type
      const idColumnName =
        table === "experiment"
          ? "experiment_id"
          : table === "sample"
            ? "sample_id"
            : table === "observation"
              ? "observation_id"
              : table === "subject"
                ? "subject_id"
                : "id";

      return (
        <div> 
        <Show when={props.row.original.status === "active"}>
        <Button
          variant="default"
          onClick={() =>
            navigate(`encoding/${props.row.original[idColumnName]}`)
          }
        >
          Start encoding
        </Button>
        </Show>
        <Show when={props.row.original.status === "created"}>
        <Button
          variant="secondary"
          onClick={() =>
            navigate(`encoding/${props.row.original[idColumnName]}`)
          }
        >
          Complete the setup
        </Button>
        </Show>
        </div>

      );
    },
  };

  const attributesColumns = schema.map((column: any) => {
    const name = column.name === "timestamp_start"? "start" : 
                 column.name === "timestamp_end"? "end" : column.name;
    return {
      accessorKey: column.name,
      header:
        name.charAt(0).toUpperCase() +
        name.slice(1).replace("_", " "),
    };
  });

  if (table === "observation")
    return [firstColumn, ...attributesColumns, dropDownDots];
  if (table === "experiment")
    return [firstColumn, ...attributesColumns, showButton, startButton, dropDownDots];
  return [firstColumn, ...attributesColumns, showButton, dropDownDots];
};
