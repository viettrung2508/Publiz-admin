import { createFileRoute } from '@tanstack/react-router'
import {
  Plus,
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

import { Button } from '@/components/ui/button'
export const Route = createFileRoute('/organizations/')({
  component: Organizations
})
function Organizations() {
  return (
    <div className='text-white mx-auto pt-8'>
      <div className='flex justify-between'>
        <h1>Organizations</h1>
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

      <div className='bg-gray-600 p-4 rounded-lg mt-4'>
        <div className='flex pb-4'>
          <div>
            <img
              className="h-12 w-12 rounded-full object-cover"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/440px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
              alt="Profile"
            />
          </div>
          <div className='pl-2'>
            <h1 className=''>Techgoda</h1>
            <p>Open social publish platform team</p>
          </div>
        </div>




      </div>
    </div>
  )
}