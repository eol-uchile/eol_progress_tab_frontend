import { useState, useEffect } from "react";
import { getCourseData } from "../helpers/getCourseInfo";

export const useFetchCourseInfo = ( courseId ) => {
    const [state, setState] = useState({
        loading: true,
        course: {}
    })

    useEffect(() => {
        getCourseData ( courseId )
        .then( course_data => {
            setState({
                loading : false,
                course  : course_data
            });
        } );
    }, [ ])
    return state;
}
