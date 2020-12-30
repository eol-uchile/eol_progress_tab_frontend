import React from 'react';
import { Button, Spinner } from '@edx/paragon';
import { useFetchCourseInfo } from '../hooks/useFetchCourseInfo';

export const AboutGrid = React.memo(( { courseId } ) => {
    const { course, loading } = useFetchCourseInfo( courseId );
    const help_href = encodeURI(`/contact_form?course=${course.display_name}`);
    return (
        <div className="progress-tab-grid shadow-lg bg-white p-3">
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
                        <th scope="row" className="text-left">Escala de Calificación</th>
                        <td className="text-right">
                            { course.grade_cutoff }
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-left">Calificación Mínima de Aprobación</th>
                        <td className="text-right">
                            { course.min_grade_approval }
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
