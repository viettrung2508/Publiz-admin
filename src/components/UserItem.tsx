import { getMyProfile } from "@/api";
import { buildQueryOptions } from "@/lib/query";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function UserItem() {
    const { data: { data: profile = [] } } = useSuspenseQuery(buildQueryOptions(getMyProfile));
    if (!Array.isArray(profile)) {
        return <div>
            <div className="flex items-center ml-4 mb-2">
                <div className="rounded-full h-12 w-12 overflow-hidden">
                    <img
                        className="h-full w-full object-cover"
                        src="defaultAvatar.jpg"
                        alt="Profile"
                    />
                </div>
                <p className="ml-4">UserName</p>
            </div>
        </div>;
    }
    return (
        <div>
            {profile.map(profile => (
                <div key={profile.id} className="flex items-center ml-4 mb-2">
                    <div className="rounded-full h-12 w-12 overflow-hidden">
                        <img
                            className="h-full w-full object-cover"
                            src={profile.avatarUrl}
                            alt="Profile Logo"
                        />
                    </div>
                    <p className="ml-4">{profile.displayName}</p>
                </div>
            ))}
        </div>
    );
}