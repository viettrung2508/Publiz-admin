
import { Link } from "@tanstack/react-router"
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
            <Link to='/'>
                <div className="flex pb-4">
                    <Computer className="mr-2" />
                    <span>Dashboard</span>
                </div>
            </Link>
            <Link to='/taxonomies'>
                <div className="flex pb-4">
                    <ListTree className="mr-2" />
                    <span>Taxonomies</span>
                </div>
            </Link>
            <Link to="/meta-schemas">
                <div className="flex pb-4">
                    <SwatchBook className="mr-2" />
                    <span>Meta Schema</span>
                </div>
            </Link>
            <Link to="/reaction-pack">
                <div className="flex pb-4">
                    <SmilePlus className="mr-2" />
                    <span>Reaction Packs</span>
                </div>
            </Link>
            <Link to='/post'>
                <div className="flex pb-4">
                    <Newspaper className="mr-2" />
                    <span>Posts</span>
                </div>
            </Link>
            <Link to='/tags'>
                <div className="flex pb-4">
                    <Tags className="mr-2" />
                    <span>Tags</span>
                </div>
            </Link>
            <Link to='/organizations'>
                <div className="flex pb-4">
                    <Building2 className="mr-2" />
                    <span>Organizations</span>
                </div>
            </Link>
            <Link to='/users'>
                <div className="flex pb-4">
                    <Users className="mr-2" />
                    <span>Users</span>
                </div>
            </Link>
            <Link to='/files'>
                <div className="flex pb-4">
                    <Files className="mr-2" />
                    <span>Files</span>
                </div>
            </Link>
        </div>
        <div>
            <UserItem />
        </div>
    </div>
}