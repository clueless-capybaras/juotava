import { useCallback, useState } from "react";

import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { ReactTags } from 'react-tag-autocomplete';

function TagField() {

    const [selected, setSelected] = useState([]);

    const onAdd = useCallback(
        (newTag) => {
            setSelected([...selected, newTag])
        },
        [selected]
    )

    const onDelete = useCallback(
        (tagIndex) => {
          setSelected(selected.filter((_, i) => i !== tagIndex))
        },
        [selected]
      )

    return(
        <>

            <ReactTags
                labelText="Tags"
                placeholder="Tags"
                selected={selected}
                onAdd={onAdd}
                onDelete={onDelete}
                noOptionsText="keine passenden Tags gefunden"
                className=""
            />

        </>
    );
}

export default TagField;