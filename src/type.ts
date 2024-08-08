// note types
export type NoteData = {
    title: string;
    tags: Tag[];
    markdown: string;
}
// Type of note to be saved in state

export type Note ={
    id:string;
} & NoteData

export type Tag = {
    label: string;
    value: string;
}
