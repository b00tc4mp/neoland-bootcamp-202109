import React from 'react'


const Item = ({item: { name, key } }) => {

    return <>
        <img className="results__image" src={`/images/items/${key}.png`} />
        <h1>{name}</h1>


    </>

}

export default Item