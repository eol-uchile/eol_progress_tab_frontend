import { useState, useEffect } from "react";
import { getStudentData } from "../helpers/getStudentData";

export const useFetchStudentData = ( courseId, userId ) => {
    const [state, setState] = useState({
        called      : Date.now(),
        loading     : true,
        student_data: {}
    })

    useEffect(() => {
        getStudentData ( courseId, userId )
        .then( student_data => {
            setState({
                ...state,
                loading         : false,
                student_data    : student_data
            });
        } );
    }, [ state.called ])
    return [state, setState];
}
