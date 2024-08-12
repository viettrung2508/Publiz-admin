import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createTaxonomySchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CreateTaxonomyInput, Taxonomy, createTaxonomy } from "@/api/publiz";
import toast from "react-hot-toast";
import { FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type CreateTaxonomyFormSchema = z.infer<typeof createTaxonomySchema>;

type Props = {
  taxonomy?: Taxonomy;
};

export const CreateTaxonomyForm: React.FunctionComponent<Props> = ({
  taxonomy,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<CreateTaxonomyFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(createTaxonomySchema),
    defaultValues: {
      name: taxonomy?.name || "",
      slug: taxonomy?.slug || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (input: CreateTaxonomyInput) => {
      return createTaxonomy(input);
    },
  });
  const onSubmit = (data: CreateTaxonomyFormSchema) =>
    mutation.mutate(data, {
      onSuccess: async () => {
        toast.success("Tag created");

      },
      onError: (errors) => {
        console.error(errors);
        toast.error("Tag could not be created");
      },
    }
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <FormItem>
        <Label>Name</Label>
        <Input type="text" {...register("name")} className='text-black' />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </FormItem>
      <FormItem>
        <Label>Slug</Label>
        <Input type="text" {...register("slug")} className='text-black' />
        {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
      </FormItem>
      <Button type="submit" className="w-full" disabled={!isValid} >
        Save
      </Button>
    </form>
  );
};
