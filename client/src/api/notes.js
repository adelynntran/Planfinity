//CRUD for note section in individual course page:
//import supabase from the client (aka users):
import {supabase} from '../api/supabaseClient';

//CRUD methods here:
//POST: create/add new note
/*
@param: {Object} note - the note object to insert
@return: inserted note data
 */
export async function addNote(note) {
    const {course_id, note_text} = note;
    const {data, error} = await supabase
        .from('Notes') //fetch from table 'Notes'
        .upsert(
            {course_id, note_text},
            {onConflict: ['course_id']
            }
        ); //update+insert: insert new one if not existed, or update it if its existed
        
    if (error) {
        console.error("Error saving note: ", error);
    }
    return data; //gives back the newly created row
}

//READ/FETCH the data:
export async function getNoteByCourse(courseId) {
    const {data, error} = await supabase
        .from('Notes')
        .select('note_text')
        .eq('course_id', courseId)
        .single();

    if (error && error.code !== 'PGRST116') {
/* 
PGRST116: youre trying to upsert a new 
that violates a unique constraint, and you havent told
supabase how to resolve it.
 */
        console.error("Error fetching note: ", error);
    }

    return data?.note_text || '';
}
