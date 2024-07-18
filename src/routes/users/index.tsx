import { createFileRoute } from "@tanstack/react-router";

const Users: React.FunctionComponent = () => {
    return <div className="text-white">Users</div>;
};

export const Route = createFileRoute('/users/')({
    component: Users,
})
