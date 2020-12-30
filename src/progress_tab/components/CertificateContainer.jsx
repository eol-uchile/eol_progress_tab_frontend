import React, { useState } from 'react';
import { Alert, Button } from '@edx/paragon';
import { generateCertificates } from '../helpers/generateCertificates';

export const CertificateContainer = ( { certificate, setStudentState } ) => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const { title, url, msg, button_msg, button_method } = certificate;
    const handleClick = () => {
        setButtonDisabled(true);
        generateCertificates(url)
            .then((status) => {
                if (status) {
                    // trigger useEffect and update certificate url
                    setStudentState((prevState) => ({
                        ...prevState, 
                        called : Date.now(),
                        loading: true
                    }));
                }
                setButtonDisabled(false);
            });
    }
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
