import { Container, Image } from 'react-bootstrap';

function StackedListIcon(props){
    return(
        <>
        <style>{`
            .parent {
                position: relative;
                top: 0;
                left: 0;
            }
            .image1 {
                position: relative;
                top: 0;
                left: 0;
                border: 1px #0F1A20 solid;
            }
            .image2 {
                position: absolute;
                top: 10px;
                left: 10px;
                border: 1px #0F1A20 solid;
            }
            .image3 {
                position: absolute;
                top: 20px;
                left: 20px;
                border: 1px #0F1A20 solid;
            }
        `}
        </style>

        <Container>
            <div className="parent">
                <Image className="image1" src={props.icon} rounded style={{maxWidth:'10rem'}}/>
                <Image className="image2" src={props.icon} rounded style={{maxWidth:'10rem'}}/>
                <Image className="image3" src={props.icon} rounded style={{maxWidth:'10rem'}}/>
            </div>
        </Container>
        </>
    )
}
export default StackedListIcon;
    