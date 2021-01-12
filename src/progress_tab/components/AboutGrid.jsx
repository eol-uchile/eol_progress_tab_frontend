import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner, OverlayTrigger, Tooltip } from '@edx/paragon';
import { useFetchCourseInfo } from '../hooks/useFetchCourseInfo';

export const AboutGrid = React.memo(( { courseId } ) => {
    const { course, loading } = useFetchCourseInfo( courseId );
    const help_href = encodeURI(`/contact_form?course=${course.display_name}`);
    return (
        <div className="tab-grid shadow-lg bg-white p-3">
            <h4 className="text-center">Información General</h4>
            { loading && <Spinner animation="border" variant="primary" className="d-flex mx-auto mt-2 "/> }
            <table className="table table-borderless mb-0">
                <tbody>
                    <tr>
                        <th scope="row" className="text-left">Inicio de clases</th>
                        <td className="text-right">
                            { course.start_date }
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-left">Término de clases</th>
                        <td className="text-right">
                            { course.end_date }
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-left">Esfuerzo estimado</th>
                        <td className="text-right">
                            { course.effort }
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-left">Calificación Mínima de Aprobación</th>
                        <td className="text-right">
                            <OverlayTrigger
                                key='final-grade-tooltip'
                                placement='left'
                                overlay={
                                    <Tooltip id={`tooltip-final-grade`}>
                                    Equivalente a una nota <strong>{ course.min_grade_approval }</strong>* aproximadamente (escala 1.0 - 7.0).
                                    </Tooltip>
                                }
                            > 
                                <span>{ course.grade_cutoff }</span>
                            </OverlayTrigger>
                        </td>
                    </tr>
                </tbody>
            </table>
            <a href={ help_href } target="_blank">
                <Button variant="primary" size="sm" block className="mx-auto">
                    ¿ Necesitas Ayuda ?
                </Button>
            </a>
        </div>
    )
});

AboutGrid.propTypes = {
    courseId : PropTypes.string.isRequired
}