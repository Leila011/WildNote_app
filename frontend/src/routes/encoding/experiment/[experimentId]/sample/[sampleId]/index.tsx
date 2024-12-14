import { createEffect, createResource, createSignal, Show } from "solid-js";
import { Button, buttonVariants } from "~/components/ui/button";
import { AttributeValue, DurationHMS, Metadata } from "~/types/db";
import { fetchAttributeDescriptions } from "~/api/fetchAttributeDescriptions";
import { Form } from "~/components/Form";
import { createStore } from "solid-js/store";
import { useNavigate, useParams } from "@solidjs/router";
import { addNewObservation } from "~/api/addNewObservation";
import { updateValue } from "~/api/updateValue";
import { Heading } from "~/components/Heading";
import { getTimestamp, toAttributeValue } from "~/utils/db";
import {
  isAttributesValuesValid,
  isColumnsValuesValid,
} from "~/utils/dataValidation";
import { ProgressCircle } from "~/components/ui/progress-circle";
import {
  getPercentageTimePassed,
  getTimePassed,
  secondToString,
} from "~/utils";
import { fetchDuration } from "~/api/fetchDuration";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

export default function EncodingObservation() {
  const navigate = useNavigate();
  const params = useParams();
  const [timestamp_start, setTimestamp_start] = createSignal(getTimestamp());
  const startTime = Date.now();
  const [timePassed, setTimePassed] = createSignal<number>(0);
  const [open, setOpen] = createSignal<string>("closed");

  const [data] = createResource<Metadata>(() =>
    fetchAttributeDescriptions({
      experimentId: Number(params.experimentId),
      level: "observation",
    }),
  );

  const [duration] = createResource<number>(
    () => fetchDuration({ experimentId: Number(params.experimentId) }),
    { initialValue: 0 },
  );

  const [store, setStore] = createStore<AttributeValue[]>([]);

  createEffect(() => {
    if (data()) {
      setStore(toAttributeValue(data()!.attributes));
    }
  });

  // calculate the time passing while the time is not expired
  setInterval(() => {
    if (timePassed() < duration()) {
      setTimePassed(getTimePassed(startTime));
    }
  }, 1000);

  // when time is expired: send an alert
  createEffect(() => {
    if (duration() !== 0 && timePassed() > duration() && open() === "closed") {
      setOpen("open");
    }
  });

  const endObservation = async () => {
    const dataOut = {
      columns: {
        status: "completed",
        timestamp_start: timestamp_start(),
        timestamp_end: getTimestamp(),
      },
      attributes: store,
    };
    const isReady =
      isAttributesValuesValid(dataOut.attributes) &&
      isColumnsValuesValid(dataOut.columns);

    if (isReady) {
      const response = await addNewObservation({
        data: dataOut,
        sampleId: Number(params.sampleId),
      });
      return response;
    }
  };

  const endSample = async () => {
    await updateValue({
      level: "sample",
      column_name: "status",
      row_id: Number(params.sampleId),
      value: "completed",
    });
    await updateValue({
      level: "sample",
      column_name: "timestamp_end",
      row_id: Number(params.sampleId),
      value: getTimestamp(),
    });
  };

  const handleSubmitNext = async () => {
    const response = await endObservation();

    if (response) {
      // reset the stores
      setStore(toAttributeValue(data()!.attributes));
      setTimestamp_start(getTimestamp());

      navigate(
        `/encoding/experiment/${params.experimentId}/sample/${params.sampleId}`,
      );
    }
  };

  const handleSubmitNextSample = async () => {
    const response = await endObservation();
    if (response) {
      await endSample();
      navigate(`/encoding/experiment/${params.experimentId}`);
    }
  };

  const handleSubmitEnd = async () => {
    const response = await endObservation();
    if (response) {
      await endSample();
      navigate(`/`);
    }
  };

  return (
    <div class="container mx-auto">
      <div>
        <div class="flex flex-row justify-between">
          <Heading>Start encoding your new observation</Heading>

          <Show when={duration() !== 0}>
            <ProgressCircle
              value={getPercentageTimePassed(timePassed(), duration())}
              strokeWidth={8}
              class="stroke-accent"
            >
              <span class="text-xs font-medium text-slate-700">
                {secondToString(timePassed())}
              </span>
            </ProgressCircle>
          </Show>
        </div>
        <AlertDialog
          open={open() === "open"}
          onOpenChange={() => setOpen("poped-up")}
        >
          <AlertDialogContent>
            <AlertDialogTitle>Timer out</AlertDialogTitle>
            <AlertDialogDescription>
              You timer of ${secondToString(duration())} is out!
            </AlertDialogDescription>
          </AlertDialogContent>
        </AlertDialog>

        <div class="flex flex-col space-y-2">
          <div class="border border-primary rounded-md item-center bg-muted">
            {store.length && <Form store={store} setStore={setStore}></Form>}
          </div>

          <div class="flex flex-row space-x-2">
            <Button
              class={buttonVariants({ variant: "accent" })}
              onClick={handleSubmitNext}
              disabled={timePassed() >= duration()}
            >
              Next observation
            </Button>
            <Button
              class={buttonVariants({ variant: "outline" })}
              onClick={handleSubmitNextSample}
            >
              Next observation session
            </Button>
            <Button
              class={buttonVariants({ variant: "outline" })}
              onClick={handleSubmitEnd}
            >
              Stop observation session and return home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
