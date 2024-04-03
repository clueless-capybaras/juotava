import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useAuth0 } from '@auth0/auth0-react';
import { AuthenticatedRequestWrapperContext } from '../../App';
import { baseUrlRecipes } from '../../config/config';

import { Button, Col, Container, FloatingLabel, Form, InputGroup, Row, Spinner } from 'react-bootstrap';

import ImageUploaderComposer from './ImageUploaderComposer';
import IngredientList from './IngredientList';
import PrepList from './PrepList';
import Recipe from '../../model/recipe';

import { getDrinkCategories } from '../../helperFunctions/getDrinkCategories';


function Composer() {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const navigate = useNavigate();
    const { editUuid } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [recipe, setRecipe] = useState(new Recipe(
        '', '', 'COCKTAIL', '', '', [], [], {prompt: '', basebase64data: ''}, ''
    ));
    const [loadRecipeSuccess, setLoadRecipeSuccess] = useState("");
    const [saveRecipeSuccess, setSaveRecipeSuccess] = useState("");
    const [uuid, setUuid] = useState();

    const handleChangeImage = (data) => {
        setRecipe({...recipe, image: data})
    }

    const handleChangeTitle = (event) => {
        setRecipe({...recipe, title: event.target.value});
    }

    const handleChangeCategory = (event) => {
        setRecipe({...recipe, category: event.target.value});
    }

    const handleChangeNonAlcoholic = (event) => {
        setRecipe({...recipe, nonAlcoholic: event.target.checked});
    }

    const handleChangeDescription = (event) => {
        setRecipe({...recipe, description: event.target.value});
    }

    const handleChangeIngredients = (data) => {
        setRecipe({...recipe, ingredients: data});
    }

    const handleChangeSteps = (data) => {
        setRecipe({...recipe, steps: data});
    }

    const handleSave = (draft) => {
        if (recipe.image === undefined || recipe.image.base64data === undefined || recipe.image.basebase64data === '') {
            setShowModal(true);
            return;
        }
        setSaveRecipeSuccess("waiting");
        let tmp = {...recipe};
        tmp.draft = draft;
        tmp.createdBy = user.sub;
        setRecipe((prevRecipe) => ({...prevRecipe, draft: draft, createdBy: user.sub}));
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'recipe/save', 'POST', JSON.stringify(tmp), setUuid, setSaveRecipeSuccess, true);
    }

    const validateRecipe = (recipe) => {
        return (recipe.title === "" || recipe.title === undefined || recipe.title === null 
            || recipe.category === "" || recipe.category === undefined || recipe.category === null
            || recipe.description === "" || recipe.description === undefined || recipe.description === null
            || recipe.ingredients.length === 0 || recipe.ingredients[0].name === "" || recipe.ingredients[0].name === undefined || recipe.ingredients[0].name === null
            || recipe.steps.length === 0 || recipe.steps[0].description === "" || recipe.steps[0].description === undefined || recipe.steps[0].description === null)
            ? false : true;
    }

    const handleOpenRecipe = (uuid) => {
        navigate('/browser/recipe/'+uuid);
    }

    useState(() => {
        if (editUuid !== undefined) {
            setLoadRecipeSuccess('waiting');
            arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'recipe/'+ encodeURIComponent(editUuid), 'GET', undefined, setRecipe, setLoadRecipeSuccess, false);
        }
    }, []);

    return(
        <>
        <h1 className="text-center mb-5">Composer</h1>
        {loadRecipeSuccess === 'waiting' ?
            <h4 className="text-center my-5">
                <Spinner animation="border" role="status" />
            </h4>
            : loadRecipeSuccess === 'error' ?
            <h4 className="text-center my-5">
                Beim Laden des Rezepts ist ein Fehler aufgetreten, das tut uns leid!
            </h4>
            : <>
            <Container fluid className="mb-5">
                <Row className="justify-content-center">
                    <Col xs="12" sm="12" md="4">
                        <Row className="mb-3">
                            <ImageUploaderComposer handleChangeFunction={handleChangeImage} recipe={recipe} validationFunction={validateRecipe} isAuthenticated={isAuthenticated} getAccessTokenSilently={getAccessTokenSilently} user={user} showModal={showModal} setShowModal={setShowModal} />
                        </Row>
                    </Col>
                    <Col xs="12" sm="9" md="4">
                        <Row className="justify-content-center mb-3">
                            <Col>
                                <FloatingLabel controlId="floatingTitle" label="Titel">
                                    <Form.Control placeholder="Titel" onChange={(e) => handleChangeTitle(e)} value={recipe.title}
                                        maxLength={255}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <InputGroup>
                                    <FloatingLabel controlId="floatingCategory" label="Kategorie">
                                        <Form.Select placeholder="Kategorie" onChange={(e) => handleChangeCategory(e)} value={recipe.category!==''?recipe.category:'COCKTAIL'}>
                                            {getDrinkCategories().map((category, key) => {
                                                return <option key={key} value={category.id}>{category.label}</option>
                                            })}
                                        </Form.Select>
                                    </FloatingLabel>
                                    <InputGroup.Checkbox id="nonAlcoholicCb" type="checkbox" label="alkoholfrei" onChange={(e) => handleChangeNonAlcoholic(e)}  checked={recipe.nonAlcoholic}/>
                                    <InputGroup.Text onClick={() => document.getElementById("nonAlcoholicCb").click()}>alkoholfrei</InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>

                        <Row className="justify-content-center mb-3">
                            <Col>
                                <FloatingLabel label="Beschreibung" className="mb-3">
                                    <Form.Control as="textarea" placeholder="Beschreibung" style={{height: "5rem"}} onChange={(e) => handleChangeDescription(e)} value={recipe.description}
                                        maxLength={500}
                                    />
                                    <Form.Text className="text-muted">
                                        {recipe.description?recipe.description.length:0}/500 Zeichen
                                    </Form.Text>
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <h3 className="text-center">Zutatenliste</h3>
                <IngredientList recipe={recipe} handleFunction={handleChangeIngredients} />

                <h3 className="text-center">Zubereitung</h3>
                <PrepList recipe={recipe} handleFunction={handleChangeSteps} />
            </Container>

            <Container className="text-center mb-5">
                <Row className="justify-content-center mb-3">
                    <Col xs="8">
                        <Button variant="primary" className="me-1" disabled={!validateRecipe(recipe)} onClick={() => handleSave(false)}>Veröffentlichen</Button>
                        <Button variant="secondary" disabled={!validateRecipe(recipe)} onClick={() => handleSave(true)}>Entwurf speichern</Button>
                    </Col>
                </Row>
                <Row className="justify-content-center mb-3">
                    <Col xs="8">
                        {saveRecipeSuccess === "waiting" ? 
                            <Spinner animation="border" role="status" />
                        : null}
                        {saveRecipeSuccess === "success" ? 
                            handleOpenRecipe(uuid)
                        : null}
                        {saveRecipeSuccess === "error" ? 
                            <div>Speichern fehlgeschlagen</div>
                        : null}
                    </Col>
                </Row>
            </Container>
        </>}
        </>
    );
}

export default Composer;