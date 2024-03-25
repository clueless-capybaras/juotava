import './StackedListIcon.css'
import { Container, Image } from 'react-bootstrap';

function StackedListIcon(props){
    return(
        <Container>
            <div className="parent">
                <Image className="image1" src={props.icon} rounded style={{maxWidth:'10rem'}}/>
                <Image className="image2" src={props.icon} rounded style={{maxWidth:'10rem'}}/>
                <Image className="image3" src={props.icon} rounded style={{maxWidth:'10rem'}}/>
            </div>
        </Container>
    )
}
export default StackedListIcon;
    