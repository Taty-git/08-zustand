import css from './NoteList.module.css';
import type {Note} from '../../types/note';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteNote} from '../../lib/api';
import Link from 'next/link';

interface NoteListProps {
    notes: Note[];
}
export default function NoteList({notes}: NoteListProps) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (id: number) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notes']});
        },
    });
    const handleDelete = (id: number) => {
        mutation.mutate(id)
    };
    return (
        <ul className={css.list}>
	        {notes.map(({title, content, tag, id}) => (
                <li className={css.listItem} key={id}>
                    <h2 className={css.title}>{title}
                        <Link href={`/notes/${id}`}>{title}</Link>
                    </h2>
                        <p className={css.content}>{content}</p>
                        <div className={css.footer}>
                            <span className={css.tag}>{tag}</span>
                                
                            <button onClick={() => handleDelete(id)} 
                                    className={css.button} 
                                    disabled={mutation.isPending}>Delete
                            </button>
                            
                        </div>
                </li>
            ))}
        </ul>
    )
}