import {PenSquareIcon, Trash2Icon} from "lucide-react";
import {Link} from "react-router"; // ✅ Correct import for web projects
import {formateDate} from "../lib/utils.js"; // (Make sure this path matches your file structure)
import axios from "axios";
import toast from "react-hot-toast";
import notesPreview from "../pages/NotePreviewPage";

const NoteCard = ({note, setNotes}) => {

    const handleDelete = async (e) => {
        e.preventDefault(); // Stop the link from navigating
        const noteId = note._id; // ✅ CRITICAL: Use _id for MongoDB

        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await axios.delete(`http://localhost:5001/api/notes/${noteId}`);

            // Update UI instantly by filtering out the deleted note
            setNotes((prevNotes) => prevNotes.filter((n) => n._id !== noteId));

            toast.success("Note Deleted Successfully");
        } catch (error) {
            console.log("Error in handleDelete", error);
            toast.error("Failed to delete note");
        }
    }

    return (<div
            className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-primary">
            <div className="card-body p-5">

                {/* Title: Clickable to go to details */}
                <Link
                    to={`/note/${note._id}`} // ✅ Use _id here
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
                        {/* Ensure your formateDate function handles the date string correctly */}
                        {note.createdAt ? formateDate(note.createdAt) : "No Date"}
                    </span>

                    <div className="flex items-center gap-2">
                        {/* Edit Button */}
                        <Link
                            to={`/note/${note._id}`} // ✅ Use _id here
                            className="btn btn-ghost btn-xs btn-square tooltip tooltip-bottom"
                            data-tip="Edit"
                            onClick={notesPreview}
                        >
                            <PenSquareIcon className="size-4 text-base-content/70"/>
                        </Link>

                        {/* Delete Button */}
                        <button
                            className="btn btn-ghost btn-xs btn-square text-error tooltip tooltip-bottom"
                            data-tip="Delete"
                            onClick={handleDelete} // Clean function call
                        >
                            <Trash2Icon className="size-4"/>
                        </button>
                    </div>
                </div>

            </div>
        </div>);
};

export default NoteCard;