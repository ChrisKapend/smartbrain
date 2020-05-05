import React from 'react';
import './ImageLinkForm.css';
const FaceRecognition = ({imageUrl}) =>{
    return(
        <article>
            <img src={imageUrl} alt={' '} style={{width:'700px'}}/>
        </article>
    )
}
export default FaceRecognition;