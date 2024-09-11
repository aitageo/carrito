//por aitageo

const contenedor = document.querySelector('.box-container');
const contenedorCarrito = document.getElementById('lista-carrito').querySelector('tbody');
let totalCarrito = [];

MostrarCarrito();
function MostrarCarrito() {
    const carrito = document.querySelector('.titulo img');
    carrito.addEventListener('click', () => {
        console.log('Diste click en el carrito');
        const miModal = new bootstrap.Modal(document.getElementById('miModal'));
        miModal.show();
    });
}

cargarEvenlisteners();
function cargarEvenlisteners() {
    contenedor.addEventListener('click', cargarProductos);
    console.log('diste click en el contenedor');
}

function cargarProductos(e) {
    e.preventDefault();
    
    if (e.target.classList.contains('btn-primary')) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatos(productoSeleccionado);
    }
}

function leerDatos(data) {
    const productos = {
        img: data.querySelector('img').src,
        nombre: data.querySelector('.card-title').textContent,
        precio: Math.floor(data.querySelector('.card-text').innerText.replace(/[^0-9.-]+/g, "")),
        cantidad: 1,
        id: data.querySelector('a').getAttribute('data-id')
    };
  
    console.log(productos);
    
    
}

























function actualizarCarritoHtml() {
    contenedorCarrito.innerHTML = '';
    totalCarrito.forEach(producto => {
        const { img, nombre, precio, cantidad, id } = producto;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${img}" width="50"></td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="btn btn-danger eliminarProducto" data-id="${id}">X</a></td>
        `;

        contenedorCarrito.appendChild(row);
    });
}
