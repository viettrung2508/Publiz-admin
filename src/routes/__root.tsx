import { EntryPoint } from '@/components/EntryPoint'
import { createRootRouteWithContext } from '@tanstack/react-router'

export const Route = createRootRouteWithContext()({
    component: EntryPoint
})
