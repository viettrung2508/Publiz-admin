
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
        <div className="ml-6 pt-4">
            <img src="Logo.png"  className="mb-4"/>
            <Link to='/'>
                <div className="flex py-4">
                    <Computer className="mr-2" />
                    <span>Dashboard</span>
                </div>
            </Link>
            <Link to='/taxonomies'>
                <div className="flex py-3">
                    <ListTree className="mr-2" />
                    <span>Taxonomies</span>
                </div>
            </Link>
            <Link to="/meta-schemas">
                <div className="flex py-3">
                    <SwatchBook className="mr-2" />
                    <span>Meta Schema</span>
                </div>
            </Link>
            <Link to="/reaction-pack">
                <div className="flex py-3">
                    <SmilePlus className="mr-2" />
                    <span>Reaction Packs</span>
                </div>
            </Link>
            <Link to='/posts'>
                <div className="flex py-3">
                    <Newspaper className="mr-2" />
                    <span>Posts</span>
                </div>
            </Link>
            <Link to='/tags'>
                <div className="flex py-3">
                    <Tags className="mr-2" />
                    <span>Tags</span>
                </div>
            </Link>
            <Link to='/organizations'>
                <div className="flex py-3">
                    <Building2 className="mr-2" />
                    <span>Organizations</span>
                </div>
            </Link>
            <Link to='/users'>
                <div className="flex py-3">
                    <Users className="mr-2" />
                    <span>Users</span>
                </div>
            </Link>
            <Link to='/files'>
                <div className="flex py-3">
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