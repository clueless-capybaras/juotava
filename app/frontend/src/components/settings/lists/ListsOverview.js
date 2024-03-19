import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';

import placeholderImage from '../../../image-placeholder.jpeg'
import favoriteIcon from './favorite_border_black_48dp.svg'
import { useState, useEffect, useContext } from "react";
import { Col, FloatingLabel, Form, List, Row } from "react-bootstrap";

import StackedListIcon from "./StackedListIcon";
import RecipeList from "../../../model/recipeList";
import { AuthenticatedRequestWrapperContext } from '../../../App';
import { baseUrlRecipes } from '../../../config/config';

function Lists() {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const navigate = useNavigate();
    const [recipeList, setRecipeList] = useState(new RecipeList());
    const [saveRecipeListSuccess, setSaveRecipeListSuccess] = useState("");

    const [icon, setIcon] = useState();

    const [savedLists, setSavedLists] = useState();
    const [getListsSuccess, setGetListSuccess] = useState();

    useEffect(() => {
        if(false){
        setIcon(favoriteIcon);
    } else{
        setIcon(placeholderImage)
    }
      }, []);

    useEffect(() => {
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'list/my', 'GET', undefined, setSavedLists, setGetListSuccess, true)
    }, []);

    const handleChangeTitle = (event) => {
        let tmpRecipeList = recipeList;
        tmpRecipeList.title = event.target.value;
        setRecipeList(tmpRecipeList);
        console.log(recipeList);
    }

    const handleSave = (title) => {
        setSaveRecipeListSuccess("Waiting");
        let tmpRecipeList = recipeList;
        tmpRecipeList.title = title;
        console.log('Saving RecipeList:', tmpRecipeList);
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'list/new', 'POST', )
    }
    

    return(
        <>
        <Row>
        {savedLists ? savedLists.map((list, index) => (
            <Col key={index} style={{maxWidth: '12.75rem'}}>
                <Row className='mb-4'>
                    <StackedListIcon icon={icon} />
                </Row>
                <Row className='justify-content-center text-center'>
                    <FloatingLabel controlId="floatingTitle" label="Titel">
                        <Form.Control placeholder="Titel" onChange={(e) => handleChangeTitle(e)} value={list.title}/>
                    </FloatingLabel>
                </Row>
            </Col>
        )) : 'Es sind keine Listen vorhanden'}
        </Row>
        </>
    )
}

export default Lists;