import {Link} from "react-router"; // Standard import for web apps
import {PenSquareIcon, Trash2Icon} from "lucide-react";
import {formateDate} from "../lib/utils.js";

const NoteCard = ({note}) => {
    return (
        <div
            className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-primary">
            <div className="card-body p-5">
                {/* Title: Clickable to go to details */}
                <Link
                    to={`/note/${note.id}`}
                    className="card-title text-lg font-bold text-base-content hover:text-primary transition-colors"
                >
                    {note.title}
                </Link>

                {/* Content: Subtle text opacity */}
                <p className="text-base-content/70 text-sm mt-2 line-clamp-3">
                    {note.content}
                </p>

                {/* Footer: Date & Actions */}
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-xs font-medium text-base-content/50">
                        {formateDate(new Date(note.createdAt))}
                    </span>

                    <div className="flex items-center gap-2">
                        {/* Edit Button */}
                        <Link
                            to={`/note/${note.id}`}
                            className="btn btn-ghost btn-xs btn-square tooltip tooltip-bottom"
                            data-tip="Edit"
                        >
                            <PenSquareIcon className="size-4 text-base-content/70"/>
                        </Link>

                        {/* Delete Button - Uses 'text-error' for semantic red */}
                        <button
                            className="btn btn-ghost btn-xs btn-square text-error tooltip tooltip-bottom"
                            data-tip="Delete"
                        >
                            <Trash2Icon className="size-4"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;