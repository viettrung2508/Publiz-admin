import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/organizations/')({
  component: () => <div>Hello /organizations/!</div>
})