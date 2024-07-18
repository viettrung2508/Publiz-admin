import { createFileRoute } from '@tanstack/react-router'
import {
    Plus,
    ChevronDown,
} from "lucide-react"
import * as React from "react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
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
export const Route = createFileRoute('/taxonomies/')({
    component: Taxonomies
})

type Checked = DropdownMenuCheckboxItemProps["checked"]

function Taxonomies() {
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)
    return (
        <div className='text-white w-2/6 mx-auto pt-8'>
            <div className='flex justify-between'>
                <h1>Taxonomies</h1>
                <Drawer direction='right'>
                    <DrawerTrigger>
                        <Plus />
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                            <DrawerDescription>This action cannot be undone.</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <Button>Submit</Button>
                            <DrawerClose>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>

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