/* 
* This hook will get course id from URL 
*   e.g: /eol/eol_progress_tab/static#/eol/eol_progress_tab/static/course-v1:eol+prueba03+2020
*   course id will be course-v1:eol+prueba03+2020
*/
export const getCourseId = ( ) =>  window.location.hash.substring(1).split(/[\/]+/).pop();

// Get course data
export const getCourseData = async ( courseId ) => {
    console.log("getCourseData");
    const url = `/courses/${ courseId }/eol_progress_tab/course_info`;
    const response = await fetch(url, { credentials: "same-origin" });
    if(response.status == 200) {
        const data = await response.json();
        const course_data = {
            start_date          : _date_format(data.start_date),
            end_date            : _date_format(data.end_date),
            effort              : data.effort,
            grade_cutoff        : `${(data.grade_cutoff * 100)}%`,
            min_grade_approval  : data.min_grade_approval.toFixed(1).toString(),
            display_name        : data.display_name.toUpperCase()
        };
        return course_data;
    } else {
        return {};
    }
}

const _date_format = date => {
    const formatted_date = new Date(date);
    return formatted_date.toLocaleString('es-CL');
}