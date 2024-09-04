// por aitageo

const titulo = document.getElementById('titulo');

titulo.addEventListener('mouseout',()=>{
    titulo.classList.remove('animate__bounceIn');
    void titulo.offsetWidth; 
    titulo.classList.add('animate__bounceIn');
    // console.log('por aqui paso');
    
});


// const card = document.querySelector('.card');
// console.log(card.children);
// console.log(card.parentElement);
// console.log(card.nextSibling);



// const navegacion = document.querySelector('.navegacion');

// console.log(navegacion.children[0].children[0].children[0].children[0]);
// // navegacion.removeChild(navegacion.children[0]);

// const nav = document.querySelector('.navegacion .nav ul');
// const nuevoLi = document.createElement('LI');
// const nuevoA = document.createElement('A');
// console.log(nav);
// nuevoA.innerHTML = "Productos"

// nav.appendChild(nuevoLi);
// nuevoLi.appendChild(nuevoA);



// const button = document.getElementById('button')
// button.addEventListener('click',(e)=>{
//     e.preventDefault();
//     alert("Diste click");

// })


const button = document.querySelectorAll('.btn');
console.log(button);
button.addEventListener('click',(e)=>{
     e.preventDefault();
     console.log("Diste click en agregar");
     
})















