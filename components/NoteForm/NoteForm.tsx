import css from './NoteForm.module.css';
import {ErrorMessage, Field, Formik, Form, type FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {createNote} from '../../lib/api';
import {useQueryClient, useMutation} from '@tanstack/react-query';

interface NoteFormData {
    title: string;
    content: string;
    tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

const initialValues: NoteFormData = {
    title: '',
    content: '',
    tag: 'Todo',
};

const Schema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters')
      .max(50, 'Title is too long')
      .required('Title is required'),
    content: Yup.string().max(500, 'Content is too long'),
    tag: Yup.string()
      .oneOf(['Todo', 'Work', 'Personal', 'Shopping', 'Meeting'], 'Invalid category')
      .required('Tag is required'),
});

interface Props {
    onClose: () => void;
}

export default function NoteForm({onClose}: Props) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });

    const handleSubmit = (
        values: NoteFormData,
        actions: FormikHelpers<NoteFormData>
    ) => {
    mutation.mutate(values, {
        onSuccess: () => {
            actions.resetForm();
        },
    });
};

return (
    <Formik initialValues={initialValues} validationSchema={Schema} onSubmit={handleSubmit}>
        <Form className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                    <Field id="title" type="text" name="title" className={css.input} />
                    <ErrorMessage name="title" component="span" className={css.error} />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                    <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
                    <ErrorMessage name="content" component="span" className={css.error} />
            </div>
            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                    <Field as="select" id="tag" name="tag" className={css.select}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage name="tag" component="span" className={css.error} />
            </div>

            <div className={css.actions}>                
                <button type="submit" className={css.submitButton}>
                    Create note
                </button>
                <button onClick={onClose} className={css.cancelButton}>
                    Close
                </button>
            </div>
      </Form>
    </Formik>
  );
};