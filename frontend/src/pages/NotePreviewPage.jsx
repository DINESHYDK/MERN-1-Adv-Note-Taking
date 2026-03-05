import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router";
import {ArrowLeftIcon, LoaderIcon, Trash2Icon} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";


const NotePreviewPage = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const {id} = useParams();

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


    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await fetch(`http://localhost:5001/api/notes/${id}`);
                const data = await res.json();
                setNote(data);
            } catch (error) {
                console.log("Error in fetching note:", error.message);
                toast.error("Error in Loading note");
            } finally {
                setLoading(false);
            }
        }

        fetchNote();
    }, []);

    console.log({note});

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center bg-base-200">
            <LoaderIcon className="animate-spin size=10"/>
            Loading...
        </div>
    )
    return (
        <div className="min-h-screen bg-base-200">
            <div className="auto mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="h-5 w-5"/>
                            Back to Notes</Link>
                        <button onClick={handleDelete} className="btn btn-error btn-outline">
                            <Trash2Icon className="h-5 w-5"/>
                            Delete Note
                        </button>
                    </div>
                    <div className="card bg-base-100 shadow-md">
                    // Write the card content here
                    </div>
                </div>
            </div>
        </div>
    )

}

export default NotePreviewPage;