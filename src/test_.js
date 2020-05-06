const array_ = ["a", "b", "c"]
const tab = array_.map(item =>{
    return({'letter': item});
});

console.log(array_);
console.log(tab)

{
    box.map((box, index) => {
        return(
            <section className='faceBox' style={{top:box.topRow, left:box.leftCol, right:box.rightCol, bottom:box.bottomRow}}>
                test
            </section>
        )
    })
}