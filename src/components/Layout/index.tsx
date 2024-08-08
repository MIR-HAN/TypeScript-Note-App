import React from 'react'
import { Outlet,Navigate, useParams } from 'react-router-dom'
import { Note } from '../../type'
type Prop = {
    notes: Note[]
}

const Layout = ({ notes }: Prop) => {
    //get parametes from url
    const { id } = useParams();
    // Match note id
    const found = notes.find((n) => n.id == id)
    // if not found
    if (!found) return <Navigate to={"/"} replace/>;

    return (
        <Outlet context={found}/>
    )
}

export default Layout