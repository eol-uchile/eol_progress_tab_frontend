import React from 'react';
import { Spinner } from '@edx/paragon';
import { useFetchStudentData } from '../hooks/useFetchStudentData';

export const ProgressGrid = ( { courseId } ) => {
    const { student_data, loading } = useFetchStudentData( courseId );
    return (
        <div className="progress-tab-grid shadow-lg bg-white p-3">
            <h4 className="text-center">Calificaciones de '{student_data.username}'</h4>
            { loading && <Spinner animation="border" variant="primary" className="d-flex mx-auto mt-2 "/> }
            <table className="table my-3">
                <thead className="thead-primary">
                    <tr>
                        <th scope="col">Evaluación</th>
                        <th scope="col">Peso</th>
                        <th scope="col">Calificación <br/>(0 - 100)%</th>
                        <th scope="col">Calificación <br/>(1.0 - 7.0)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student_data.category_grades?.map( categ => (
                            <tr>
                                <th>{categ.category}</th>
                                <td>{categ.weight}</td>
                                <td>{categ.grade_percent}</td>
                                <th>{categ.grade_scaled}</th>
                            </tr>
                        ))
                    }
                    <tr className="table-footer">
                        <th scope="row" colspan="2" className="text-right">Promedio Final</th>
                        <td>{student_data.final_grade_percent}</td>
                        <th className={ student_data.passed && "text-success"}>{student_data.final_grade_scaled}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
