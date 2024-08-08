import React from 'react'
import { Note } from '../../../type'
import { Stack, Card, Badge } from 'react-bootstrap';
import styles from "./card.module.css"
import { useNavigate } from 'react-router-dom';
type Props = {
  note: Note;
}


const NoteCard = ({ note }: Props) => {

  const navigate = useNavigate();

  return (
    <Card onClick={()=> navigate(`/note/${note.id}`)} className={styles.note_card}>
      <Card.Body>
        <Stack className='align-items-center justify-content-between'>
          <span className='fw-bold'>{note.title}</span>

          <Stack 
          direction="horizontal" 
          className='justify-content-center'
          gap={2}>
            {note?.tags?.map((tag) => (
              <Badge>{tag.label}</Badge>
            ))}
          </Stack>
        </Stack>

      </Card.Body>

    </Card>
  )
}

export default NoteCard