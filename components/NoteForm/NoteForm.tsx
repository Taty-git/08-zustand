'use client';

import css from './NoteForm.module.css';
import {useRouter} from 'next/navigation';
import {createNote} from '../../lib/api';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {useNoteDraftStore} from '../../lib/store/noteStore';

interface NoteFormData {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
  
export default function NoteForm() {
   
    const router = useRouter();
    const queryClient = useQueryClient();
  
    const { draft, setDraft, clearDraft } = useNoteDraftStore();
  
    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setDraft({
            ...draft,
            [event.target.name]: event.target.value,
        });
    };
  
    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            clearDraft();
            router.push("/notes/filter/All");
        },
    });
  
    const handleSubmit = (formData: FormData) => {
      const values = Object.fromEntries(formData) as unknown as NoteFormData;
      mutation.mutate(values, {
        onSuccess: () => {
          alert("Success, you created a new note !");
        },
      });
    };
  
    const handleCancel = () => router.push("/notes/filter/All");
  
    return (
      
    <form action={handleSubmit} className={css.form}>
        {/* TITLE */}
        <div className={css.formGroup}>
          <label htmlFor="title" className={css.formGroup}>
            Title
            <input
              type="text"
              name="title"
              className={css.input}
              defaultValue={draft?.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        {/* CONTENT */}
        <div className={css.formGroup}>
          <label htmlFor="content" className={css.formGroup}>
            Content
            <textarea
              name="content"
              className={css.textarea}
              defaultValue={draft?.content}
              onChange={handleChange}
              required
            ></textarea>
          </label>
        </div>
        {/* TAG */}
        <div className={css.formGroup}>
          <label htmlFor="tag" className={css.formGroup}>
            Tag
            <select
              name="tag"
              className={css.select}
              defaultValue={draft?.tag}
              onChange={handleChange}
            >
              {["Todo", "Work", "Personal", "Meeting", "Shopping"].map(
                (category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>
          </label>
        </div>
        {/* SUBMIT */}
        <div className={css.actions}>
            <button type="button" onClick={handleCancel} className={css.cancelButton}>
                Cancel
            </button>
            <button type="submit" className={css.submitButton}>
                Create note
            </button>
        </div>
      </form>
    );
  }