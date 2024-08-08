import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { Note, NoteData,Tag } from '../../type';
import Form from "../../components/Form"
type Props={
  handleSubmit: (id:string, updateData:NoteData)=> void;
  createTag:(tag:Tag) => void;
  availableTags:Tag[]
}

const Edit = ({handleSubmit,createTag,availableTags}:Props) => {

  const note:Note = useOutletContext();

  return (
    <div className='container py-5'>
      <h2>Edit Note</h2>

      <Form
       handleSubmit={(updatedData)=> handleSubmit(note.id, updatedData)} 
       createTag={createTag}
       availableTags={availableTags}
       markdown={note.markdown}
       title={note.title}
       tags={note.tags}/>
    </div>
  )
}

export default Edit