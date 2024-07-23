import { createFileRoute } from '@tanstack/react-router'
import {
    Plus,
    ChevronDown,
} from "lucide-react"
import * as React from "react"
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { buildQueryOptions } from '@/lib/query'
import { CreateTagInput, createTag, getTags } from '@/api/publiz'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { FormItem } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { z } from 'zod'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SelectItem } from '@radix-ui/react-select'
export const Route = createFileRoute('/tags/')({
    component: Tags,
    loader: ({ context }) =>
        context.queryClient.ensureQueryData(buildQueryOptions(getTags)),
})
const createTagSchema = z.object({
    name: z.string().min(1).max(100),
    slug: z.string().min(1).max(100),
    type: z.enum(["SYSTEM", "DEFAULT"]),
    organizationId: z.number(),
    userId: z.number(),

});

type Checked = DropdownMenuCheckboxItemProps["checked"]
type CreateTagFormSchema = z.infer<typeof createTagSchema>;

function Tags() {
    const {
        data: { data: tags = [] },
    } = useSuspenseQuery(buildQueryOptions(getTags));
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
    return (
        <div className='text-white w-2/6 mx-auto pt-8'>
            <div className='flex justify-between'>
                <h1>Tags</h1>
                <Drawer direction='right'>
                    <DrawerTrigger>
                        <Plus />
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        </DrawerHeader>
                        <DrawerFooter>
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
                                    name="type"
                                    control={control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Taxonomy</Label>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="DEFAULT">1</SelectItem>
                                                    <SelectItem value="SYSTEM">2</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.type && (
                                                <p className="text-red-500">{errors.type.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                ></Controller>
                                <Button type="submit" className="w-full" disabled={!isValid}>
                                    Create
                                </Button>
                            </form>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
            <div className='pt-6 pb-8 flex'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className='flex '>
                            <span>System</span>
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
                            <span>Taxonomy</span>
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
                            <span>Organization</span>
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
            <h1 className='uppercase pb-4'>Forum</h1>
            <div className='bg-zinc-700 p-4 rounded-lg'>
                {tags.map((tag) => (
                    <div key={tag.id} className='flex justify-between pb-4'>
                        <div>
                            <h1 className='pb-2'>{tag.name}</h1>
                        </div>
                        <div>
                            <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>{tag.slug}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}