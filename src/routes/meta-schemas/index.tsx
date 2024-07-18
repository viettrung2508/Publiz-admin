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
export const Route = createFileRoute('/meta-schemas/')({
  component: MetaSchemas
})

type Checked = DropdownMenuCheckboxItemProps["checked"]

function MetaSchemas() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  return (
    <div className='text-white w-2/6 mx-auto pt-8'>
      <div className='flex justify-between'>
        <h1>Meta Schemas</h1>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex '>
              <span>Target</span>
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
      <h1 className='uppercase text-xl pb-2'>Post</h1>
      <div className='bg-gray-600 p-4 rounded-lg'>
        <div className='flex justify-between pb-4'>
          <div>
            <div>
              <h1 className='pb-2'>blog</h1>
              <p>Version: 0.0.2 Type: System</p>
            </div>
            <div>
              <h1 className='pb-2'>story</h1>
              <p>Version: 0.0.2 Type: System</p>
            </div>
            <div>
              <h1 className='pb-2'>devfeed</h1>
              <p>Version: 0.0.2 Type: System</p>
            </div>
          </div>
          <div>
            <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>default</p>
          </div>
        </div>

      </div>
      <h1 className='uppercase text-xl pb-2 pt-4'>User</h1>
      <div className='bg-gray-600 p-4 rounded-lg'>
        <div className='flex justify-between pb-4'>
          <div>
            <div>
              <h1 className='pb-2'>user-profile</h1>
              <p>Version: 0.0.2 Type: System</p>
            </div>
          </div>
          <div>
            <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>default</p>
          </div>
        </div>

      </div>
      <h1 className='uppercase text-xl pb-2 pt-4'>Comment</h1>
      <div className='bg-gray-600 p-4 rounded-lg'>
        <div className='flex justify-between pb-4'>
          <div>
            <div>
              <h1 className='pb-2'>standard-comment</h1>
              <p>Version: 0.0.2 Type: System</p>
            </div>
            <div>
              <h1 className='pb-2'>organization-opening-request</h1>
              <p>Version: 0.0.2 Type: System</p>
            </div>
          </div>
          <div>
            <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>default</p>
          </div>
        </div>

      </div>

    </div>
  )
}