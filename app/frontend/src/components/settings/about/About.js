import { Accordion, Card, Col, Container, Image, Row } from 'react-bootstrap';

import github from '../../../icons/github-mark.svg';
import instagram from '../../../icons/instagram-mark.png';
import twitter from '../../../icons/x-mark.webp';
import linkedin from '../../../icons/linkedin-mark.png';

function About(props) {
    
    return (
        <>
        <h1>Über</h1>
        
        <Container className="mb-5">
            <Card>
            <Card.Body>
            <h2>Features</h2>
            <Row>
                <Col>
                    <p>
                    With Juotava, we provide a tool for exploring and creating your favorite drinks. Whether you are a beginner or a professional bartender, Juotava is the perfect app for you. It offers a wide range of features to find the next drink you want to prepare. The app is available on all devices via your browser. You can also save it to the home screen of your smartphone or tablet. After loading a page once, you can access it even when you are offline.
                    </p>
                    <p>
                    Use Juotava now to bring your morning routine or your next party to another level!
                    </p>
                    <Accordion>
                        <Accordion.Item eventKey="browser">
                            <Accordion.Header>Browser</Accordion.Header>
                            <Accordion.Body>
                                With the Browser, finding drinks is easy.
                                <ul>
                                    <li>
                                        You can find drinks that can be made with the ingredients you have at home.
                                    </li>
                                    <ul>
                                        <li>
                                            If you cannot find a drink with these ingredients, an AI prepares a recipe of a drink that could be made with the ingredients.
                                        </li>
                                        <li>
                                            The AI generated recipe is editable and publishable.
                                        </li>
                                    </ul>
                                    <li>
                                        With individual favorites and other lists, you can save drinks and recipes for different occasions.
                                    </li>
                                    <li>
                                        Thanks to the rating system, you can find drinks that are similar to the ones you liked and that are popular among other users.
                                    </li>
                                    <li>
                                        A wide range of filters and search options help you finding the perfect drink.
                                    </li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="composer">
                            <Accordion.Header>Composer</Accordion.Header>
                            <Accordion.Body>
                                The Composer is the perfect tool for creating and editing drinks.
                                <ul>
                                    <li>
                                        When you are adding ingredients to the recipe, the list expands dynamically.
                                    </li>
                                    <li>
                                        In addition to the ingredients, you need to describe the preparation process.
                                    </li>
                                    <li>
                                        You should always add at least one image that illustrate your drink.
                                    </li>
                                    <ul>
                                        <li>
                                            If you do not have an image, an AI generates an image based on the ingredients and the preparation process.
                                        </li>
                                        <li>
                                            You can choose between different AI generated images.
                                        </li>
                                    </ul>
                                    <li>
                                        Unfinished drinks can be saved as a draft and edited later.
                                    </li>
                                    <li>
                                        Finished drinks can be published and are editable.
                                    </li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="bartinder">
                            <Accordion.Header>Bartinder</Accordion.Header>
                            <Accordion.Body>
                                Bartinder is a whole new way to discover recipes.
                                <ul>
                                    <li>
                                        When you are using Bartinder for the first time, you will be asked to set up your preferences. You can always change these settings.
                                    </li>
                                    <li>
                                        Bartinder suggests random drink based on these preferences.
                                    </li>
                                    <li>
                                        You can swipe through the suggestions, left for dislike and right for like.
                                    </li>
                                    <li>
                                        It's a match! Your liked drinks are saved to a personal list.
                                    </li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
            </Card.Body>
            </Card>
        </Container>
        <Container className="">
            <Card>
            <Card.Body>
            <h2>Devs</h2>
            <Row>
                <Col>
                    <p>
                    Hab gestern schon wieder wie so nen achtarmiger mir einen reingeorgelt! Mit GerHARD. Wir war'n richtig verklüngelt alda! Heute morgen bisschen zerknittert, awa ich geb euch nen Tipps: Ein Ei, vier Zigaretten, eine Ibuprofen, dazu ein Rosinenbrötchen mit Leberwurst und dann kommt Bier ins Spiel. Und dann geht es schon! Ich bin jetzt beim dritten angelangt, und, alles wieder normaaal. Faktor wieder drinne!!
                    </p>
                </Col>
                <Col>
                    <Row>
                        <a href="https://github.com/EhrlerL/juotava" target="_blank" rel="noreferrer" className="d-flex align-items-center"><Image src={github} style={{maxHeight: "2vh"}} className="me-1" />GitHub</a>
                    </Row>
                    <Row>
                        <a href="https://www.instagram.com/jimseven/" target="_blank" rel="noreferrer" className="d-flex align-items-center"><Image src={instagram} style={{maxHeight: "2vh"}} className="me-1" />Instagram</a>
                    </Row>
                    <Row>
                        <a href="https://juotava.mush-it.com/" target="_blank" rel="noreferrer" className="d-flex align-items-center"><Image src={twitter} style={{maxHeight: "2vh"}} className="me-1" />X ehemals Twitter</a>
                    </Row>
                    <Row>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="d-flex align-items-center"><Image src={linkedin} style={{maxHeight: "2vh"}} className="me-1" />LinkedIn</a>
                    </Row>
                </Col>
            </Row>
            </Card.Body>
            </Card>
        </Container>
        </>

    );
}
export default About;