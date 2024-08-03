import { createFileRoute } from '@tanstack/react-router'
import {
  Plus,
} from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export const Route = createFileRoute('/reaction-pack/')({
  component: ReactionPack
})
function ReactionPack() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className='text-white w-2/6 mx-auto pt-8'>
      <div className='flex justify-between'>
        <h1>Organizations</h1>
        <Drawer.Root direction="right">
          <Drawer.Trigger asChild>
            <button>
              <Plus />
            </button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/70" />
            <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0">
              <div className="p-4 flex-1 h-full text-white bg-zinc-900">
                <div className="max-w-md mx-auto">
                  <Drawer.Title className="font-medium mb-4">
                    Create a new reaction pack
                  </Drawer.Title>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input  {...field} className=' bg-zinc-800 border-0' />
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
                              <Textarea  {...field} className='bg-zinc-800 border-0' />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button className='w-full bg-[#FFCE31]' type="submit">Save</Button>
                    </form>
                  </Form>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>

      </div>

      <div className='bg-gray-600 p-4 rounded-lg mt-4'>
        <div className='bg-gray-600 p-4 rounded-lg'>
          <div className='flex justify-between pb-4'>
            <div>
              <h1 className='pb-2'>Content Moderation</h1>
              <p>A pack of content moderation reactions</p>
            </div>
            <div>
              <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>content-moderation</p>
            </div>
          </div>
          <div className='flex justify-between pb-4'>
            <div>
              <h1 className='pb-2'>Post Reaction</h1>
              <p>Standard post reaction</p>
            </div>
            <div>
              <p className='bg-yellow-400 p-1 rounded-2xl text-xs'>story</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}