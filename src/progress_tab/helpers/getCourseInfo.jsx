/* 
* This hook will get course id from URL 
*   e.g: /eol/eol_progress_tab/static#/eol/eol_progress_tab/static/course-v1:eol+prueba03+2020
*   course id will be course-v1:eol+prueba03+2020
*/

export const getCourseId = ( ) =>  window.location.hash.substring(1).split(/[\/]+/).pop();