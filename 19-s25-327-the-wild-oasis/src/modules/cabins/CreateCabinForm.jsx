import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession
      ? editValues
      : {
          maxCapacity: 1,
          regularPrice: 0,
          discount: 0,
        },
  });
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    //encapsulet the changes were the mutation is happening
    mutationFn: (newCabinData) => createEditCabin(newCabinData),
    onSuccess: () => {
      toast.success("New cabin successfully created!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    //encapsulet the changes were the mutation is happening
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id), //only accepts one param (object)
    onSuccess: () => {
      toast.success("Cabin successfully Edited!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const inProgress = isCreating || isEditing;

  function handleCreateCabin(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin({ newCabinData: { ...data, image }, id: editId });
    else createCabin({ ...data, image });
  }

  // to know that exsists but errors are hadled by the const { errors } = formState; from useForm hook
  function onError(errors) {
    console.log("errors", errors);
  }

  return (
    <Form onSubmit={handleSubmit(handleCreateCabin, onError)}>
      <FormRow label=" Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={inProgress}
          {...register("name", {
            required: "this field is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={inProgress}
          {...register("maxCapacity", {
            required: "this field is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Capacity must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={inProgress}
          {...register("regularPrice", {
            required: "this field is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Regular Price must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={inProgress}
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            valueAsNumber: true,
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount must be less that regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={inProgress}
          defaultValue=""
          {...register("description", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={inProgress}
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "this field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        {!isEditSession && (
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
        )}
        <Button disabled={inProgress}>
          {isEditSession ? "Edit" : "Create new"} cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
