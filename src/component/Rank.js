import React from 'react';

const Rank = ({name, entries}) =>{
    console.log(`rank ${name}`)
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