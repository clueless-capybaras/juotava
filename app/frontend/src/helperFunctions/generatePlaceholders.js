import Placeholder from 'react-bootstrap/Placeholder';

export function generatePlaceholders(amount, minSize, maxSize) {
    let sizes = [];
    for (let i = 0; i < amount; i++) {
        let size = getRandomInt(minSize, maxSize);
        sizes.push(size);
    }
    return (
        <Placeholder animation="glow">
            {sizes.map((size, index) => {
                return (
                    <><Placeholder key={index} xs={size} />{" "}</>
                );
            })}
        </Placeholder>
    );
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}