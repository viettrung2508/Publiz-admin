import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tags/')({
    component: () => <div>tags!</div>
})