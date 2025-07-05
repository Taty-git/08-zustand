'use client';

import css from './NoteDetails.module.css';
import {useQuery} from '@tanstack/react-query';
import {useParams} from 'next/navigation';
import {fetchNoteById} from '../../../lib/api';

const NoteDetailsClient = () => {
    const {id} = useParams<{id: string}>();
    const noteId = Number(id);

    const {data: note, isLoading, error} = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(noteId),
        refetchOnMount: false,
    });

    if (isLoading)
        return
    <p className="loader">Loading, please wait...</p>;
    
    if (error || !note)
        return
    <p className="error">Something went wrong.</p>;
    
    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{note.title}</h2>
                    <button className={css.editBtn}>Edit note</button>
                </div>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>{note.createdAt}</p>
            </div>
        </div>
    );
};
export default NoteDetailsClient;