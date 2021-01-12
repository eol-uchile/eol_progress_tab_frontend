import React from 'react';
import '@testing-library/jest-dom';

import { renderWithRouter, screen } from './TestUtils';
import { ProgressDetailGrid } from '../components/ProgressDetailGrid';
import { useShowDroppedSubsections } from '../hooks/useShowDroppedSubsections';
jest.mock('../hooks/useShowDroppedSubsections');


describe('Testing <ProgressDetailGrid /> App Component', () => {

    useShowDroppedSubsections.mockReturnValue({});

    const categoryGrade = {
        category        : 'category',
        weight          : '30%',
        drop_count      : 2,
        dropped_message : 'dropped message',
        grade_percent   : '100%',
        grade_scaled    : '7.0',
        detail          : [
            {
                subsection      : 'subsection',
                due             : 'date_format',
                attempted       : true,
                url             : 'subsection_url1',
                total_earned    : 3,
                total_possible  : 5,
                percent         : `60%`,
                problem_scores  : [
                    {
                        earned  : 99,
                        possible: 111
                    },
                    {
                        earned  : 0,
                        possible: 1
                    },
                    {
                        earned  : 1,
                        possible: 1
                    },
                    {
                        earned  : 1,
                        possible: 1
                    },
                    {
                        earned  : 1,
                        possible: 1
                    }
                ]
            },
            {
                subsection      : 'subsection_2',
                due             : 'date_format',
                attempted       : true,
                url             : 'subsection_url2',
                total_earned    : 3,
                total_possible  : 5,
                percent         : `60%`,
                problem_scores  : [
                    {
                        earned  : 99,
                        possible: 111
                    },
                    {
                        earned  : 0,
                        possible: 1
                    },
                    {
                        earned  : 1,
                        possible: 1
                    },
                    {
                        earned  : 1,
                        possible: 1
                    },
                    {
                        earned  : 1,
                        possible: 1
                    }
                ]
            }
        ]
    };

    Element.prototype.scrollIntoView = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Load <ProgressDetailGrid /> correctly', () => {
        renderWithRouter(<ProgressDetailGrid categoryGrade={categoryGrade} />);
        expect( screen ).toMatchSnapshot();

    });

    test('Show category data', () => {
        renderWithRouter(<ProgressDetailGrid categoryGrade={categoryGrade} />);

        expect( screen.getByText("Progreso de Evaluación 'category'"));
        expect( screen.getByText("Calificación 100% ≈ Nota 7.0*"));
        expect( screen.getByText('calificación activada'));
        // drop_count > 0
        expect( screen.getByText('dropped message'));

    })

    test('Show category data with empty detail', () => {
        const categoryGrade_2 = {
            category        : 'category_2',
            weight          : '30%',
            drop_count      : 2,
            dropped_message : 'dropped message',
            grade_percent   : '100%',
            grade_scaled    : '7.0',
            detail          : []
        };
        renderWithRouter(<ProgressDetailGrid categoryGrade={categoryGrade_2} />);

        expect( screen.getByText("Progreso de Evaluación 'category_2'"));
        expect( screen.getByText('Aún no se han configurado ejercicios en esta evaluación'));
    })
})


