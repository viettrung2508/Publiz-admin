import { createFileRoute } from '@tanstack/react-router'
import {
  Plus,
} from "lucide-react"
import * as React from "react"
import { Drawer } from "vaul";
import { buildQueryOptions } from '@/lib/query'
import { getOrganization } from '@/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { CreateOrganizationForm } from '@/components/organization/CreateOrganizationForm';
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
        <Drawer.Root direction="right" >
          <Drawer.Trigger asChild>
            <button>
              <Plus />
            </button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/70" />
            <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-full w-[500px] mt-24 fixed bottom-0 right-0">
              <div className="p-4 text-white bg-zinc-900 border-0 flex-1 h-full">
                <div className="max-w-md mx-auto">
                  <Drawer.Title className="font-medium mb-4">
                    Create a new Organization
                  </Drawer.Title>
                  <CreateOrganizationForm />
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
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