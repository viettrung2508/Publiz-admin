import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/files/')({
  component: () => <div>Hello /files/!</div>
})