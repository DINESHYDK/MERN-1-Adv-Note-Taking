import {PenSquareIcon, Trash2Icon} from "lucide-react";
import {Link} from "react-router";
import {formateDate} from "../lib/utils.js";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import {useState} from "react";
import ConfirmModal from "./ConfirmModal.jsx";

const NoteCard = ({note, setNotes}) => {

    // State to control the delete confirmation modal (true = show, false = hide)
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Step 1: Open the modal when delete icon is clicked (don't delete yet)
    const openDeleteModal = (e) => {
        e.preventDefault(); // Stop the Link from navigating
        setShowDeleteModal(true);
    };

    // Step 2: Actually delete when user clicks "Confirm" in the modal
    const confirmDelete = async () => {
        const noteId = note._id;
        try {
            await api.delete(`/${noteId}`);

            // Update UI instantly by filtering out the deleted note
            setNotes((prevNotes) => prevNotes.filter((n) => n._id !== noteId));

            toast.success("Note Deleted Successfully");
        } catch (error) {
            console.log("Error in handleDelete", error);
            toast.error("Failed to delete note");
        } finally {
            setShowDeleteModal(false); // Close modal either way
        }
    };

    return (<>
        <div
            className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-primary">
            <div className="card-body p-5">

                {/* Title: Clickable to go to details */}
                <Link
                    to={`/note/${note._id}`}
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
                        {note.createdAt ? formateDate(note.createdAt) : "No Date"}
                    </span>

                    <div className="flex items-center gap-2">
                        {/* Edit Button — navigates to the note preview/edit page */}
                        <Link
                            to={`/note/${note._id}`}
                            className="btn btn-ghost btn-xs btn-square tooltip tooltip-bottom"
                            data-tip="Edit"
                        >
                            <PenSquareIcon className="size-4 text-base-content/70"/>
                        </Link>

                        {/* Delete Button — opens the confirmation modal */}
                        <button
                            className="btn btn-ghost btn-xs btn-square text-error tooltip tooltip-bottom"
                            data-tip="Delete"
                            onClick={openDeleteModal}
                        >
                            <Trash2Icon className="size-4"/>
                        </button>
                    </div>
                </div>

            </div>
        </div>

        {/* Confirmation modal for delete — same reusable ConfirmModal component */}
        <ConfirmModal
            isOpen={showDeleteModal}
            title="Delete Note"
            message="Are you sure you want to delete this note? This action cannot be undone."
            onConfirm={confirmDelete}
            onCancel={() => setShowDeleteModal(false)}
        />
    </>);
};

export default NoteCard;