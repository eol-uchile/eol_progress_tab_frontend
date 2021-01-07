import React from 'react';
import { Badge, OverlayTrigger, Tooltip } from '@edx/paragon';

export const SubsectionItem = ( { detail, dropped_message }) => {
    return (
        <div>
            <p className="font-weight-bold mb-0">
                <a href={ detail.url } target="_blank" className="mr-2">
                    { detail.subsection }
                </a>
                ({ detail.total_earned }/{ detail.total_possible }) {detail.percent}
                <OverlayTrigger
                        key='final-grade-tooltip'
                        placement='bottom'
                        overlay={
                            <Tooltip id={`tooltip-final-grade`}>
                                { dropped_message }
                            </Tooltip>
                        }
                    > 
                        <span className='d-none ml-2' id={ 'badge_' + detail.url }>
                            <Badge variant="dark">Excluida</Badge>
                        </span>
                </OverlayTrigger>
            </p>
            {
                detail.due && (
                    <p className="small text-italic mb-0">Fecha límite: { detail.due }</p>
                )
            }
            <dl className="mt-1">
                <dt>Puntuación de problemas:</dt>
                { !detail.attempted && <dd><i>No se registran respuestas</i></dd> }
                {
                    detail.attempted && detail.problem_scores?.map( (score, index) => (
                        <dd key={index}>
                            { score.earned }/{ score.possible }
                        </dd>
                    ))
                }
            </dl>
            <hr/>
        </div>
    )
}
