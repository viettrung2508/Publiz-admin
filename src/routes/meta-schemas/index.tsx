import { createFileRoute } from '@tanstack/react-router'
import {
  Plus,
  ChevronDown,
  Dot,
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
import { Button } from '@/components/ui/button'
import { FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select } from '@radix-ui/react-select';
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { buildQueryOptions } from '@/lib/query';
import { MetaSchema, getMetaSchemas } from '@/api';
import { useSuspenseQuery } from '@tanstack/react-query';
export const Route = createFileRoute('/meta-schemas/')({
  component: MetaSchemas,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(buildQueryOptions(getMetaSchemas)),
})
type Checked = DropdownMenuCheckboxItemProps["checked"]

function MetaSchemas() {
  const {
    data: { data: metaSchema = [] },
  } = useSuspenseQuery(buildQueryOptions(getMetaSchemas));
  const [schemas, setSchemas] = useState<object[]>([]);

  const addSchema = () => {
    setSchemas([...schemas, {}]);
  };


  const groupByTarget = metaSchema.reduce<{ [key: string]: MetaSchema[] }>((targ, item) => {
    (targ[item.target] = targ[item.target] || []).push(item);
    return targ;
  }, {})
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  return (
    <div className='text-white w-2/6 mx-auto pt-8'>
      <div className='flex justify-between'>
        <h1>Meta Schemas</h1>
        <Drawer.Root direction="right" >
          <Drawer.Trigger asChild>
            <button>
              <Plus />
            </button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/70" />
            <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-full w-[600px] mt-24 fixed bottom-0 right-0">
              <div className="p-4 text-white bg-zinc-800 border  border-neutral-800 border-y-0 border-l-2 flex-1 h-full">
                <div className="max-w-lg mx-auto">
                  <Drawer.Title className="font-medium mb-4">
                    Create a new taxonomy
                  </Drawer.Title>
                  <form className="space-y-3">
                    <FormItem>
                      <Label>Name</Label>
                      <Input type="text" className="text-black" />
                    </FormItem>
                    <FormItem className="flex justify-between items-center">
                      <Label>Schema</Label>
                      <Plus onClick={addSchema} className="cursor-pointer" />
                    </FormItem>
                    {schemas.map((_, index) => (
                      <div key={index} className="grid grid-cols-12 space-y-3">
                        <div className="col-span-1 ">
                          <Dot />
                          <div className="h-1/2 border border-t-0 border-r-0 border-dashed border-[#979797]"></div>
                          <div className="h-1/2 border-0"></div>
                        </div>
                        <div className="flex flex-col col-span-11 p-4 bg-black rounded-lg">
                          <div className="flex justify-between">
                            <div>
                              <span className="">Type</span>
                              <Select>
                                <SelectTrigger className="bg-zinc-800 border-0 w-[130px] mt-1">
                                  <SelectValue placeholder="String" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <span>Name</span>
                              <Input className="bg-zinc-800 mt-1 border-0" />
                            </div>
                            <div className="flex flex-col">
                              <span className="">Required</span>
                              <Switch id="airplane-mode" className="bg-green-700 mt-1" />
                            </div>
                          </div>
                          <h1 className="text-zinc-800 my-2">Validation rules</h1>
                          <div className="flex justify-between">
                            <div>
                              <span>Min Length</span>
                              <Input className="bg-zinc-800 border-0 mt-1 text-white" defaultValue={0} />
                            </div>
                            <div>
                              <span className="">Max Length</span>
                              <Input className="bg-zinc-800 border-0 mt-1" defaultValue={"Default"} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button type="submit" className="w-full bg-[#FFCE31]">
                      Save
                    </Button>
                  </form>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>

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
      {Object.entries(groupByTarget).map(([target, metas]) => (
        <div key={target} className=''>
          <h1 className='uppercase text-xl pb-4'>{target}</h1>
          <div className='bg-gray-700 p-4 rounded-lg mb-6 '>
            {metas.map((meta) => (
              <div key={meta.id}>
                <div className='flex flex-col pb-4'>
                  <div>
                    <h1 className='pb-2'>{meta.name}</h1>
                    <p>Version: {meta.version} Type: System</p>
                  </div>
                </div>
              </div>
            ))}
            <p className='bg-yellow-400  rounded-2xl text-xs'>default</p>
          </div>
        </div>
      ))}


    </div>
  )
}