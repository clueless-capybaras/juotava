import { useEffect, useState } from 'react';
import './StackedListIcon.css'
import { Container, Image } from 'react-bootstrap';
import placeholderImage from '../../../image-placeholder.jpeg'
import favoriteIcon from '../../../icons/favorite.png'

function StackedListIcon({thumbnails, favorite}){
    const [images, setImages] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    useEffect(() => {
        setImages(thumbnails);
        setIsFavorite(favorite);
    }, [thumbnails, favorite]);

    const useImageOrPlaceholder = (image, index) => {
        if(index === 0){
            if(isFavorite){
                return favoriteIcon;
            } else if(image && image.base64data && image.base64data !== ""){
                return image.base64data;
            }
        } else if(image && image.base64data && image.base64data !== ""){
            return image.base64data;
        }
        return placeholderImage;
    }

    return(
        <Container>
            <div className="parent">
                <Image className="image1" src={useImageOrPlaceholder(images[2], 2)} rounded style={{maxWidth:'9rem'}}/>
                <Image className="image2" src={useImageOrPlaceholder(images[1], 1)} rounded style={{maxWidth:'9rem'}}/>
                <Image className="image3" src={useImageOrPlaceholder(images[0], 0)} rounded style={{maxWidth:'9rem'}}/>
            </div>
        </Container>
    )
}
export default StackedListIcon;
    