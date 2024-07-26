import { createFileRoute } from '@tanstack/react-router'
import {
    Plus,
    ChevronDown,
} from "lucide-react"
import * as React from "react"
import { Drawer } from "vaul";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { CreateTaxonomyInput, createTaxonomy, getTaxonomies } from '@/api/publiz';
import toast from "react-hot-toast";
import { Label } from '@/components/ui/label';
import { FormItem } from '@/components/ui/form';
import { buildQueryOptions } from '@/lib/query';

export const Route = createFileRoute('/taxonomies/')({
    component: Taxonomies,
    loader: ({ context }) =>
        context.queryClient.ensureQueryData(buildQueryOptions(getTaxonomies)),
})

type Checked = DropdownMenuCheckboxItemProps["checked"]
type CreateTaxonomyFormSchema = z.infer<typeof createTaxonomySchema>;

const createTaxonomySchema = z.object({
    name: z.string().min(1).max(100),
    slug: z.string().min(1).max(100),
    // description: z.string().min(1),
    type: z.enum(["SYSTEM", "DEFAULT"]),
    organizationId: z.number(),
    userId: z.number(),
});
function Taxonomies() {
    const {
        data: { data: taxonomies = [] },
    } = useSuspenseQuery(buildQueryOptions(getTaxonomies));
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm<CreateTaxonomyFormSchema>({
        mode: "onBlur",
        resolver: zodResolver(createTaxonomySchema),
    });

    const mutation = useMutation({
        mutationFn: (input: CreateTaxonomyInput) => {
            return createTaxonomy(input);
        },
    });
    const onSubmit = (data: CreateTaxonomyFormSchema) =>
        mutation.mutate(data, {
            onSuccess: async () => {
                toast.success("Taxonomy created");
            },
            onError: (errors) => {
                console.error(errors);
                toast.error("Tag could not be created");
            },
        });
    const [showDefault, setShowDefault] = React.useState<Checked>(true)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)
    return (
        <div className='text-white w-2/6 mx-auto pt-8'>
            <div className='flex justify-between'>
                <h1>Taxonomies</h1>
                <Drawer.Root direction="right" >
                    <Drawer.Trigger asChild>
                        <button>
                            <Plus />
                        </button>
                    </Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay className="fixed inset-0 bg-black/70" />
                        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0">
                            <div className="p-4 text-white bg-zinc-800 border  border-neutral-700 border-y-0 border-l-2 flex-1 h-full">
                                <div className="max-w-md mx-auto">
                                    <Drawer.Title className="font-medium mb-4">
                                        Create a new taxonomy
                                    </Drawer.Title>
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
                                        {/* <FormItem>
                                            <Label>Description</Label>
                                            <Textarea type="text" {...register("description")} />
                                            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                                        </FormItem> */}
                                        <Button type="submit" className="w-full" disabled={!isValid}>
                                            Save
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>

            </div>
            <div className='pt-6 pb-8'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className='flex '>
                            <span>System</span>
                            <ChevronDown className='ml-4' />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuCheckboxItem
                            checked={showDefault}
                            onCheckedChange={setShowDefault}
                        >
                            Default
                        </DropdownMenuCheckboxItem>

                        <DropdownMenuCheckboxItem
                            checked={showPanel}
                            onCheckedChange={setShowPanel}
                        >
                            Panel
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className='bg-gray-600 p-4 rounded-lg'>
                {taxonomies.map((taxonomies) => (
                    <div key={taxonomies.id} className='flex justify-between pb-4'>
                        <div>
                            <h1 className='pb-2'>{taxonomies.name}</h1>
                        </div>
                        <div>
                            <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>{taxonomies.slug}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}