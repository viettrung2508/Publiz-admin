import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createTagSchema } from "./schema";
import { CreateTagInput, Tag, createTag } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type CreateTagFormSchema = z.infer<typeof createTagSchema>;

type Props = {
  tag?: Tag;
};
export const CreateTagForm: React.FunctionComponent<Props> = ({
  tag,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<CreateTagFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      name: tag?.name || "",
      slug: tag?.slug || "",
      taxonomyId: tag?.taxonomyId || 0,
    },
  });

  const mutation = useMutation({
    mutationFn: (input: CreateTagInput) => {
      return createTag(input);
    },
  });
  const onSubmit = (data: CreateTagFormSchema) =>
    mutation.mutate(data, {
      onSuccess: async () => {
        toast.success(`Organization ${tag ? "updated" : "created"}`);
      },
      onError: (errors) => {
        console.error(errors);
        toast.error(
          `Organization could not be ${tag ? "updated" : "created"}`
        );
      },
    });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <FormItem>
        <Label>Name</Label>
        <Input type="text" {...register("name")} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </FormItem>
      <FormItem>
        <Label>Slug</Label>
        <Input type="text" {...register("slug")} />
        {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
      </FormItem>
      <Controller
        name="taxonomyId"
        control={control}
        render={({ field }) => (
          <FormItem>
            <Label>Taxonomy</Label>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a taxonomy" />
              </SelectTrigger>
              <SelectContent>
                {taxonomies.map((taxonomy) => (
                  <SelectItem key={taxonomy.id} value={taxonomy.id}>
                    {taxonomy.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.taxonomyId && (
              <p className="text-red-500">{errors.taxonomyId.message}</p>
            )}
          </FormItem>
        )}
      ></Controller>
      <Button type="submit" className="w-full" disabled={!isValid}>
        Save
      </Button>
    </form>
  );
};
