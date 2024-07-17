import { useQuery } from '@tanstack/react-query'
import { createQueryOptions } from '@/api/createQueryOptions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/jokes')({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(createQueryOptions())
  },
  component: Jokes,
})

function Jokes() {
  const { data: joke } = useQuery(createQueryOptions())

  if (!joke) return <div>Loading.....</div>
  console.log(joke.setup)
  return (
    <div>
      <h1>jokes</h1>
      <p className='text-red-500'>{joke.setup}</p>
      <p className='text-red-500'>{joke.punchline}</p>
    </div>
  )
}