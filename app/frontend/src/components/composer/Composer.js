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
    const [recipe, setRecipe] = useState(new Recipe());
    const [saveRecipeSuccess, setSaveRecipeSuccess] = useState("");
    const [uuid, setUuid] = useState();

    const handleChangeImage = (data) => {
        let tmpRecipe = recipe;
        tmpRecipe.image = data;
        setRecipe(tmpRecipe);
        //console.log(recipe);
    }

    const handleChangeTitle = (event) => {
        let tmpRecipe = recipe;
        tmpRecipe.title = event.target.value;
        setRecipe(tmpRecipe);
        //console.log(recipe);
    }

    const handleChangeCategory = (event) => {
        let tmpRecipe = recipe;
        tmpRecipe.category = event.target.value;
        setRecipe(tmpRecipe);
        //console.log(recipe);
    }

    const handleChangeNonAlcoholic = (event) => {
        let tmpRecipe = recipe;
        tmpRecipe.nonAlcoholic = event.target.checked;
        setRecipe(tmpRecipe);
        //console.log(recipe);
    }

    const handleChangeDescription = (event) => {
        let tmpRecipe = recipe;
        tmpRecipe.description = event.target.value;
        setRecipe(tmpRecipe);
        //console.log(recipe);
    }

    const handleChangeIngredients = (data) => {
        let tmpRecipe = recipe;
        tmpRecipe.ingredients = data;
        setRecipe(tmpRecipe);
        //console.log(recipe);
    }

    const handleChangeSteps = (data) => {
        let tmpRecipe = recipe;
        tmpRecipe.steps = data;
        setRecipe(tmpRecipe);
        //console.log(recipe);
    }

    const handleSave = (draft) => {
        setSaveRecipeSuccess("waiting");
        let tmpRecipe = recipe;
        tmpRecipe.draft = draft;
        tmpRecipe.createdBy = user.sub;
        console.log('Saving Recipe:', tmpRecipe);
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'recipe/save', 'POST', JSON.stringify(tmpRecipe), setUuid, setSaveRecipeSuccess, true);
    }

    const handleOpenRecipe = (uuid) => {
        navigate('/browser/recipe/'+uuid);
    }

    return(
        <>
        <h1 className="text-center mb-5">Composer</h1>
        <Container className="mb-5">
            <Row className="justify-content-center mb-3">
                <ImageUploaderComposer handleChangeFunction={handleChangeImage} />
            </Row>

            <Row className="justify-content-center mb-3">
                <Col xs="6" sm="6" md="6">
                    <FloatingLabel controlId="floatingTitle" label="Titel">
                        <Form.Control placeholder="Titel" onChange={(e) => handleChangeTitle(e)} value={recipe.title}
                            maxLength={255}
                        />
                    </FloatingLabel>
                </Col>
                <Col xs="2" sm="2" md="2">
                </Col>
            </Row>

            <Row className="justify-content-center mb-3">
                <Col xs="6" sm="6" md="6">
                    <FloatingLabel controlId="floatingCategory" label="Kategorie wählen...">
                        <Form.Select placeholder="Kategorie wählen..." onChange={(e) => handleChangeCategory(e)} value={recipe.category}>
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
                        <Form.Control as="textarea" placeholder="Beschreibung" style={{height: "5rem"}} onChange={(e) => handleChangeDescription(e)} value={recipe.description}
                            maxLength={500}
                        />
                        <Form.Text className="text-muted">
                            {recipe.description.length}/500 characters
                        </Form.Text>
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
                    <Button variant="primary" className="me-1" onClick={() => handleSave(false)}>Veröffentlichen</Button>
                    <Button variant="secondary" onClick={() => handleSave(true)}>Entwurf speichern</Button>
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