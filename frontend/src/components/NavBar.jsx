import {PlusIcon} from "lucide-react";
import {Link} from "react-router";

const NavBar = () => {
    return (
        <header
            className="bg-base-300 border-bborder-base-content/10">
            <div className="mx-auto max-w-6xl p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-primary font-mono tacking-tight">Your Notes</h1>
                    <div className="flex items-center gap-4">
                        <Link to="/create" className="btn btn-primary">
                            <PlusIcon/> New Note
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavBar;