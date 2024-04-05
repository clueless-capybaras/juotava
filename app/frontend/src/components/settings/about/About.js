import { Accordion, Card, Col, Container, Image, Row } from 'react-bootstrap';

import github from '../../../icons/github-mark.svg';
import instagram from '../../../icons/instagram-mark.png';
import twitter from '../../../icons/x-mark.webp';
import linkedin from '../../../icons/linkedin-mark.png';

function About(props) {
    
    return (
        <>
        <h1>Über Uns</h1>
        
        <Container className="mb-5">
            <Row>
                <Col>
                    <h2>Features</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>
                        Juotava ist eine Rezept-App, die perfekt auf Getränke abgestimmt wurde. Du kannst verschiedenste Rezepte finden, speichern und teilen. Und wenn nichts für dich dabei ist, kannst du dir mit Bartinder ganz einfach Rezepte vorschlagen lassen oder im Composer dein eigenes hochladen. 
                    </p>
                    <p>
                        Weil KI cool ist, machen wir das auch. Wenn du kein Bild zu deinem Rezept hast, kannst du eines generieren. Bartinder schlägt dir Rezepte vor, die zu deinen Vorlieben passen. Den Drink des Tages sucht sich GPT persönlich aus.
                    </p>
                    <Accordion>
                        <Accordion.Item eventKey="browser">
                            <Accordion.Header>Browser</Accordion.Header>
                            <Accordion.Body>
                                Rezepte finden war noch nie so einfach.
                                <ul>
                                    <li>
                                        Eine Vielzahl von Filtern und Suchoptionen helfen dir, das perfekte Getränk zu finden.
                                    </li>
                                    <li>
                                        Dank hoher Performance musst du nicht lange auf ein Ergebnis warten.
                                    </li>
                                    <li>
                                        Mit individuellen Favoriten und anderen Listen kannst du Getränke und Rezepte für verschiedene Anlässe speichern.
                                    </li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="composer">
                            <Accordion.Header>Composer</Accordion.Header>
                            <Accordion.Body>
                                Der Composer ist das perfekte Tool, um Drinks zu erstellen und zu bearbeiten.
                                <ul>
                                    <li>
                                        Es nervt, wenn ein Rezept ohne Bild hochgeladen wird. Wir haben die Lösung:
                                    </li>
                                    <ul>
                                        <li>
                                            Wenn du kein Bild hast, generiert eine KI ein Bild anhand der Zutaten und des Zubereitungsprozesses.
                                        </li>
                                        <li>
                                            Wenn du mit dem Bild nicht zufriden bist, kannst du es erneut generieren lassen.
                                        </li>
                                    </ul>
                                    <li>
                                        Unfertige Rezepte können als Entwurf gespeichert und später bearbeitet werden.
                                    </li>
                                    <li>
                                        Fertige Rezepte können veröffentlicht und wieder bearbeitet werden.
                                    </li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="bartinder">
                            <Accordion.Header>Bartinder</Accordion.Header>
                            <Accordion.Body>
                                Hättest du gedacht, dass du mal Getränke daten würdest?
                                <ul>
                                    <li>
                                        Du kannst in Bartinder deine Vorlieben festlegen. Diese Einstellungen kannst du jederzeit ändern.
                                    </li>
                                    <li>
                                        Bartinder schlägt dir zufällige Rezepte vor, die zu diesen Vorlieben passen.
                                    </li>
                                    <li>
                                        Du kannst durch die Vorschläge swipen, links für Dislike und rechts für Like.
                                    </li>
                                    <li>
                                        It's a match! Deine gelikten Getränke werden in deinen Favoriten gespeichert.
                                    </li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
        </Container>
        <Container className="">
            <Row>
                <Col>
                    <h2>Devs</h2>
                </Col>
            </Row>
            <Row>
                <Col sm={9}>
                    <p>
                        Juotava wurde ursprünglich von einem Team aus drei Studierenden der DHBW Karlsruhe entwickelt. Als Studienarbeit wurde die Open Beta im Sommer 2024 veröffentlicht. Seitdem wird die App stetig weiterentwickelt und verbessert.
                    </p>
                    <p>
                        Heute ist Juotava die weltweit größte Rezept-App für Getränke. Mit über 1.000.000 Rezepten und 10.000.000 Nutzern ist Juotava die erste Anlaufstelle für alle, die auf der Suche nach dem perfekten Drink sind. Das milliardenschwere Unternehmen hinter der App "Capybara Corp." entwickelt inzwischen auch andere Apps, z.B. Juotava for Pros, Canteen Manager und Community Dashboards für Universitäten weltweit.
                    </p>
                </Col>
                <Col sm={3}>
                    <Row>
                        <Col>
                            <a href="https://github.com/EhrlerL/juotava" target="_blank" rel="noreferrer" className="d-flex align-items-center"><Image src={github} style={{maxHeight: "2vh"}} className="me-1" />GitHub</a>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <a href="https://www.instagram.com/jimseven/" target="_blank" rel="noreferrer" className="d-flex align-items-center"><Image src={instagram} style={{maxHeight: "2vh"}} className="me-1" />Instagram</a>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <a href="https://twitter.com/Markus_Soeder" target="_blank" rel="noreferrer" className="d-flex align-items-center"><Image src={twitter} style={{maxHeight: "2vh"}} className="me-1" />X ehemals Twitter</a>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <a href="https://www.linkedin.com/in/markus-soeder/?originalSubdomain=de" target="_blank" rel="noreferrer" className="d-flex align-items-center"><Image src={linkedin} style={{maxHeight: "2vh"}} className="me-1" />LinkedIn</a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        </>

    );
}
export default About;