import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createOrganizationSchema } from "./schema";
import { CreateOrganizationInput, Organization, createOrganization } from "@/api/publiz";
import { useMutation } from "@tanstack/react-query";
import { FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";



type CreateOrganizationFormSchema = z.infer<typeof createOrganizationSchema>;

type Props = {
  organization?: Organization;
};
export const CreateOrganizationForm: React.FunctionComponent<Props> = ({
  organization,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<CreateOrganizationFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: organization?.name || "",
      slug: organization?.slug || "",
      verified: organization?.verified || false,
      description: organization?.description || "",
      ownerId: organization?.ownerId || 0,
    },
  });

  const mutation = useMutation({
    mutationFn: (input: CreateOrganizationInput) => {
      return createOrganization(input);
    },
  });
  const onSubmit = (data: CreateOrganizationFormSchema) =>
    mutation.mutate(data, {
      onSuccess: async () => {
        toast.success(`Organization ${organization ? "updated" : "created"}`);
      },
      onError: (errors) => {
        console.error(errors);
        toast.error(
          `Organization could not be ${organization ? "updated" : "created"}`
        );
      },
    });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="w-[144px] mx-auto ">
        <img className="w-[144px] h-[144px] mb-2 rounded " />
        <Input className="bg-zinc-800 border-0" type="file"></Input>
      </div>
      <FormItem>
        <Label>Name</Label>
        <Input type="text" {...register("name")} className="bg-zinc-800 border-0" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </FormItem>

      <FormItem>
        <Label>Description</Label>
        <Textarea {...register("description")} className="bg-zinc-800 border-0" />

        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </FormItem>
      <Button type="submit" className="w-full bg-[#FFCE31]" disabled={!isValid}>
        Save
      </Button>
    </form>
  );
};
