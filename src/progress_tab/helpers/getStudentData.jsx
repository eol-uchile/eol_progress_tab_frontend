import { date_format, unescapeHTML } from "./utils";

// Get student data
export const getStudentData = async ( courseId, userId ) => {
    const url = `/courses/${ courseId }/eol_progress_tab/student_data/${userId}`;
    const response = await fetch(url, { credentials: "same-origin" });
    if(response.status == 200) {
        const data = await response.json();
        const student_data = {
            username            : data.username,
            passed              : data.passed,
            final_grade_percent : `${Math.round(data.final_grade_percent * 100)}%`,
            final_grade_scaled  : data.final_grade_scaled.toFixed(1).toString(),
            category_grades     : data.category_grades.map( _category_grades ),
            certificate_data    : _certificate_data( data )
        };
        return student_data;
    } else {
        return {};
    }
}

const _certificate_data = data => ({
    url : data.certificate_data?.url,
    title : data.certificate_data?.title,
    msg : data.certificate_data?.msg,
    button_msg : data.certificate_data?.button_msg,
    button_method : data.certificate_data?.button_method
});

const _category_grades = c => ({
    category        : c.category,
    weight          : `${(c.weight * 100)}%`,
    drop_count      : c.drop_count,
    min_count       : c.min_count,
    dropped_message : _dropped_message( c.detail.length - c.drop_count ),
    grade_percent   : `${Math.round(c.grade_percent * 100)}%`,
    grade_scaled    : c.grade_scaled.toFixed(1).toString(),
    detail          : c.detail.map( _detail )
});

const _detail = d => ({
    subsection      : unescapeHTML(d.subsection_display_name),
    due             : d.due ? date_format(d.due) : undefined,
    attempted       : d.attempted,
    url             : d.url,
    total_earned    : d.total_earned,
    total_possible  : d.total_possible,
    percent         : `${Math.round(d.total_percent * 100)}%`,
    problem_scores  : d.problem_scores.map( _problem_scores )
});

const _problem_scores = score => ({
    earned          : score.earned,
    possible        : score.possible
});

const _dropped_message = count => {
    const detail_message = count == 1 ? 'la mejor calificación' : `las ${count} mejores calificaciones`;
    return `En esta evaluación se considera solo ${ detail_message }.`;
}