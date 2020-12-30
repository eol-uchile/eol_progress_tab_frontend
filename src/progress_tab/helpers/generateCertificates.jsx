import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

export const generateCertificates = async( url ) => {
    const status = await getAuthenticatedHttpClient()
        .post(url)
        .then(() => {
            return true;
        })
        .catch( (error) => {
            console.log(error);
            return false;
        });
    return status;
};
