import { BrowserRouter, Route, Routes } from "react-router-dom"
import Create from "./pages/Create"
import Detail from "./pages/Detail"
import Edit from "./pages/Edit"
import Main from "./pages/Main"
import { useLocalStorage } from "@uidotdev/usehooks"
import { Note, NoteData, Tag } from "./type"
import { v4 } from "uuid"
import Layout from "./components/Layout"

const App = () => {

  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  // create tag
  const createTag = (tag:Tag): void =>{
    setTags((prev)=> [...prev, tag])
  }

// create new tag
const createNote = (noteData:NoteData):void => {
// add id to data which comes from the form
const newNote:Note = {
  id:v4(),
  ...noteData
} 
// add new note to state
setNotes(prev => [...prev, newNote])
}
// delete note
const deleteNote = (id:string)=> {
  setNotes((prev)=> prev.filter((n)=> n.id!== id))
}
// update
const updateNote=(id:string, updateData: NoteData)=>{

 const updated= notes.map((note)=> {
    if(note.id === id){
      return {id, ...updateData}
    }else{
      return note;
    }
  })

  // update state
  setNotes(updated)

}

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main notes={notes} availableTags={tags}/>} />
        <Route path={"/new"} element={
        <Create 
        handleSubmit={createNote} 
        createTag={createTag} 
        availableTags={tags} />} />

        <Route path={"/note/:id"} element={<Layout notes={notes}/>}>
          <Route index element={<Detail deleteNote={deleteNote}/>} />
          <Route path="edit" element={
          <Edit 
          handleSubmit={updateNote} 
          createTag={createTag}
          availableTags={tags} />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App