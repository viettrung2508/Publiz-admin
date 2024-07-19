import { createFileRoute } from '@tanstack/react-router'
import {
    Plus,
    ChevronDown,
} from "lucide-react"
import * as React from "react"
import { Drawer } from "vaul";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
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
import { Textarea } from '@/components/ui/textarea';
export const Route = createFileRoute('/taxonomies/')({
    component: Taxonomies
})

type Checked = DropdownMenuCheckboxItemProps["checked"]
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    slug: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})
function Taxonomies() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
            description: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
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
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Name</FormLabel>
                                                            <FormControl>
                                                                <Input className='bg-zinc-700 border-zinc-700'  {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="slug"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Slug</FormLabel>
                                                            <FormControl>
                                                                <Input className='bg-zinc-700 border-zinc-700' {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="description"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Description</FormLabel>
                                                            <FormControl>
                                                                <Textarea className='bg-zinc-700 border border-zinc-700' {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <Button type="submit" className='bg-yellow-400 text-black'>Save</Button>
                                            </div>
                                        </form>
                                    </Form>
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
            <div className='bg-gray-600 p-4 rounded-lg'>
                <div className='flex justify-between pb-4'>
                    <div>
                        <h1 className='pb-2'>Blog post</h1>
                        <p>Use for the blog post content</p>
                    </div>
                    <div>
                        <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>blog_post</p>
                    </div>
                </div>
                <div className='flex justify-between pb-4'>
                    <div>
                        <h1 className='pb-2'>Story</h1>
                        <p>Use for the quick story content</p>
                    </div>
                    <div>
                        <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>story</p>
                    </div>
                </div>
                <div className='flex justify-between pb-4'>
                    <div>
                        <h1 className='pb-2'>Product</h1>
                        <p>Use for the selling product</p>
                    </div>
                    <div>
                        <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>product</p>
                    </div>
                </div>
                <div className='flex justify-between pb-4'>
                    <div>
                        <h1 className='pb-2'>Job</h1>
                        <p>Use for the job listing item</p>
                    </div>
                    <div>
                        <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>job</p>
                    </div>
                </div>
                <div className='flex justify-between '>
                    <div>
                        <h1 className='pb-2'>Forum post</h1>
                        <p>Use for the forum post content</p>
                    </div>
                    <div>
                        <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>story</p>
                    </div>
                </div>
            </div>
        </div>
    )
}