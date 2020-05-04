import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
    return(
        <article>
            <p className='f3' style={{color:'white'}}>
                {'This Magic brain will detect faces in your pictures. Give it a try'}
            </p>
            <article className='form-group center w-40 shadow-4 pa4 pattern'>
                <input className='form-control  pa3 f4 center' type='text' style={{margin:'auto 5px', padding:'5px'}} onChange={onInputChange}/>
                <input className='btn btn-light grow' type='submit' style={{backgroundColor:'purple', border:'none', color:'white', width:'120px'}}  onClick={onButtonSubmit}/>
            </article>
        </article>
    )
}
export default ImageLinkForm;