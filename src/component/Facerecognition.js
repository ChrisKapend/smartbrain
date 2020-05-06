import React from 'react';
import './FaceRecognition.css';
const FaceRecognition = ({imageUrl, box}) =>{
    const {leftCol, topRow, rightCol, bottomRow} = box;
    console.log(box)
    return(
        <section className='center'>
            <section className={'imageContainer'}>
                <img id={'srcImage'} src={imageUrl} alt={' '} style={{width:'700px'}}/>
                <section className='faceBox' style={{top:box.topRow, left:box.leftCol, right:box.rightCol, bottom:box.bottomRow}}>
               
                </section>
            </section>
        </section>
    )
}
export default FaceRecognition;