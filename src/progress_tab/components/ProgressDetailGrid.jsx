import React from 'react';
import { useScrollDetail } from '../hooks/useScrollDetail';
import { useShowDroppedSubsections } from '../hooks/useShowDroppedSubsections';
import { SubsectionItem } from './SubsectionItem';

export const ProgressDetailGrid = React.memo(( { categoryGrade } ) => {
    useShowDroppedSubsections( categoryGrade );
    const ref = useScrollDetail(categoryGrade);

    return (
        <div className="progress-detail shadow-lg bg-white p-3" ref={ ref }>
            <h4 className="text-center">Progreso de Evaluación '{ categoryGrade.category }'</h4>
            <p className="text-center font-weight-bold">Calificación { categoryGrade.grade_percent } ≈ Nota { categoryGrade.grade_scaled }* </p>
            { categoryGrade.detail.length == 0 && <p className="text-center text-muted">Aún no se han configurado ejercicios en esta evaluación</p> }
            { categoryGrade.detail.length > 0 && (
                <>
                    <p className="text-muted">A continuación se muestran los puntajes (por subsección) obtenidos en los ejercicios con <u>calificación activada</u>:</p>
                    {
                        categoryGrade.detail?.map( detail => (
                            <SubsectionItem detail={ detail } dropped_message={ categoryGrade.dropped_message } key={detail.url} />
                        ))
                    }
                    { categoryGrade.drop_count > 0 && (
                            <p className="text-right text-muted small">
                                { categoryGrade.dropped_message }
                            </p>
                        ) 
                    }
                </>
            ) }
            
        </div>
    )
});
