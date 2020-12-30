import React from 'react';
import { Alert, Button } from '@edx/paragon';
import { useHandleCertificates } from '../hooks/useHandleCertificates';

export const CertificateContainer = ( { certificate, setStudentState } ) => {
    const { title, url, msg, button_msg, button_method } = certificate;
    const [ buttonDisabled, handleClick ] = useHandleCertificates( url, setStudentState );
    return (
        <Alert variant="success">
            <Alert.Heading>{ title }</Alert.Heading>
            <p>{ msg }</p>
            <hr />
            <div className="mb-0">
                { 
                    button_method == 'GET' && (
                        <a href={ url } target="_blank">
                            <Button variant="success" >{ button_msg }</Button>
                        </a>
                    ) 
                }
                {
                    button_method == 'POST' && (
                        <Button 
                            variant="success" 
                            disabled={ buttonDisabled } 
                            onClick= { handleClick } 
                        >
                            { button_msg }
                        </Button>
                    )
                }
            </div>
        </Alert>
    )
}
