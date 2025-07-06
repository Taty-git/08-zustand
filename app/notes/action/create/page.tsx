import css from './CreateNote.module.css';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: `NoteHub | Create notes`,
    description: "NoteHub Create note",
    openGraph: {
      title: `NoteHub | Create`,
      description: "NoteHub | Create note",
      url: `https://notehub.com/notes/action/create`,
      siteName: "NoteHub | Create",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Note App image",
        },
      ],
      type: "article",
    },
  };
  
  const CreateNote = () => {
    return (
      <main className={css.main}>
        <div className={css.container}>
          <h1 className={css.title}>Create note</h1>
  
          <NoteForm />
        </div>
      </main>
    );
  };
  
  export default CreateNote;