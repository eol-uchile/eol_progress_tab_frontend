import React, { useEffect, useRef } from 'react';
import { useScrollDetail } from '../hooks/useScrollDetail';

export const ProgressDetailGrid = React.memo(( { categoryGrade } ) => {
    console.log("ProgressDetailGrid");
    const ref = useScrollDetail(categoryGrade);
    return (
        <div className="progress-detail shadow-lg bg-white p-3" ref={ ref }>
            <h4 className="text-center">Progreso de Evaluación '{ categoryGrade.category }'</h4>
            <p className="text-center font-weight-bold">Calificación { categoryGrade.grade_percent } ≈ Nota { categoryGrade.grade_scaled } </p>
            <p className="text-muted">A continuación se muestran los puntajes (por subsección) obtenidos en los ejercicios con <u>calificación activada</u>:</p>
            {
                categoryGrade.detail?.map( detail => (
                    <dl key={detail.subsection}>
                        <dt><a href={ detail.url } target="_blank">{ detail.subsection }</a> ({ detail.total_earned }/{ detail.total_possible }):</dt>
                        {
                            detail.problem_scores?.map( (score, index) => (
                                <dd key={index}>
                                    { score.earned }/{ score.possible }
                                </dd>
                            ))
                        }
                    </dl>
                ))
            }
            <h5></h5>
        </div>
    )
});
