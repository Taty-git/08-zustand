'use client';
import css from './NoteDetails.module.css';
import {useRouter} from 'next/navigation';
import {useQuery} from '@tanstack/react-query';
import {useParams} from 'next/navigation';
import {fetchNoteById} from "../../../../lib/api";

import Modal from '../../../../components/Modal/Modal';

const NotePreview = () => {
    const router = useRouter();
    const close = () => router.back();

    const {id} = useParams<{id: string}>();
    const noteId = Number(id);

    const {
        data: note,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["note", id],
         queryFn: () => fetchNoteById(noteId),
        refetchOnMount: false,
    });

  if (isLoading) return <p className="loader">Loading, please wait...</p>;
  if (error || !note) return <p className="error">Something went wrong.</p>;

  return (
    <Modal onClose={close}>
        <div className={css.container}>
            <h2 className={css.header}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
            <p className={css.tag}>{note.tag}</p>
        
        </div>
       
    </Modal>
  );
};

export default NotePreview;