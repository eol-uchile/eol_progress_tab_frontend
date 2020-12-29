import { useState, useEffect } from "react";
import { getStudentData } from "../helpers/getStudentData";

export const useFetchStudentData = ( courseId ) => {
    const [state, setState] = useState({
        loading     : true,
        student_data: {}
    })

    useEffect(() => {
        getStudentData ( courseId )
        .then( student_data => {
            setState({
                loading         : false,
                student_data    : student_data
            });
        } );
    }, [ ])
    return state;
}
