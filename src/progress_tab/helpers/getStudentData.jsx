// Get student data
export const getStudentData = async ( courseId ) => {
    const url = `/courses/${ courseId }/eol_progress_tab/student_data`;
    const response = await fetch(url, { credentials: "same-origin" });
    if(response.status == 200) {
        const data = await response.json();
        const student_data = {
            username            : data.username,
            passed              : data.passed,
            final_grade_percent : `${Math.round(data.final_grade_percent * 100)}%`,
            final_grade_scaled  : data.final_grade_scaled,
            category_grades     : data.category_grades.map( c => {
                return {
                    category        : c.category,
                    weight          : `${(c.weight * 100)}%`,
                    grade_percent   : `${Math.round(c.grade_percent * 100)}%`,
                    grade_scaled    : c.grade_scaled.toFixed(1).toString()
                }
            })
        };
        return student_data;
    } else {
        return {};
    }
}