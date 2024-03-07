import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import imgplaceholder from '../../image-placeholder.jpeg';
import { useState } from 'react';

function ImageUploaderComposer({handleChangeFunction}) {

    const [image, setImage] = useState();
    const handleImageChangeUpload = async (e) => {
        let base64File = await convertToBase64(e.target.files[0]);
        setImage(base64File);
        handleChangeFunction(
            {
                prompt: '',
                base64data: base64File,
            });
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return(
        <Container className='text-center'>
            <Row>
                <Col>
                <Image src={image? image : imgplaceholder} style={{maxHeight: 250, maxWidth: 250}} className="mb-3" rounded />
                </Col>
            </Row>
            <Row>
                <Col>
                <Button variant="primary" className="me-1" onClick={()=> document.getElementById('uploadInput').click()}>Hochladen</Button>
                <input id='uploadInput' hidden type="file"
                        accept='image/*, capture=camera'
                        onChange={(e) => handleImageChangeUpload(e)} />
                <Button variant="secondary">Generieren</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ImageUploaderComposer;