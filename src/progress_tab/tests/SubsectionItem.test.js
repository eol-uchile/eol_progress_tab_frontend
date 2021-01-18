import React from 'react';
import '@testing-library/jest-dom';

import { renderWithRouter, screen } from './TestUtils';
import { SubsectionItem } from '../components/SubsectionItem';

describe('Testing <SubsectionItem /> App Component', () => {

    const detail = {
        subsection          : 'subsection',
        due                 : 'date_format',
        show_problem_scores : true,
        attempted           : true,
        url                 : 'subsection_url',
        total_earned        : 3,
        total_possible      : 5,
        percent             : `60%`,
        problem_scores      : [
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

    const dropped_message = 'dropped_message';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Load <SubsectionItem /> correctly', () => {
        renderWithRouter(<SubsectionItem detail={detail} dropped_message={dropped_message} />);
        expect( screen ).toMatchSnapshot();

    });

    test('Show subsection data', () => {
        renderWithRouter(<SubsectionItem detail={detail} dropped_message={dropped_message} />);

        expect( screen.getByText('subsection'));
        expect( screen.getByText('(3/5) 60%'));
        expect( screen.getByText('Fecha límite: date_format'));
        expect( screen.getByText('99/111')); // problem_scores[0]
    })

    test('Show subsection data without attempted', () => {
        const detail_2 = {
            subsection          : 'subsection_2',
            due                 : 'date_format',
            show_problem_scores : true,
            attempted           : false,
            url                 : 'subsection_url',
            total_earned        : 0,
            total_possible      : 5,
            percent             : `0%`,
            problem_scores      : []
        }
        renderWithRouter(<SubsectionItem detail={detail_2} dropped_message={dropped_message} />);

        expect( screen.getByText('subsection_2'));
        expect( screen.getByText('(0/5) 0%'));
        expect( screen.getByText('Fecha límite: date_format'));
        expect( screen.getByText('No se registran respuestas')); 
    })

    test('Show subsection data without show_problem_scores', () => {
        const detail_3 = {
            subsection          : 'subsection_3',
            due                 : 'date_format',
            show_problem_scores : false,
            attempted           : true,
            url                 : 'subsection_url',
            total_earned        : 3,
            total_possible      : 5,
            percent             : `60%`,
            problem_scores      : [
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
        renderWithRouter(<SubsectionItem detail={detail_3} dropped_message={dropped_message} />);

        expect( screen.getByText('subsection_3'));
        expect( screen.getByText('Puntuaciones de problemas son escondidas.')); 
    })

    
})