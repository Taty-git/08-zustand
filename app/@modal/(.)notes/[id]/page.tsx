import {QueryClient, HydrationBoundary, dehydrate} from '@tanstack/react-query';
import NotePreview from './NotePreview.client';
  
import {fetchNoteById} from '../../../../lib/api';
  
type Props = {
    params: Promise<{id: string}>;
};
  
const NotesPage = async ({params}: Props) => {
    
    const {id} = await params;  
    const queryClient = new QueryClient();
  
    await queryClient.prefetchQuery({

        queryKey: ["note", Number(id)],
        queryFn: () => fetchNoteById(Number(id)),
    });
  
    return (

    <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreview />
    </HydrationBoundary>
    );
};
  
  export default NotesPage;