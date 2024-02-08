import {React, useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import LogOutButton from './auth/LogOutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { baseUrlRecipes } from '../config/config';
import { AuthenticatedRequestWrapperContext } from '../App';

function User(props) {
    let style = { width: 'auto', cursor: 'pointer', padding: '0' };
    if(props.disabled) {
        style = { width: 'auto', cursor: 'not-allowed', padding: '0', opacity: '0.5' };
    }
    const navigate = useNavigate();
    const cyClass = (props.cyClass !== undefined) ? " "+props.cyClass : "";
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();

    //auth request demo
    const [recipe, setRecipe] = useState({});
    useEffect(() => {
        console.log('User useEffect');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'test', 'GET', undefined, setRecipe, true);
    }, []);
    
    
    return (
        <>
            <h1>User page</h1>
            <h3>Auth Info:</h3>
            <p>isAuthenticated: {isAuthenticated.toString()}</p>
            <p>Auth0 userdata: {JSON.stringify(user)}</p>
            <LogOutButton />
            
            <h3> Authenticated Request Demo (Recipe)</h3>
            <p> Recipe: {recipe.title}</p>
            
        </>
    );
}
export default User;