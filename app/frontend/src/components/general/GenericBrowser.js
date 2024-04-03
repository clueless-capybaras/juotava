import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Col, FloatingLabel, Form, InputGroup, Row, Spinner } from 'react-bootstrap';

import RecipeCard from './RecipeCard';

function GenericBrowser({recipeExcerpts, loadRecipeExcerptsSuccess, setSearch}) {
    const navigate = useNavigate();
    const handleOpenRecipe = ((uuid) => {
        navigate('/browser/recipe/'+uuid);
    });
    const handleOpenComposer = (() => {
        navigate('/composer');
    });

    //
    //  Search
    //

    const [tempSearch, setTempSearch] = useState("");
    const handleSearchChange = (event) => {
        setTempSearch(event.target.value);
        
    }
    const handleSearch = (event) => {
        if (event.key === 'Enter' || event.type === 'click') {
            if (tempSearch === '') {
                setSearch("");
            } else {
                setSearch("?search="+encodeURIComponent(tempSearch));
            }
        }
    }

    return(
        <>
        {/* Search */}
        <Row className="mb-3 justify-content-end">
            <Col xs={3}>
                <InputGroup>
                    <FloatingLabel label="Suche">
                        <Form.Control type="text" placeholder="Suche" onChange={(event) => handleSearchChange(event)} onKeyDown={(event) => handleSearch(event)} />
                    </FloatingLabel>
                    <InputGroup.Text onClick={(event) => handleSearch(event)} style={{cursor: "pointer"}}><span className="material-icons">search</span></InputGroup.Text>
                </InputGroup>
            </Col>
        </Row>
        {/* Recipe Cards */}
        {loadRecipeExcerptsSuccess === 'waiting' ?
            <h4 className="text-center my-5">
                Lade Rezepte <br />
                <Spinner animation="border" role="status" />
            </h4>
        : ''
        }
        {loadRecipeExcerptsSuccess === 'error' ?
            <h4 className="text-center my-5">
                Beim Laden der Rezepte ist ein Fehler aufgetreten, das tut uns leid!
            </h4>
        : ''
        }
        {loadRecipeExcerptsSuccess === 'success' ? ( recipeExcerpts.length === 0 ? 
            <Row>
                <Col>
                    <h4 className="text-center my-5">
                        Wir konnten leider keine passenden Rezepte finden...
                    </h4>
                </Col>
            </Row>
        : (
            recipeExcerpts?.map((excerpt, index) => {
                return(
                    <Row key={index} className="mb-3" style={{margin: 0}}>
                        <Col>
                            <RecipeCard 
                                id={excerpt.uuid} 
                                handleClick={() => handleOpenRecipe(excerpt.uuid)} 
                                recipeExcerpt={excerpt}
                            />
                        </Col>
                    </Row>
                );
            })
        ))
        : null}
        </>
    );
}

export default GenericBrowser;