import React from 'react';
import './ImageLinkForm.css';
const FaceRecognition = (props) =>{
    console.log(`the input link is ${props.imageUrl}`)
    return(
        <article>
            <img src={props.imageUrl} alt={' '} style={{width:'700px'}}/>
        </article>
    )
}
export default FaceRecognition;