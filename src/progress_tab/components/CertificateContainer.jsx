import React from 'react';
import { Alert, Button, Image } from '@edx/paragon';
import { useHandleCertificates } from '../hooks/useHandleCertificates';

export const CertificateContainer = React.memo(( { certificate, setStudentState } ) => {
    const { title, url, msg, button_msg, button_method } = certificate;
    const [ buttonDisabled, handleClick ] = useHandleCertificates( url, setStudentState );
    const certificateLogo = `${process.env.THEME_ASSETS_PATH}images/certificates/honor.png`;
    return (
        <Alert variant="success">
            <div className="row">
                <div className="col-lg-2 order-lg-12 p-3 m-auto text-center">
                    <Image src={ certificateLogo } fluid />
                </div>
                <div className="col-lg-10 order-lg-1 p-3">
                    <Alert.Heading>{ title } { }</Alert.Heading>
                    <p>{ msg }</p>
                    <hr />
                    <div className="mb-0">
                        { 
                            button_method == 'GET' && (
                                <a href={ url } target="_blank">
                                    <Button variant="success" disabled={ url=='#' } >{ button_msg }</Button>
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
                </div>
            </div>
            
        </Alert>
    )
});
