import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, OverlayTrigger, Tooltip } from '@edx/paragon';

export const ProgressGrid = React.memo(( { studentState, setCategoryGradeActive } ) => {
    const { student_data, loading } = studentState;
    const handleClick = ( category_grade ) => {
        setCategoryGradeActive(category_grade);
    }
    return (
        <>
        <div className="tab-grid progress-tab-grid shadow-lg bg-white p-3">
            <h4 className="text-center">Calificaciones de '{student_data.username}'</h4>
            { loading && <Spinner animation="border" variant="primary" className="d-flex mx-auto mt-2 "/> }
            <table className="table my-3">
                <thead className="thead-primary">
                    <tr>
                        <th scope="col">Evaluación</th>
                        <th scope="col">Peso</th>
                        <th scope="col">Calificación <br/>(0 - 100)%</th>
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
                                <OverlayTrigger
                                    key='grade-tooltip'
                                    placement='bottom'
                                    overlay={
                                        <Tooltip>
                                        Equivalente a una nota <strong>{categ.grade_scaled}</strong>* aproximadamente (escala 1.0 - 7.0).
                                        </Tooltip>
                                    }
                                > 
                                    <td>{categ.grade_percent}</td>
                                </OverlayTrigger>
                            </tr>
                        ))
                    }
                    <tr className="table-footer">
                        <th scope="row" colSpan="2" className="text-right">Promedio Final</th>
                        <OverlayTrigger
                            key='grade-tooltip'
                            placement='bottom'
                            overlay={
                                <Tooltip>
                                Equivalente a una nota <strong>{student_data.final_grade_scaled}</strong> aproximadamente (escala 1.0 - 7.0).
                                </Tooltip>
                            }
                        >
                            <td>{student_data.final_grade_percent}</td>
                        </OverlayTrigger>
                        
                    </tr>
                </tbody>
            </table>
            <p className="text-right text-muted small">Haz clic en una evaluación para visualizar su progreso en detalle.</p>
        </div>
        </>
    )
});

ProgressGrid.propTypes = {
    studentState            : PropTypes.object.isRequired,
    setCategoryGradeActive  : PropTypes.func.isRequired
}