import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { renderWithRouter, screen } from './TestUtils';
import { ProgressGrid } from '../components/ProgressGrid';


describe('Testing <ProgressGrid /> App Component', () => {

    const setCategoryGradeActive = jest.fn();

    const studentState = {
        called      : Date.now(),
        loading     : false,
        student_data: {
            username            : 'username',
            passed              : true,
            final_grade_percent : `60%`,
            final_grade_scaled  : '4.0',
            category_grades     : [
                {
                    category        : 'category_1',
                    weight          : '51%',
                    drop_count      : 0,
                    dropped_message : 'dropped message',
                    grade_percent   : '100%',
                    grade_scaled    : '7.0',
                    detail          : []
                },
                {
                    category        : 'category_2',
                    weight          : '49%',
                    drop_count      : 0,
                    dropped_message : 'dropped message2',
                    grade_percent   : '0%',
                    grade_scaled    : '1.0',
                    detail          : []
                }
            ],
            certificate_data    : {}
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Load <ProgressGrid /> correctly', () => {
        renderWithRouter(<ProgressGrid studentState={studentState} setCategoryGradeActive={setCategoryGradeActive} />);
        expect( screen ).toMatchSnapshot();
    });

    test('Show loading spinner', () => {
        const studentState_2 = {
            called      : Date.now(),
            loading     : true,
            student_data: {}
        };
        renderWithRouter(<ProgressGrid studentState={studentState_2} setCategoryGradeActive={setCategoryGradeActive} />);
        expect(screen.getByText((content, element) => 
            element.classList.contains(`spinner-border`) && content == ''
        ));
    });

    test('Show progress data', () => {
        renderWithRouter(<ProgressGrid studentState={studentState} setCategoryGradeActive={setCategoryGradeActive} />);

        expect( screen.getByText("Calificaciones de 'username'"));

        // header
        expect( screen.getByText('Evaluación'));
        expect( screen.getByText('Peso'));
        // categ 1
        expect( screen.getByText('category_1'));
        expect( screen.getByText('51%'));
        expect( screen.getByText('100%'));
        // categ 2
        expect( screen.getByText('category_2'));
        expect( screen.getByText('49%'));
        expect( screen.getByText('0%'));
        // final grade percent
        expect( screen.getByText('60%'));

        expect( screen.getByText('Haz clic en una evaluación para visualizar su progreso en detalle.'));

        expect( setCategoryGradeActive ).toHaveBeenCalledTimes(0);
        userEvent.click(screen.getByText('category_1'));
        expect( setCategoryGradeActive ).toHaveBeenCalledTimes(1);
    })
})


