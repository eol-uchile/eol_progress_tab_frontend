import { date_format } from "./utils";

// Get course data
export const getCourseData = async ( courseId ) => {
    const url = `/courses/${ courseId }/eol_progress_tab/course_info`;
    const response = await fetch(url, { credentials: "same-origin" });
    if(response.status == 200) {
        const data = await response.json();
        const course_data = {
            start_date          : data.start_date ? date_format(data.start_date) : 'Sin definir',
            end_date            : data.end_date ? date_format(data.end_date) : 'Sin definir',
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

