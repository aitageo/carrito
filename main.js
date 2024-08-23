// por aitageo

const titulo = document.getElementById('titulo');

titulo.addEventListener('mouseout',()=>{
    titulo.classList.remove('animate__bounceIn');
    void titulo.offsetWidth; 
    titulo.classList.add('animate__bounceIn');
    console.log('por aqui paso');
    
});




const agregar = document.getElementById('agregar');

agregar.addEventListener('click',()=>{
    alert("Agregando al carrito");
})


