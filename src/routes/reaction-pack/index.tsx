import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reaction-pack/')({
  component: () => <div>Hello /reaction pack/!</div>
})