import React from 'react';

const Rank = ({name, entries}) =>{
    return(
        <article>
            <article className='white f1'>
                {name}{', your current rank is'}
            </article>
            <article className='white f1'>
                {entries}
            </article>
        </article>
    )
}
export default Rank;