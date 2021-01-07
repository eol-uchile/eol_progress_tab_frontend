import { useState } from "react";
import { generateCertificates } from "../helpers/generateCertificates";

export const useHandleCertificates = ( url, setStudentState ) => {
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleClick = () => {
        setButtonDisabled(true);
        generateCertificates(url)
            .then((status) => {
                if (status) {
                    // trigger useEffect (useFetchStudentData) and update certificate url
                    setStudentState((prevState) => ({
                        ...prevState, 
                        called : Date.now(),
                        loading: true
                    }));
                }
                setButtonDisabled(false);
            });
    }

    return [ buttonDisabled, handleClick ]

}