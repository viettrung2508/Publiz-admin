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
export const Route = createFileRoute('/tags/')({
    component: Tags
})

type Checked = DropdownMenuCheckboxItemProps["checked"]

function Tags() {
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
            <div className='bg-gray-600 p-4 rounded-lg'>
                <div className='flex justify-between pb-4'>
                    <div>
                        <h1 className='pb-2'>Golang</h1>
                    </div>
                    <div>
                        <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>golang</p>
                    </div>
                </div>
                <div className='flex justify-between pb-4'>
                    <div>
                        <h1 className='pb-2'>Javascript</h1>
                    </div>
                    <div>
                        <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>javascript</p>
                    </div>
                </div>
                <div className='flex justify-between pb-4'>
                    <div>
                        <h1 className='pb-2'>Kubernetes</h1>
                    </div>
                    <div>
                        <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>Kubernetes</p>
                    </div>
                </div>
                <div className='flex justify-between pb-4'>
                    <div>
                        <h1 className='pb-2'>React Native</h1>
                    </div>
                    <div>
                        <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>react-native</p>
                    </div>
                </div>
                <div className='flex justify-between '>
                    <div>
                        <h1 className='pb-2'>Agile</h1>
                    </div>
                    <div>
                        <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>agile</p>
                    </div>
                </div>
                <div className='flex justify-between '>
                    <div>
                        <h1 className='pb-2'>Software Engineering</h1>
                    </div>
                    <div>
                        <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>software-engineering</p>
                    </div>
                </div>
            </div>
            <h1 className='uppercase py-4'>Job</h1>
            <div className='bg-gray-600 p-4 rounded-lg'>
                <div className='flex justify-between pb-4'>
                    <div>
                        <h1 className='pb-2'>Front end</h1>
                    </div>
                    <div>
                        <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>front-end</p>
                    </div>
                </div>
                <div className='flex justify-between pb-4'>
                    <div>
                        <h1 className='pb-2'>Back end</h1>
                    </div>
                    <div>
                        <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>Back end</p>
                    </div>
                </div>
                <div className='flex justify-between pb-4'>
                    <div>
                        <h1 className='pb-2'>DevOps</h1>
                    </div>
                    <div>
                        <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>devops</p>
                    </div>
                </div>
                <div className='flex justify-between pb-4'>
                    <div>
                        <h1 className='pb-2'>UI/UX Design</h1>
                    </div>
                    <div>
                        <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>ui-ux-design</p>
                    </div>
                </div>
                <div className='flex justify-between '>
                    <div>
                        <h1 className='pb-2'>Business Analyst</h1>
                    </div>
                    <div>
                        <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>business-analyst</p>
                    </div>
                </div>
                <div className='flex justify-between '>
                    <div>
                        <h1 className='pb-2'>Quality Assurance</h1>
                    </div>
                    <div>
                        <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>quality-assurance</p>
                    </div>
                </div>
            </div>
        </div>
    )
}