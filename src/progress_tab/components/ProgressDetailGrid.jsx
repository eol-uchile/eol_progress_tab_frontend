import React from 'react';
import PropTypes from 'prop-types';
import { useScrollDetail } from '../hooks/useScrollDetail';
import { useShowDroppedSubsections } from '../hooks/useShowDroppedSubsections';
import { SubsectionItem } from './SubsectionItem';
import { OverlayTrigger, Tooltip, Badge } from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

export const ProgressDetailGrid = React.memo(( { categoryGrade } ) => {
    useShowDroppedSubsections( categoryGrade );
    const ref = useScrollDetail(categoryGrade);

    return (
        <div className="progress-detail shadow-lg bg-white p-3" ref={ ref }>
            <h4 className="text-center">Progreso de Evaluación '{ categoryGrade.category }'</h4>
            <p className="text-center font-weight-bold mb-0">Calificación { categoryGrade.grade_percent } ≈ Nota { categoryGrade.grade_scaled }* </p>
            { categoryGrade.min_count > categoryGrade.detail.length && (
                <p className="text-center category-grade-info">
                    <OverlayTrigger
                        key='category-grade-tooltip'
                        placement='bottom'
                        overlay={
                            <Tooltip>
                                En esta evaluación se promedian { categoryGrade.min_count } subsecciones. Espere a que el equipo docente publique el contenido faltante.
                            </Tooltip>
                        }
                    > 
                        <Badge variant="info" className="cursor-default"><span className="badge-text">Subsecciones pendientes: { categoryGrade.min_count - categoryGrade.detail.length }</span> <FontAwesomeIcon icon={faQuestionCircle} className=""/></Badge>
                    </OverlayTrigger>
                </p>
            )}
            
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

ProgressDetailGrid.propTypes = {
    categoryGrade : PropTypes.object.isRequired,
}
