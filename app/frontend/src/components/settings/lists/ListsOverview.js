import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';

import placeholderImage from '../../../image-placeholder.jpeg'
import favoriteIcon from '../../../icons/favorite_border_black_48dp.svg'
import { useState, useEffect, useContext } from "react";
import { Col, FloatingLabel, Form, Row, Spinner } from "react-bootstrap";

import StackedListIcon from "./StackedListIcon";
import RecipeList from "../../../model/recipeList";
import { AuthenticatedRequestWrapperContext } from '../../../App';
import { baseUrlRecipes } from '../../../config/config';

function Lists() {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const navigate = useNavigate();
    const [recipeList, setRecipeList] = useState(new RecipeList());

    const [loadRecipeListSuccess, setLoadRecipeListSuccess] = useState("");
    const [saveRecipeListSuccess, setSaveRecipeListSuccess] = useState("");

    const [icon, setIcon] = useState();

    const [savedLists, setSavedLists] = useState([]);

    useEffect(() => {
        if(false){
            setIcon(favoriteIcon);
        } else{
            setIcon(placeholderImage);
        }
      }, []);

    useEffect(() => {
        setLoadRecipeListSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'list/my', 'GET', undefined, setSavedLists, setLoadRecipeListSuccess, true)
    }, []);

    const handleChangeTitle = (event) => {
        let tmpRecipeList = recipeList;
        tmpRecipeList.title = event.target.value;
        setRecipeList(tmpRecipeList);
    }

    const handleSave = (title) => {
        setSaveRecipeListSuccess("waiting");
        let tmpRecipeList = recipeList;
        tmpRecipeList.title = title;
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'list/new', 'POST', )
    }
    
    return(
        <>
        <Row>
            {loadRecipeListSuccess === 'waiting' ? 
                <h4 className="text-center my-5">
                    Lade Listen <br />
                    <Spinner animation="border" role="status" />
                </h4>
            : ''
            }
            {loadRecipeListSuccess === 'error' ?
                <h4 className="text-center my-5">
                    Beim Laden der Listen ist ein Fehler aufgetreten, das tut uns leid!
                </h4>
            : ''
            }
            {loadRecipeListSuccess === 'success' ?
                (savedLists.length > 0) ? savedLists.map((list, index) => (
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
                )) : 'Es sind bisher keine Listen erstellt worden'
            : ''
            }
        </Row>
        </>
    )
}

export default Lists;