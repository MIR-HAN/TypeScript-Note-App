import React from 'react'
import Form from '../../components/Form'
import { NoteData,Tag } from '../../type';

export type CreateProps ={
  handleSubmit:(noteData:NoteData)=> void;
  createTag: (tag:Tag)=>void;
  availableTags:Tag[];
}& Partial<NoteData>

const Create = ({handleSubmit, createTag, availableTags}:CreateProps) => {
  return (

    <div className='container mt-5'>
      <h1>Create New Note</h1>

      <Form handleSubmit={handleSubmit} createTag={createTag} availableTags={availableTags} />
    </div>

  )
}

export default Create