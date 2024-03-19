import { useContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import ImageUploaderComposer from './ImageUploaderComposer';
import IngredientList from './IngredientList';
import PrepList from './PrepList';
import TagField from './TagField';

import Recipe from '../../model/recipe';
import { AuthenticatedRequestWrapperContext } from '../../App';
import { baseUrlRecipes } from '../../config/config';


function Composer() {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(new Recipe(
        '', '', 'Cocktail', '', '', [], [], {prompt: '', basebase64data: ''}, ''
    ));
    const [saveRecipeSuccess, setSaveRecipeSuccess] = useState("");
    const [uuid, setUuid] = useState();

    const handleChangeImage = (data) => {
        setRecipe({...recipe, image: data})
        //console.log(recipe);
    }

    const handleChangeTitle = (event) => {
        setRecipe({...recipe, title: event.target.value});
        //console.log(recipe);
    }

    const handleChangeCategory = (event) => {
        setRecipe({...recipe, category: event.target.value});
        //console.log(recipe);
    }

    const handleChangeNonAlcoholic = (event) => {
        setRecipe({...recipe, nonAlcoholic: event.target.checked});
        //console.log(recipe);
    }

    const handleChangeDescription = (event) => {
        setRecipe({...recipe, description: event.target.value});
        //console.log(recipe);
    }

    const handleChangeIngredients = (data) => {
        setRecipe({...recipe, ingredients: data});
        //console.log(recipe);
    }

    const handleChangeSteps = (data) => {
        setRecipe({...recipe, steps: data});
        //console.log(recipe);
    }

    const handleSave = (draft) => {
        setSaveRecipeSuccess("waiting");
        //setRecipe({...recipe, draft: draft, createdBy: user.sub});
        let tmp = {...recipe};
        tmp.draft = draft;
        tmp.createdBy = user.sub;
        setRecipe((prevRecipe) => ({...prevRecipe, draft: draft, createdBy: user.sub}));
        console.log('Saving Recipe:', tmp);
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
        //console.log('Open Recipe:', uuid);
        navigate('/browser/recipe/'+uuid);
    }

    return(
        <>
        <h1 className="text-center mb-5">Composer</h1>
        <Container className="mb-5">
            <Row className="justify-content-center mb-3">
                <ImageUploaderComposer handleChangeFunction={handleChangeImage} recipe={recipe} validationFunction={validateRecipe} isAuthenticated={isAuthenticated} getAccessTokenSilently={getAccessTokenSilently} user={user} />
            </Row>

            <Row className="justify-content-center mb-3">
                <Col xs="6" sm="6" md="6">
                    <FloatingLabel controlId="floatingTitle" label="Titel">
                        <Form.Control placeholder="Titel" onChange={(e) => handleChangeTitle(e)} value={recipe.title}/>
                    </FloatingLabel>
                </Col>
                <Col xs="2" sm="2" md="2">
                </Col>
            </Row>

            <Row className="justify-content-center mb-3">
                <Col xs="6" sm="6" md="6">
                    <FloatingLabel controlId="floatingCategory" label="Kategorie wählen...">
                        <Form.Select placeholder="Kategorie wählen..." onChange={(e) => handleChangeCategory(e)} value={recipe.category==''?recipe.category:'Cocktail'}>
                            <option>Cocktail</option>
                            <option>Kaffee</option>
                            <option>Limonade</option>
                            <option>Saft</option>
                            <option>Smoothie</option>
                            <option>Tee</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col xs="2" sm="2" md="2">
                    <Form.Check type="checkbox" label="alkoholfrei" onChange={(e) => handleChangeNonAlcoholic(e)}  value={recipe.nonAlcoholic}/>
                </Col>
            </Row>

            <Row className="justify-content-center mb-3">
                <Col xs="8" sm="8" md="8">
                    <FloatingLabel label="Beschreibung" className="mb-3">
                        <Form.Control as="textarea" placeholder="Beschreibung" style={{height: "5rem"}} onChange={(e) => handleChangeDescription(e)} value={recipe.description}/>
                    </FloatingLabel>
                </Col>
            </Row>
        </Container>

        <Container className="mb-5">
            <h3 className="text-center">Zutatenliste</h3>
            <Row className="justify-content-center mb-3">
                <Col>
                    <IngredientList handleFunction={handleChangeIngredients} />
                </Col>
            </Row>
        </Container>

        <Container className="mb-5">
            <h3 className="text-center">Zubereitung</h3>
            <Row className="justify-content-center mb-3">
                <Col>
                 <PrepList handleFunction={handleChangeSteps} />
                </Col>
            </Row>
        </Container>

        {/*<Container className="text-center mb-5">
            <Row className="justify-content-center mb-3">
                <Col>
                    <TagField />
                </Col>
            </Row>
        </Container>*/}

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
        </>
    );
}

export default Composer;