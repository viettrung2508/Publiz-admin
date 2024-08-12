import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { createFileRoute } from '@tanstack/react-router'

const PostDetails: React.FunctionComponent = () => {


    return (
        <div className='max-w-screen-2xl mx-auto '>
            <div className='grid grid-cols-12 space-x-6 text-white pt-12'>
                <div className='col-span-9 bg-zinc-900 rounded-lg'>
                    <h1 className='pb-4'>Main differences between Intel and AMD chips</h1>
                    <div>When it comes to the battle of CPUs, there is no fiercer competition than Intel vs AMD. In fact, aside from these two companies, there is virtually no other processor that comes close to competing in the processor ring.</div>
                </div>
                <div className='col-span-3'>
                    <Button className='w-full bg-[#FFCE31] text-black mb-3'>Save</Button>
                    <h1>Excerpt</h1>
                    <div className='my-2 p-2 bg-zinc-900 rounded-md'>The battle of CPUs, there is no fiercer competition than Intel vs AMD. In fact, aside from these two companies</div>
                    <h1 className='mb-2'>Tagging</h1>
                    <h2 className='uppercase mb-2'>Community</h2>
                    <div className="flex items-center space-x-2 bg-zinc-800 rounded-md">
                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Accept terms and conditions
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Route = createFileRoute('/posts/$id')({
    component: PostDetails,

})