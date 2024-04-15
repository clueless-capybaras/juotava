import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { Col, FloatingLabel, Form, InputGroup, Row, Spinner } from 'react-bootstrap';

import RecipeCard from './RecipeCard';

function GenericBrowser({recipeExcerpts, loadRecipeExcerptsSuccess, search, setSearch, frontendSearch, inList, setInList, listId}) {
    const navigate = useNavigate();
    const handleOpenRecipe = ((uuid) => {
        navigate('/browser/recipe/'+uuid);
    });

    //
    //  SEARCH
    //
    
    const [displayedRecipeExcerpts, setDisplayedRecipeExcerpts] = useState([...recipeExcerpts]);
    const [currentSearchTerm, setCurrentSearchTerm] = useState('');
    const handleSearchChange = (event) => {
        setCurrentSearchTerm(event.target.value);
        
    }

    // Frontend Search

    const convertExcerptToString = (excerpt) => {
        return excerpt.title + "; " + excerpt.category + "; " + excerpt.description + "; " + excerpt.ingredients.map(ingredient => ingredient.name + ", ");
    }
    const calculatePriority = (excerpt, tempSearch) => {
        let searchTermArray = tempSearch.split(" "); // split search term into words
        let prio = 0;
        for (let term of searchTermArray) {
            if (convertExcerptToString(excerpt).toLowerCase().includes(term.toLowerCase())) { prio += 1; } // increase prio when recipe matches word
        }
        return prio;
    }
    const searchRecipeExcerpts = (tempSearch) => {
        let tempRecipeExcerpts = [...recipeExcerpts]; // copy recipeExcerpts
        tempRecipeExcerpts = tempRecipeExcerpts
            .map(excerpt => ({...excerpt, prio: calculatePriority(excerpt, tempSearch)})) // calculate prio for each excerpt
            .filter(excerpt => excerpt.prio > 0); // filter out excerpts with prio 0
        tempRecipeExcerpts.sort((a, b) => b.prio - a.prio); // sort by prio
        setDisplayedRecipeExcerpts(tempRecipeExcerpts);
    }


    useEffect(() => {

        setDisplayedRecipeExcerpts(recipeExcerpts);
        setCurrentSearchTerm(search);
        
    }, [recipeExcerpts]);


    const handleSearch = (event) => {
        if (event.key === 'Enter' || event.type === 'click') {
            // Frontend Search
            if (frontendSearch) {
                searchRecipeExcerpts(currentSearchTerm);
            } 
            // Backend Search
            else {
                setSearch(encodeURIComponent(currentSearchTerm));
            }
        }
    }       

    return(
        <>
        {/* Search */}
        <Row className="mb-3 justify-content-end" style={{margin: 0}}>
            <Col md={6} lg={5}>
                <InputGroup>
                    <FloatingLabel value={currentSearchTerm} label="Suche">
                        <Form.Control type="text" placeholder="Suche" value={currentSearchTerm} onChange={(event) => handleSearchChange(event)} onKeyDown={(event) => handleSearch(event)} />
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
        {loadRecipeExcerptsSuccess === 'success' ? ( displayedRecipeExcerpts.length === 0 ? 
            <Row>
                <Col>
                    <h4 className="text-center my-5">
                        Wir konnten leider keine Rezepte finden...
                    </h4>
                </Col>
            </Row>
        : (
            displayedRecipeExcerpts?.map((excerpt, index) => {
                return(
                    <Row key={index} className="mb-3" style={{margin: 0}}>
                        <Col>
                            <RecipeCard 
                                id={excerpt.uuid} 
                                handleClick={() => handleOpenRecipe(excerpt.uuid)} 
                                recipeExcerpt={excerpt}
                                inList={inList}
                                setInList={setInList}
                                listId={listId}
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