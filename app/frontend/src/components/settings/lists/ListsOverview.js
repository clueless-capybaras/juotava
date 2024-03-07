import StackedListIcon from "./StackedListIcon";

import placeholderImage from '../../../image-placeholder.jpeg'
import favoriteIcon from './favorite_border_black_48dp.svg'
import { useState, useEffect } from "react";

function Lists() {

    const [icon, setIcon] = useState();
    useEffect(() => {
        if(false){
        setIcon(favoriteIcon);
    } else{
        setIcon(placeholderImage)
    }
      }, []);
    

    return(
        <>
            <StackedListIcon icon={icon} />
        </>
    )
}

export default Lists;