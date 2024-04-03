import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';

import { useState, useEffect, useContext } from "react";
import { Button, Col, Container, FloatingLabel, Form, Modal, Row, Spinner } from "react-bootstrap";

import StackedListIcon from "./StackedListIcon";
import { AuthenticatedRequestWrapperContext } from '../../../App';
import { baseUrlRecipes } from '../../../config/config';

function ListsOverview() {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const navigate = useNavigate();
    const [recipeListId, setRecipeListId] = useState();

    const [loadRecipeListSuccess, setLoadRecipeListSuccess] = useState("");
    const [saveRecipeListSuccess, setSaveRecipeListSuccess] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [modalData, setModalData] = useState("");

    const [savedLists, setSavedLists] = useState([]);
    const [editMode, setEditMode] = useState(false);

    const handleTitleInput = (event) => {
        setModalData(event.target.value);
    }

    const validateSaveButton = () => {
        if (modalData !== undefined && modalData.trim() !== "") {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        if (saveRecipeListSuccess === "success" || saveRecipeListSuccess === "") {
            setLoadRecipeListSuccess('waiting');
            arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'list/my', 'GET', undefined, setSavedLists, setLoadRecipeListSuccess, true);   
        }
      }, [saveRecipeListSuccess]);

    const handleNewList = () => {
        setEditMode(false);
        setModalData("");
        setShow(true);
    };

    const handleEditList = (title, uuid) => {
        setEditMode(true);
        setModalData(title);
        setRecipeListId(uuid);
        setShow(true);
    }

    const handleUpdate = () => {
        setSaveRecipeListSuccess("waiting");
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'list/save/' + recipeListId, 'POST', modalData, undefined, setSaveRecipeListSuccess, true);
        setShow(false);
    }

    const handleNew = () => {
        setSaveRecipeListSuccess("waiting");
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'list/new', 'POST', modalData, undefined, setSaveRecipeListSuccess, false);
        setShow(false);
    }

    const handleSave = (event) => {
        if ((event.key === 'Enter' || event.type === 'click') && validateSaveButton()) {
            if(editMode){
                handleUpdate();
            } else {
                handleNew();
            }
        }
    }

    const handleOpenList = (uuid) => {
        navigate('/settings/lists/' + uuid);
    }
    
    return(
        <Container>
        <Row>
                {loadRecipeListSuccess === 'waiting' ? 
                    <Col>
                        <h4 className="text-center my-5">
                            Lade Listen <br />
                            <Spinner animation="border" role="status" />
                        </h4>
                    </Col>
                : ''
                }
                {loadRecipeListSuccess === 'error' ?
                    <Col>
                        <h4 className="text-center my-5">
                            Beim Laden der Listen ist ein Fehler aufgetreten, das tut uns leid!
                        </h4>
                    </Col>
                : ''
                }
                {loadRecipeListSuccess === 'success' ?
                    (savedLists.length > 0) ? savedLists.map((list, index) => (
                        <Col key={index} style={{maxWidth: '12.75rem'}}>
                            <Row className='mb-4' onClick={() => handleOpenList(list.uuid)}>
                                <StackedListIcon thumbnails={list.thumbnails} favorite={list.title == 'Favoriten'} />
                            </Row>
                            <Row className='justify-content-center text-center'>
                                <Col sm='8'>
                                    {list.title}
                                </Col>
                                <Col sm='4'>
                                    <Button variant='link' size='sm' onClick={() => handleEditList(list.title, list.uuid)}>
                                        <span className='material-icons'>
                                            edit
                                        </span>
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    )) : 'Es sind bisher keine Listen erstellt worden'
                : ''
                }
            <Col>
                <Button variant="primary" size="lg" onClick={handleNewList}>+</Button>
            </Col>
            <Modal
                show={show} 
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Listentitel ändern
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <FloatingLabel controlId="floatingTitle" label="Titel">
                                <Form.Control placeholder="Titel" value={modalData} maxLength={30} onKeyDown={(event) => handleSave(event)} onChange={(event) => handleTitleInput(event)}/>
                            </FloatingLabel>
                            <Form.Text className="text-muted">
                                {modalData?modalData.length:0}/30 Zeichen
                            </Form.Text>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Abbrechen</Button>
                    <Button variant="primary" disabled={!validateSaveButton()} onClick={(event) => handleSave(event)}>Speichern</Button>
                </Modal.Footer>
            </Modal>
        </Row>
        </Container>
    )
}

export default ListsOverview;