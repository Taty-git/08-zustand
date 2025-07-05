import css from './LayoutNotes.module.css';

type Props = {
    children: React.ReactNode;
    sidebar: React.ReactNode;
  };
  
  
  
  const NotesLayout = ({children, sidebar}: Props) => {
    return (
      <section className={css.container}>
        <div className={css.notesWrapper}>{children}</div>
        <aside className={css.sidebar}>{sidebar}</aside>
      </section>
    );
  };
  
  export default NotesLayout;