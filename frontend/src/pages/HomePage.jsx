import NavBar from "../components/NavBar";
import {useEffect, useState} from "react";
import RateLimitUI from "../components/RateLimitUI.jsx";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import axios from "axios";

const HomePage = () => {
    const [isRateLimit, setIsRateLimit] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getNotes = async () => {
            try {
                const res = await axios.get("http://localhost:5001/api/notes/");
                console.log(res.data);
                setNotes(res.data);
                setIsRateLimit(false);
                // setNotes(data);
                // setLoading(false);
                //     We have the CORS (Cross-Origin Resource Sharing) error here.
                //     This means that the frontend and backend are not on the same origin.
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
        // Without calling this function, it will be impossible to run the code
    }, []);
    // dependency array was empty means that the useEffect function runs for only once..
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
                            <NoteCard key={note.id} note={note}/>
                        ))
                        }
                    </div>)}

            </div>
        </div>
    )
}

export default HomePage;