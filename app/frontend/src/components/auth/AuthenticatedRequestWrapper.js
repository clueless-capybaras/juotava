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
            let responseClone2 = response.clone();
            let responseClone3 = response.clone();
            if (stateFunction !== undefined) {
                try {
                    let data = await response.json();
                    if (debug) { console.log(data); }
                    stateFunction(data);
                } catch (error) {
                    let data = await responseClone3.text();
                    if (debug) { console.log(data); }
                    stateFunction(data);
                }
            }
            try {
                if (method === 'GET') { // if the request is GET, it is 'success' if the response can be successfully parsed as JSON
                    let res = await responseClone.json();
                    successFunction('success');
                    if (debug) { console.log("Request was successful, because of valid json:", res); }
                } else if (method === 'POST' || method == 'DELETE') { // POST/DELETE requests are 'success' if the response is 'true', a UUID or can be successfully parsed as JSON
                    let res = await responseClone.text();
                    if (res === 'true') { // if the response is 'true', it is 'success'
                        successFunction('success');
                        if (debug) { console.log("Request was successful, because response was 'true'"); }
                    } else if (uuidRegex.test(res)) { // if the response is a UUID, it is 'success'
                        successFunction('success');
                        if (debug) { console.log("Request was successful, because "+res +" is a valid UUID"); }
                    } else { // if the response can be successfully parsed as JSON, it is 'success'
                        if (res === 'false') { // if the response is 'false', it is 'error'
                            if (debug) { console.log("Request was not successful, because response was 'false'"); }
                            successFunction('error');
                        } else {
                            try {
                                let data = await responseClone2.json();
                                if(debug) { console.log("Request was successful, because of valid json:", data); }
                                successFunction('success');
                            }
                            catch (error) { // if the response cannot be successfully parsed as JSON, it is 'error'
                                console.log('Error in request: '+error);
                                successFunction('error');
                            }
                        }
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