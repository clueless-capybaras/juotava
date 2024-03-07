import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const uuidRegex = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$');

class AuthenticatedRequestWrapper{
    async request({isAuthenticated, getAccessTokenSilently},backend, path='', method='GET', body=undefined, stateFunction=undefined, successFunction=undefined, debug=false){
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
            let responseClone = response.clone();
            if (stateFunction !== undefined) {
                try {
                    let data = await response.json();
                    stateFunction(data);
                } catch (error) {
                    console.error(
                        'Error while applying response to state in AuthenticatedRequestWrapper.request to '+backend+'/'+path+': ', error);
                }
            }
            try {
                if (method === 'GET') {
                    console.log('GET');
                    await responseClone.json();
                    successFunction('success');
                    console.log('success');
                } else if (method === 'POST') {
                    let res = await responseClone.text(); 
                    if (res === 'true') {
                        successFunction('success');
                        console.log(res);
                        stateFunction(res);
                    } else if (uuidRegex.test(res)) {
                        successFunction('success');
                        console.log(res);
                        stateFunction(res);
                    } else {
                        successFunction('error');
                    }
                }
            } catch (error) {
                console.log('Error in request: '+error);
                successFunction('error');
            }
        })();
    }
    
}
export default AuthenticatedRequestWrapper;