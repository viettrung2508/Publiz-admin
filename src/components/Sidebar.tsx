
import UserItem from "./UserItem"
import {
    Computer,
    Files,
    SwatchBook,
    ListTree,
    Newspaper,
    Tags,
    Building2,
    SmilePlus,
    Users,
} from "lucide-react"


export default function Sidebar() {
    return <div className=" h-screen flex justify-between flex-col bg-black text-white">
        <div className="ml-4 pt-4">
            <div className="flex pb-4">
                <Computer className="mr-2"/>
                <span>Dashboard</span>
            </div>
            <div className="flex pb-4">
                <ListTree className="mr-2"/>
                <span>Taxonomies</span>
            </div>
            <div className="flex pb-4">
                <SwatchBook className="mr-2"/>
                <span>Meta Schema</span>
            </div>
            <div className="flex pb-4">
                <SmilePlus className="mr-2"/>
                <span>Reaction Packs</span>
            </div>
            <div className="flex pb-4">
                <Newspaper className="mr-2"/>
                <span>Posts</span>
            </div>
            <div className="flex pb-4">
                <Tags className="mr-2"/>
                <span>Tags</span>
            </div>
            <div className="flex pb-4">
                <Building2 className="mr-2"/>
                <span>Organizations</span>
            </div>
            <div className="flex pb-4">
                <Users className="mr-2"/>
                <span>Users</span>
            </div>
            <div className="flex pb-4">
                <Files className="mr-2"/>
                <span>Files</span>
            </div>
        </div>
        <div>
            <UserItem />
        </div>
    </div>
}