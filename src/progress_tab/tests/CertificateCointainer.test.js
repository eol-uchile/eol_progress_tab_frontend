import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { renderWithRouter, screen } from './TestUtils';
import { CertificateContainer } from '../components/CertificateContainer';
import * as hooks from "../hooks/useHandleCertificates";

describe('Testing <CertificateContainer /> App Component', () => {
    const certificate = {
        title           : 'title', 
        url             : 'url', 
        msg             : 'msg', 
        button_msg      : 'button msg', 
        button_method   : 'GET'
    };
    const setStudentState = jest.fn();
    const handleClick = jest.fn();
    jest.spyOn(hooks, 'useHandleCertificates').mockImplementation(() => ([false, handleClick]));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Load <CertificateContainer /> correctly', () => {
        renderWithRouter(<CertificateContainer certificate={certificate} setStudentState={setStudentState} />);
        expect( screen ).toMatchSnapshot();

    });

    test('Show data correctly', () => {
        renderWithRouter(<CertificateContainer certificate={certificate} setStudentState={setStudentState} />);
        expect( screen.getByText('title'));
        expect( screen.getByText('msg'));
        expect( screen.getByText('button msg'));
        expect( handleClick ).toHaveBeenCalledTimes(0);
        userEvent.click(screen.getByText('button msg'));
        expect( handleClick ).toHaveBeenCalledTimes(0); // only called on POST button method
    });

    test('Show post button correctly', () => {
        const post_certificate = {
            title           : 'title', 
            url             : 'url', 
            msg             : 'msg', 
            button_msg      : 'post button msg', 
            button_method   : 'POST'
        };
        renderWithRouter(<CertificateContainer certificate={post_certificate} setStudentState={setStudentState} />);
        expect( screen.getByText('title'));
        expect( screen.getByText('msg'));
        expect( screen.getByText('post button msg'));
        expect( handleClick ).toHaveBeenCalledTimes(0);
        userEvent.click(screen.getByText('post button msg'));
        expect( handleClick ).toHaveBeenCalledTimes(1);
    });
    
    
})