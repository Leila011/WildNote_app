import { useLocation, useNavigate } from "@solidjs/router";
import { ColumnDef } from "@tanstack/solid-table";
import { Show } from "solid-js";
import { deleteItem } from "~/api/common/deleteItem";
import { updateItemColumnValue } from "~/api/common/updateItemColumnValue";
import { IconDots } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Level } from "~/types/db";
import { getTimestamp } from "~/utils/db";

export const generateColumns = (
  schema: { name: string }[],
  table: Level,
  refetch?: () => void,
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
            <Show when={table === "experiment"}>
              <DropdownMenuItem
                onClick={async () => {
                  await updateItemColumnValue({
                    level: "experiment",
                    column_name: "status",
                    row_id: props.row.original.experiment_id,
                    value: "completed",
                  });
                  await updateItemColumnValue({
                    level: "experiment",
                    column_name: "timestamp_end",
                    row_id: props.row.original.experiment_id,
                    value: getTimestamp(),
                  });

                  refetch && refetch();
                }}
              >
                Mark as completed
              </DropdownMenuItem>
            </Show>
            <DropdownMenuItem
              onClick={async () => {
                const response = await deleteItem({
                  level: table,
                  row_id: props.row.original[table + "_id"],
                });
                refetch && refetch();
              }}
              disabled = {["experiment", "sample"].includes(table) && [1,2].includes(props.row.original.experiment_id) || table === "observation" && props.row.original.observation_id <=250}
            >
              Delete
            </DropdownMenuItem>
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
          variant="secondary"
          onClick={() =>
            navigate(
              `${location.pathname}/${props.row.original[table + "_id"]}`,
            )
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
          <Show
            when={
              props.row.original.status === "active" ||
              props.row.original.status === "created"
            }
          >
            <Button
              variant="default"
              onClick={() =>
                navigate(`encoding/${props.row.original[idColumnName]}`)
              }
            >
              Start encoding
            </Button>
          </Show>
          {/* <Show when={props.row.original.status === "created"}>
            <Button
              variant="secondary"
              onClick={() =>
                navigate(`/newExperiment/${props.row.original[idColumnName]}`)
              }
            >
              Complete the setup
            </Button>
          </Show> */}
        </div>
      );
    },
  };

  const attributesColumns = schema.map((column: any) => {
    const name =
      column.name === "timestamp_start"
        ? "start"
        : column.name === "timestamp_end"
          ? "end"
          : column.name;
    return {
      accessorKey: column.name,
      header: name.charAt(0).toUpperCase() + name.slice(1).replace("_", " "),
    };
  });

  if (table === "observation")
    return [firstColumn, ...attributesColumns, dropDownDots];
  if (table === "experiment")
    return [
      firstColumn,
      ...attributesColumns,
      showButton,
      startButton,
      dropDownDots,
    ];
  return [firstColumn, ...attributesColumns, showButton, dropDownDots];
};
