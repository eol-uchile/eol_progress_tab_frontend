import React from 'react';
import { Spinner, OverlayTrigger, Tooltip } from '@edx/paragon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export const ProgressGrid = React.memo(( { studentState, setCategoryGradeActive } ) => {
    console.log("ProgressGrid");
    const { student_data, loading } = studentState;
    const handleClick = ( category_grade ) => {
        setCategoryGradeActive(category_grade);
        console.log(category_grade);
    }
    return (
        <>
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
                            <tr key={categ.category}
                                onClick= { () => {
                                    handleClick(categ);
                                } }
                            >
                                <th>{categ.category}</th>
                                <td>{categ.weight}</td>
                                <td>{categ.grade_percent}</td>
                                <th>{categ.grade_scaled}</th>
                            </tr>
                        ))
                    }
                    <tr className="table-footer">
                        <th scope="row" colSpan="2" className="text-right">Promedio Final</th>
                        <td>{student_data.final_grade_percent}</td>
                        <OverlayTrigger
                            key='final-grade-tooltip'
                            placement='bottom'
                            overlay={
                                <Tooltip id={`tooltip-final-grade`}>
                                Este valor es calculado en base al porcentaje de logro final (promedio).
                                </Tooltip>
                            }
                        >
                            <th className={ student_data.passed && "text-success"}>
                                {student_data.final_grade_scaled}
                                <FontAwesomeIcon icon={faInfoCircle} className="ml-1" />
                            </th>
                        </OverlayTrigger>
                        
                    </tr>
                </tbody>
            </table>
            <p className="text-right text-muted">Haz clic en una evaluación para visualizar su progreso en detalle.</p>
        </div>
        </>
    )
});
