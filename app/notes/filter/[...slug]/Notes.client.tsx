'use client';

import css from './NotesPage.module.css';
import {useState} from 'react';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {useDebounce} from 'use-debounce';
import NoteList from '../../../../components/NoteList/NoteList';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import {Note} from '../../../../types/note';
import {fetchNotes} from '../../../../lib/api';
import Pagination from '../../../../components/Pagination/Pagination';
import Link from 'next/link';


type NotesHttpResponse = {
    notes: Note[];
    totalPages: number;
  };
  
  type Props = {
    initialValue: NotesHttpResponse;
    tag: string;
  };
  
  const NotesClient = ({ initialValue, tag }: Props) => {
    
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>("");
    const [debouncedQuery] = useDebounce(query, 400);
  
    const {data} = useQuery<NotesHttpResponse>({
      queryKey: ["notes", debouncedQuery, page, tag],
      queryFn: () => fetchNotes(debouncedQuery, page, tag),
      placeholderData: keepPreviousData,
      initialData: initialValue,
    });
  
    const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      setPage(1);
    };
  
    return (
      <>
        <div className={css.toolbar}>
          <SearchBox query={query} updateQuery={updateQuery} />
          {data.totalPages && data.totalPages > 1 ? (
            <Pagination
              totalPages={data.totalPages}
              page={page}
              onPageChange={setPage}
            />
          ) : (
            ""
          )}
          <Link className={css.button} href="/notes/action/create">Create note +</Link>
        </div>
        {data.notes.length >= 1 ? (
          <NoteList notes={data.notes} />
        ) : (
          <p className="error">Oops... We don`t have any entries for you.</p>
        )}
      </>
    );
  };
  
  export default NotesClient;