import React, { useState } from 'react'
import { Note, Tag } from '../../type'
import { Stack, Button, Form, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import Card from '../../components/Form/Card';

type Props = {
  availableTags: Tag[];
  notes: Note[]
}

const Main = ({ availableTags, notes }: Props) => {

  const [title, setTitle] = useState<String>("")
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  // filter by tittle and tags

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(title.toLowerCase()) && 
    selectedTags.every(s_tag => 
      note.tags.some(noteTag => noteTag.value === s_tag.value)
    )
  );


  return (
    <div className='container py-5'>

      {/*upside*/}
      <Stack direction="horizontal"
        className="justify-content-between">
        <h1>Notes</h1>

        <Link to={"/new"}>
          <Button>Create</Button>
        </Link>
      </Stack>

      {/*bottom*/}

      <Form className='mt-4'>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Search By Title</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                className='shadow' />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Search By Tag</Form.Label>
              <ReactSelect
                onChange={(tags) => setSelectedTags(tags as Tag[])}
                options={availableTags}
                className='text-black'
                isMulti
              />

            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/*notes*/}

      <Row xs={1} sm={2} lg={3} xl={4} className='g-3 mt-4'>
        {filteredNotes.map((note) => (
          <Col>
            <Card note={note} key={note.id} /></Col>
        ))}
      </Row>

    </div>
  )
}

export default Main 