import { EntryPoint } from '@/components/EntryPoint'
import { AuthContextState } from '@/contexts/AuthContext';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router'

export const Route = createRootRouteWithContext<{
    auth: AuthContextState;
    queryClient: QueryClient;
}>()({
    component: EntryPoint,
});
