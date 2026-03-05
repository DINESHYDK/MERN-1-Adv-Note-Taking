import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router";
import {ArrowLeftIcon, LoaderIcon, PenSquareIcon, Trash2Icon} from "lucide-react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import {formateDate} from "../lib/utils.js";
import ConfirmModal from "../components/ConfirmModal.jsx";


const NotePreviewPage = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // This state controls the modal visibility (true = show, false = hide)
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const navigate = useNavigate();

    const {id} = useParams();

    // Step 1: When user clicks "Delete Note" button, just SHOW the modal (don't delete yet)
    const openDeleteModal = () => {
        setShowDeleteModal(true);
    };

    // Step 2: When user clicks "Confirm" inside the modal, NOW actually delete
    const confirmDelete = async () => {
        try {
            await api.delete(`/${note._id}`);
            toast.success("Note Deleted Successfully");
            setShowDeleteModal(false); // Close the modal
            navigate("/");
        } catch (error) {
            console.log("Error in handleDelete", error);
            toast.error("Failed to delete note");
        }
    };

    const handleUpdate = async () => {
        if (!title.trim() || !content.trim()) {
            toast.error("All fields are required");
            return;
        }

        setSaving(true);
        try {
            await api.put(`/${note._id}`, {
                title,
                content,
            });
            setNote({...note, title, content});
            setIsEditing(false);
            toast.success("Note Updated Successfully");
        } catch (error) {
            console.log("Error in handleUpdate", error);
            toast.error("Failed to update note");
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/${id}`);
                const data = res.data;
                setNote(data);
                setTitle(data.title);
                setContent(data.content);
            } catch (error) {
                console.log("Error in fetching note:", error.message);
                toast.error("Error in Loading note");
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center bg-base-200">
            <LoaderIcon className="animate-spin size-10"/>
            Loading...
        </div>
    );

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="h-5 w-5"/>
                            Back to Notes
                        </Link>
                        <div className="flex items-center gap-2">
                            <button onClick={() => {
                                setIsEditing(!isEditing);
                                setTitle(note.title);
                                setContent(note.content);
                            }} className="btn btn-primary btn-outline">
                                <PenSquareIcon className="h-5 w-5"/>
                                {isEditing ? "Cancel" : "Edit Note"}
                            </button>
                            {/* onClick just opens the modal — doesn't delete yet */}
                            <button onClick={openDeleteModal} className="btn btn-error btn-outline">
                                <Trash2Icon className="h-5 w-5"/>
                                Delete Note
                            </button>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body">
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full text-2xl font-bold mb-4"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Note Title"
                                    />
                                    <textarea
                                        className="textarea textarea-bordered w-full h-40"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Note Content"
                                    />
                                    <div className="card-actions justify-end mt-4">
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleUpdate}
                                            disabled={saving}
                                        >
                                            {saving ? "Saving..." : "Save Changes"}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className="card-title text-2xl font-bold">{note.title}</h2>
                                    <p className="text-base-content/70 mt-4 whitespace-pre-wrap">{note.content}</p>
                                    <div className="mt-4 text-xs text-base-content/50">
                                        {note.createdAt ? formateDate(note.createdAt) : "No Date"}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/*
              ConfirmModal — Our custom centered modal (replaces ugly window.confirm)

              Props we're passing:
                isOpen    = showDeleteModal   → true = show modal, false = hide it
                title     = "Delete Note"     → heading text at the top of the modal
                message   = "Are you sure..." → body text asking user to confirm
                onConfirm = confirmDelete     → function called when user clicks "Confirm"
                onCancel  = () => setShowDeleteModal(false) → closes the modal on "Cancel"
            */}
            <ConfirmModal
                isOpen={showDeleteModal}
                title="Delete Note"
                message="Are you sure you want to delete this note? This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            />

        </div>
    );
};

export default NotePreviewPage;