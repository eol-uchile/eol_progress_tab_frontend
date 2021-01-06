import React from 'react';
import { useScrollDetail } from '../hooks/useScrollDetail';
import { useShowDroppedSubsections } from '../hooks/useShowDroppedSubsections';
import { Badge, OverlayTrigger, Tooltip } from '@edx/paragon';

export const ProgressDetailGrid = React.memo(( { categoryGrade } ) => {
    console.log("ProgressDetailGrid");

    useShowDroppedSubsections( categoryGrade );
    const ref = useScrollDetail(categoryGrade);

    return (
        <div className="progress-detail shadow-lg bg-white p-3" ref={ ref }>
            <h4 className="text-center">Progreso de Evaluación '{ categoryGrade.category }'</h4>
            <p className="text-center font-weight-bold">Calificación { categoryGrade.grade_percent } ≈ Nota { categoryGrade.grade_scaled } </p>
            <p className="text-muted">A continuación se muestran los puntajes (por subsección) obtenidos en los ejercicios con <u>calificación activada</u>:</p>
            {
                categoryGrade.detail?.map( detail => (
                    <dl key={detail.url}>
                        <dt>
                            <a href={ detail.url } target="_blank" className="mr-2">
                                { detail.subsection }
                            </a>
                            ({ detail.total_earned }/{ detail.total_possible }):
                            <OverlayTrigger
                                    key='final-grade-tooltip'
                                    placement='bottom'
                                    overlay={
                                        <Tooltip id={`tooltip-final-grade`}>
                                            Esta subsección ha sido excluida por tener una de las calificaciones más bajas en esta evaluación.
                                        </Tooltip>
                                    }
                                > 
                                    <span className='d-none' id={ 'badge_' + detail.url }>
                                        <br/>
                                        <Badge variant="dark">Excluida</Badge>
                                    </span>
                            </OverlayTrigger>
                        </dt>
                        {
                            detail.problem_scores?.map( (score, index) => (
                                <dd key={index}>
                                    { score.earned }/{ score.possible }
                                </dd>
                            ))
                        }
                        <hr/>
                    </dl>
                ))
            }
            { categoryGrade.drop_count > 0 && (
                    <p className="text-right text-muted small">
                        Esta evaluación excluye <strong>{ categoryGrade.drop_count }</strong> subsección(es) con peor rendimiento.
                    </p>
                ) 
            }
        </div>
    )
});
