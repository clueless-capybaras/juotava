import { useEffect, useState } from 'react';
import './StackedListIcon.css'
import { Container, Image } from 'react-bootstrap';
import placeholderImage from '../../../image-placeholder.jpeg'

function StackedListIcon({thumbnails}){
    const [images, setImages] = useState([]);
    useEffect(() => {
        setImages(thumbnails);
    }, [thumbnails]);

    const useImageOrPlaceholder = (image) => {
        if(image && image.base64data && image.base64data !== ""){
            return image.base64data;
        } else {
            return placeholderImage;
        }
    }

    return(
        <Container>
            <div className="parent">
                <Image className="image1" src={useImageOrPlaceholder(images[0])} rounded style={{maxWidth:'10rem'}}/>
                <Image className="image2" src={useImageOrPlaceholder(images[1])} rounded style={{maxWidth:'10rem'}}/>
                <Image className="image3" src={useImageOrPlaceholder(images[2])} rounded style={{maxWidth:'10rem'}}/>
            </div>
        </Container>
    )
}
export default StackedListIcon;
    