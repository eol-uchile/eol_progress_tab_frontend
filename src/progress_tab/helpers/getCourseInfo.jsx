/* 
* This hook will get course id from URL 
*   e.g: /eol/eol_progress_tab/static#/eol/eol_progress_tab/static/course-v1:eol+prueba03+2020
*   course id will be course-v1:eol+prueba03+2020
*/
export const getCourseId = ( ) =>  window.location.hash.substring(1).split(/[\/]+/).pop();

// Get course data
export const getCourseData = async ( courseId ) => {
    const url = `/courses/${ courseId }/eol_progress_tab/course_info`;
    const response = await fetch(url, { credentials: "same-origin" });
    if(response.status == 200) {
        const data = await response.json();
        return {
            start_date          : data.start_date,
            end_date            : data.end_date,
            effort              : data.effort,
            grade_cutoff        : `${(data.grade_cutoff * 100)}%`,
            min_grade_approval  : data.min_grade_approval.toFixed(1).toString(),
            display_name        : data.display_name.toUpperCase()
        };
    } else {
        return {};
    }
}