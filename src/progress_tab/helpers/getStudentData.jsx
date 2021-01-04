// Get student data
export const getStudentData = async ( courseId ) => {
    console.log("getStudentData");
    const url = `/courses/${ courseId }/eol_progress_tab/student_data`;
    const response = await fetch(url, { credentials: "same-origin" });
    if(response.status == 200) {
        const data = await response.json();
        const student_data = {
            username            : data.username,
            passed              : data.passed,
            final_grade_percent : `${Math.round(data.final_grade_percent * 100)}%`,
            final_grade_scaled  : data.final_grade_scaled,
            category_grades     : data.category_grades.map( _category_grades ),
            certificate_data    : _certificate_data( data )
        };
        return student_data;
    } else {
        return {};
    }
}

export const _certificate_data = data => ({
    url : data.certificate_data?.url,
    title : data.certificate_data?.title,
    msg : data.certificate_data?.msg,
    button_msg : data.certificate_data?.button_msg,
    button_method : data.certificate_data?.button_method
});

export const _category_grades = c => ({
    category        : c.category,
    weight          : `${(c.weight * 100)}%`,
    grade_percent   : `${Math.round(c.grade_percent * 100)}%`,
    grade_scaled    : c.grade_scaled.toFixed(1).toString(),
    detail          : c.detail.map( _detail )
});

export const _detail = d => ({
    subsection      : d.subsection_display_name,
    url             : d.url,
    total_earned    : d.total_earned,
    total_possible  : d.total_possible,
    problem_scores  : d.problem_scores.map( _problem_scores )
});

export const _problem_scores = score => ({
    earned          : score.earned,
    possible        : score.possible
});