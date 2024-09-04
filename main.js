// por aitageo

const titulo = document.getElementById('titulo');

titulo.addEventListener('mouseout',()=>{
    titulo.classList.remove('animate__bounceIn');
    // void titulo.offsetWidth; 
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


// const buttons = document.querySelectorAll('.btn');
// console.log(buttons);

// buttons.forEach(button=>{
//    button.addEventListener('click',(e)=>{
//     e.preventDefault();
//     console.log('Diste click');
    
//    })
// });



const card = document.querySelector('.card');
const card_body = document.querySelector('.card-body');
const  agregar = document.getElementById('agregar');

    agregar.addEventListener('click',(e)=>{
        console.log(e.target);
       e.stopPropagation();
       console.log('diste click en agregar');
       
    })
    
    card_body.addEventListener('click',(e)=>{
        e.stopPropagation();
        console.log(e.target);
        
        console.log('diste click en card_body');
        
    })
    
    card.addEventListener('click',(e)=>{
        console.log(e.target);
        
        e.stopPropagation();
        console.log('diste click en card');
    
});


const productos = [{
    titulo : "",
    imagen : "",
    precio : "",
}]


card.addEventListener('click',(e)=>{
    if(e.target.classList.contains('.card-text')){
    console.log('diste click en card');
    }
    if (e.target.classList.contains('card-img-top')){
        console.log('diste click en la imagen');  
    }
    if (e.target.classList.contains('card-tittle')){
        console.log('diste click en la imagen');  
    }
    
});



function mostrarCarrito(){
  const carrito = document.querySelector('.titulo img')
  carrito.addEventListener('click',()=>{
    carrito.style.display = "block";
    console.log("diste click en el carrito");
    
  })
}


mostrarCarrito()












