import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

class AuthenticatedRequestWrapper{
    async request({isAuthenticated, getAccessTokenSilently},backend, path='', method='GET', body=undefined, stateFunction=undefined, debug=false){
        if (!isAuthenticated) {
            return null;
        }
        (async () => {
            let token = await getAccessTokenSilently();
            const response = await fetch(backend+'/'+path, {
                method: method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: body
            });
            if(debug) { console.log(response); }
            if (stateFunction !== undefined) {
                try {
                    let data = await response.json();
                    stateFunction(data);
                } catch (error) {
                    console.error(
                        'Error while applying response to state in AuthenticatedRequestWrapper.request to '+backend+'/'+path+': ', error);
                }
            }
        })();
    }
    
}
export default AuthenticatedRequestWrapper;