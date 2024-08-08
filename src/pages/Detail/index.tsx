import React from 'react'
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import { Link, useOutletContext } from 'react-router-dom';
import { Note } from '../../type';
import ReactMarkDown from "react-markdown";

type Props={
  deleteNote: (id:string)=>void;
}

const Detail = ({deleteNote}:Props) => {

  const note: Note = useOutletContext();

  return (
    <div className='container py-5'>
      <Row>
        <Col>
          <h1 className='fs-2'>{note.title}</h1>

          <Stack direction='horizontal' gap={3} className='flex-wrap'>
            {note.tags.map((tag) => (
              <Badge>{tag.label}</Badge>
            ))}
          </Stack>
        </Col>

        <Col>
          <Stack direction='horizontal' gap={3}>
            <Link to="edit">
            <Button>Edit</Button>
            </Link>
            <Button
            onClick={()=> deleteNote(note.id)}
            variant='danger'>Delete</Button>
            <Link to="/">
            <Button variant='secondary'>Back</Button>
            </Link>
        
          </Stack>

        </Col>
      </Row>
{/*markdown*/}
<ReactMarkDown className="my-5">{note.markdown}</ReactMarkDown>

    </div>
  )
}

export default Detail