import React, { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, FormGroup, FormLabel, Row, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ReactSelect from 'react-select/creatable'
import { v4 } from "uuid"
import { Tag } from '../../type'
import { CreateProps } from '../../pages/Create'
import styles from "./form.module.css"


const CustomForm = ({
  handleSubmit,
  createTag,
  availableTags,
  markdown="",
  title="",
  tags=[],
}: CreateProps) => {

  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);


  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    //saves new note to locale
    const data = ({
      title: titleRef.current?.value as string,
      markdown: markDownRef.current?.value as string,
      tags: selectedTags,
    })
    handleSubmit(data)

    // navigate to mainpage

    navigate("/")

  };

  return (
    <Form onSubmit={handleSend} className='mt-4'>
      <Stack>
        {/*Title*/}
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control defaultValue={title} ref={titleRef} className='shadow' required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label >Labels</Form.Label>
              <ReactSelect
                // create tag
                onCreateOption={(text) => {
                  //create an tags object
                  const newTag: Tag = {
                    label: text,
                    value: v4()
                  }
                  // save the tag to the local
                  createTag(newTag)
                  //add to state
                  setSelectedTags([...selectedTags, newTag])
                }}
                // show tags ont he select area
                value={selectedTags}
                // show prev tags ont he select area
                options={availableTags}
                // remove tags
                onChange={(all_tags) => setSelectedTags(all_tags as Tag[])}
                className='text-black shadow' isMulti={true} />
            </Form.Group>
          </Col>
        </Row>

        {/*Content*/}

        <FormGroup className='mt-4'>
          <Form.Label> Content ( supports markdown syntax)</Form.Label>
          <Form.Control
          defaultValue={markdown}
            ref={markDownRef}
            as="textarea" className='shadow'
            style={{
              minHeight: "300px",
              maxHeight: "500px"
            }} />
        </FormGroup>

        {/*Buttons*/}

        <Stack direction="horizontal" className='mt-5 justify-content-end gap-4'>
          <Button type='submit'>Save</Button>
          {/*navigate prev page*/}
          <Button onClick={() => navigate(-1)} type="button" variant='secondary'>Back</Button>
        </Stack>

      </Stack>
    </Form>

  )
}

export default CustomForm