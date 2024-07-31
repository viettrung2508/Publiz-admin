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
import { buildQueryOptions } from '@/lib/query'
import { getOrganization } from '@/api'
import { useSuspenseQuery } from '@tanstack/react-query'
export const Route = createFileRoute('/organizations/')({
  component: Organizations,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(buildQueryOptions(getOrganization)),
})
function Organizations() {
  const {
    data: { data: organization = [] },
  } = useSuspenseQuery(buildQueryOptions(getOrganization));
  return (
    <div className='text-white w-2/6 mx-auto pt-8'>
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
        {organization.map((organization) => (
          <div key={organization.id} className='flex pb-4'>
            <div>
              <img
                className="h-12 w-12 rounded-full object-cover"

                alt="Profile"
              />
            </div>
            <div className='pl-2'>
              <h1 className=''>{organization.name}</h1>
              <p>{organization.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}