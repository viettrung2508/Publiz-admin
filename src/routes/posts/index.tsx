import { createFileRoute } from '@tanstack/react-router'
import {
  ChevronDown,
  Eye,
  SquarePen
} from "lucide-react"
import * as React from "react"

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export const Route = createFileRoute('/posts/')({
  component: Posts
})

type Checked = DropdownMenuCheckboxItemProps["checked"]

function Posts() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  return (
    <div className='text-white w-10/12 mx-auto pt-8'>
      <div className='flex justify-between'>
        <h1>Posts</h1>
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
              <span>User</span>
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
      <div className='bg-zinc-900 p-4 rounded-lg'>
        <div className='flex justify-between'>
          <div className='flex'>
            <div>
              <img
                className="h-16 w-24 rounded-lg object-cover"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/440px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
                alt="Profile"
              />
            </div>
            <div className='ml-4'>
              <h1>Go:Exploring new loop semantics</h1>
              <div className='flex'>
                <p className='pr-4'>Forum Post</p>
                <span>14:20 15/07/2024</span>
              </div>
              <div className='flex items-center'>
                <div>
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/440px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
                    alt="Profile"
                  />
                </div>
                <h1 className='ml-2'>Hoang Manh Duc</h1>
              </div>
            </div>
          </div>
          <div className='flex items-center'>
            <Eye className='mr-4'/>
            <SquarePen />
          </div>
        </div>
      </div>
    </div>
  )
}