import { createFileRoute } from '@tanstack/react-router'
import {
    Plus,
    ChevronDown,
} from "lucide-react"
import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Drawer } from "vaul";
import { Button } from '@/components/ui/button'
import { buildQueryOptions } from '@/lib/query'
import { CreateTagInput, createTag, getTags, getTaxonomies } from '@/api/publiz'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { FormItem } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { Tag } from '@/api/publiz'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SelectItem } from '@radix-ui/react-select'
import { createTagSchema } from '@/components/tag/schema'
export const Route = createFileRoute('/tags/')({
    component: Tags,
    loader: async ({ context }) => {
        const { queryClient } = context;
        const tagsDataPromise = queryClient.ensureQueryData(buildQueryOptions(getTags));
        const taxonomiesDataPromise = queryClient.ensureQueryData(buildQueryOptions(getTaxonomies));
        const [tagsData, taxonomiesData] = await Promise.all([tagsDataPromise, taxonomiesDataPromise]);
        return {
            tagsData,
            taxonomiesData,
        };
    }
})

type Checked = DropdownMenuCheckboxItemProps["checked"]
type CreateTagFormSchema = z.infer<typeof createTagSchema>;

function Tags() {
    const {
        data: { data: tags = [] },
    } = useSuspenseQuery(buildQueryOptions(getTags));
    const {
        data: { data: taxonomies = [] },
    } = useSuspenseQuery(buildQueryOptions(getTaxonomies));

    const {
        register,
        handleSubmit,
        control,
        formState: { isValid, errors },
    } = useForm<CreateTagFormSchema>({
        mode: "onBlur",
        resolver: zodResolver(createTagSchema),
    });

    const mutation = useMutation({
        mutationFn: (input: CreateTagInput) => {
            return createTag(input);
        },
    });
    const onSubmit = (data: CreateTagFormSchema) =>
        mutation.mutate(data, {
            onSuccess: async () => {
                toast.success("Tag created");
            },
            onError: (errors) => {
                console.error(errors);
                toast.error("Tag could not be created");
            },
        });
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)

    // const groupByTaxonomyId = tags.reduce((groupTaxonomyId, item) => {
    //     const taxonomyId = item.taxonomyId
    //     if(groupTaxonomyId[taxonomyId] == null) groupTaxonomyId[taxonomyId] = []
    //     groupTaxonomyId[taxonomyId].push(item)
    //     return groupTaxonomyId
    // },{})

    const groupByTaxonomyId = tags.reduce<{ [key: string]: Tag[] }>((tgs, item) => {
        (tgs[item.taxonomyId] = tgs[item.taxonomyId] || []).push(item);
        return tgs;
    }, {})
    const taxonomyLookup = React.useMemo(() => {
        return taxonomies.reduce<{ [key: string]: string }>((lookup, taxonomy) => {
            lookup[taxonomy.id] = taxonomy.name;
            return lookup;
        }, {});
    }, [taxonomies]);
    console.log(taxonomies, "123")
    return (
        <div className='text-white w-2/6 mx-auto pt-8'>
            <div className='flex justify-between'>
                <h1 className='text-lg'>Tags</h1>
                <Drawer.Root direction="right" >
                    <Drawer.Trigger asChild>
                        <button>
                            <Plus />
                        </button>
                    </Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay className="fixed inset-0 bg-black/70" />
                        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0">
                            <div className="p-4 text-white bg-zinc-900 border  border-neutral-700 border-y-0 border-l-2 flex-1 h-full">
                                <div className="max-w-md mx-auto">
                                    <Drawer.Title className="font-medium mb-4">
                                        Create a new taxonomy
                                    </Drawer.Title>
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                                        <FormItem>
                                            <Label>Name</Label>
                                            <Input type="text" {...register("name")} className="bg-zinc-800 mt-1 border-0" />
                                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                        </FormItem>
                                        <FormItem>
                                            <Label>Slug</Label>
                                            <Input type="text" {...register("slug")} className="bg-zinc-800 mt-1 border-0" />
                                            {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
                                        </FormItem>
                                        <Controller
                                            name="taxonomyId"
                                            control={control}
                                            render={({ field }) => (
                                                <FormItem >
                                                    <Label>Taxonomy</Label>
                                                    <Select value={field.value?.toString()} onValueChange={(value) => field.onChange(value)} >
                                                        <SelectTrigger className='bg-zinc-800 border-0'>
                                                            <SelectValue placeholder="" />
                                                        </SelectTrigger>
                                                        <SelectContent className='bg-zinc-800 text-white'>
                                                            {taxonomies.map((taxonomy) => (
                                                                <SelectItem key={taxonomy.id} value={taxonomy.id.toString()}>
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
                                            Create
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>

            </div>
            <div className='pt-6 pb-8 flex'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className='flex '>
                            <span className='text-base'>System</span>
                            <ChevronDown className='ml-4' />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuCheckboxItem
                            checked={showStatusBar}
                            onCheckedChange={setShowStatusBar}
                        >
                            Status Bar
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={showActivityBar}
                            onCheckedChange={setShowActivityBar}
                            disabled
                        >
                            Activity Bar
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={showPanel}
                            onCheckedChange={setShowPanel}
                        >
                            Panel
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className='flex '>
                            <span className='text-base'>Taxonomy</span>
                            <ChevronDown className='ml-4' />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuCheckboxItem
                            checked={showStatusBar}
                            onCheckedChange={setShowStatusBar}
                        >
                            Status Bar
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={showActivityBar}
                            onCheckedChange={setShowActivityBar}
                            disabled
                        >
                            Activity Bar
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={showPanel}
                            onCheckedChange={setShowPanel}
                        >
                            Panel
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className='flex '>
                            <span className='text-base'>Organization</span>
                            <ChevronDown className='ml-4' />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuCheckboxItem
                            checked={showStatusBar}
                            onCheckedChange={setShowStatusBar}
                        >
                            Status Bar
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={showActivityBar}
                            onCheckedChange={setShowActivityBar}
                            disabled
                        >
                            Activity Bar
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

            {Object.entries(groupByTaxonomyId).map(([taxonomyId, tags]) => (
                <div key={taxonomyId} className='mb-8'>
                    <h1 className='uppercase pb-4 text-sm'> {taxonomyLookup[taxonomyId] || taxonomyId}</h1>
                    <div className='bg-zinc-700 p-4 rounded-lg'>
                        {tags.map((tag) => (
                            <div key={tag.id} className='flex justify-between pb-4'>
                                <div>
                                    <h1 className='pb-2 text-base'>{tag.name}</h1>
                                </div>
                                <div>
                                    <p className='bg-[#FFCE31] p-1 rounded-2xl text-xs text-[#77611B]'>{tag.slug}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

        </div>
    )
}