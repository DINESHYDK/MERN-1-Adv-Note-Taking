import {Route, Routes} from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NotePreviewPage from "./pages/NotePreviewPage";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/create" element={<CreatePage/>}/>
                <Route path="/note/:id" element={<NotePreviewPage/>}/>
            </Routes>
        </div>
    )
}

export default App;