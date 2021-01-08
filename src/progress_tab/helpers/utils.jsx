/* 
* Get tab ids from URL 
*   e.g: /eol/eol_progress_tab/static#/eol/eol_progress_tab/static/course-v1:eol+prueba03+2020/1234
*   course id will be course-v1:eol+prueba03+2020
*   user id will be 1234
*/
export const getTabIds = ( ) =>  {
    const parameters = window.location.hash.split(/[\/]+/);
    const userId = parameters.pop();
    const courseId = parameters.pop();
    return [userId, courseId];
}

export const date_format = date => (
    (new Date(date)).toLocaleString('es-CL')
)

export const unescapeHTML = string => {
   var elt = document.createElement("span");
   elt.innerHTML = string;
   return elt.innerText;
}