import { createFileRoute } from '@tanstack/react-router'
import {
    Plus,
    ChevronDown,
} from "lucide-react"
import * as React from "react"
import { Drawer } from "vaul";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { buildQueryOptions } from '@/lib/query';
import { CreateTaxonomyForm } from '@/components/taxonomy/CreateTaxonomyForm';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getTaxonomies } from '@/api/publiz';

export const Route = createFileRoute('/taxonomies/')({
    component: Taxonomies,
    loader: ({ context }) =>
        context.queryClient.ensureQueryData(buildQueryOptions(getTaxonomies)),
})

type Checked = DropdownMenuCheckboxItemProps["checked"]


function Taxonomies() {
    const {
        data: { data: taxonomies = [] },
    } = useSuspenseQuery(buildQueryOptions(getTaxonomies));

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
                                    <CreateTaxonomyForm />
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