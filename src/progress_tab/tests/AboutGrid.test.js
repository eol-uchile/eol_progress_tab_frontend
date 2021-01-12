import React from 'react';
import '@testing-library/jest-dom';

import { renderWithRouter, screen } from './TestUtils';
import { AboutGrid } from '../components/AboutGrid';
import { useFetchCourseInfo } from '../hooks/useFetchCourseInfo';
jest.mock('../hooks/useFetchCourseInfo');

describe('Testing <AboutGrid /> App Component', () => {

    const courseId = 'foo_id';

    useFetchCourseInfo.mockReturnValue({
        course  : {},
        loading : true
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Load <AboutGrid /> correctly', () => {
        renderWithRouter(<AboutGrid courseId={courseId} />);
        expect( screen ).toMatchSnapshot();

    });

    test('Show loading spinner', () => {
        renderWithRouter(<AboutGrid courseId={courseId} />);
        expect(screen.getByText((content, element) => 
            element.classList.contains(`spinner-border`) && content == ''
        ));
    });

    test('Show course data', () => {
        useFetchCourseInfo.mockReturnValue({
            course  : {
                start_date          : 'start_date',
                end_date            : 'end_date',
                effort              : 'effort',
                grade_cutoff        : '60%',
                min_grade_approval  : '4.0',
                display_name        : 'course_display_name'
            },
            loading : false
        });
        renderWithRouter(<AboutGrid courseId={courseId} />);

        expect( screen.getByText('start_date'));
        expect( screen.getByText('end_date'));
        expect( screen.getByText('effort'));
        expect( screen.getByText('60%'));
    })
    
})
