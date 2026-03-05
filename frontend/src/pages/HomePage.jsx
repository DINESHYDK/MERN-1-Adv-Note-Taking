import NavBar from "../components/NavBar";
import {useEffect, useState} from "react";
import RateLimitUI from "../components/RateLimitUI.jsx";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import api from "../lib/axios"; // Changed from 'import axios from "axios"'
import NotesNotFound from "../components/NotesNotFound.jsx";

const HomePage = () => {
    const [isRateLimit, setIsRateLimit] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getNotes = async () => {
            try {
                const res = await api.get("/");
                console.log(res.data);
                setNotes(res.data);
                setIsRateLimit(false);
            } catch (error) {
                console.log("Error in fetching notes:", error.message);
                if (error.response?.status === 429) {
                    setIsRateLimit(true);
                } else {
                    toast.error("Error in Loading notes");
                }
            } finally {
                setLoading(false);
            }
        };

        getNotes();
    }, []);

    return (
        <div className="min-h-screen">
            <NavBar/>

            {isRateLimit && <RateLimitUI/>}

            <div className={"max-w-7xl mx-auto p-4 mt-6"}>
                {loading &&
                    <div className={"text-center text-primary py-10"}>Loading...</div>}
                {notes.length > 0 && !isRateLimit &&
                    (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                        ))
                        }
                    </div>)}

                {notes.length === 0 && !loading && !isRateLimit && (
                    <NotesNotFound/>
                )}

            </div>
        </div>
    )
}

export default HomePage;
