import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router";
import {ArrowLeftIcon, LoaderIcon, PenSquareIcon, Trash2Icon} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import {formateDate} from "../lib/utils.js";


const NotePreviewPage = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const {id} = useParams();

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await axios.delete(`http://localhost:5001/api/notes/${note._id}`);
            toast.success("Note Deleted Successfully");
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
            await axios.put(`http://localhost:5001/api/notes/${note._id}`, {
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
                const res = await fetch(`http://localhost:5001/api/notes/${id}`);
                const data = await res.json();
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
                            <button onClick={handleDelete} className="btn btn-error btn-outline">
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
        </div>
    );
};

export default NotePreviewPage;