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
    

    const existe = totalCarrito.some(producto => producto.id === productos.id);
    if (existe) {
        totalCarrito = totalCarrito.map(producto => {
            if (producto.id === productos.id) {
                producto.cantidad++;
            }
            return producto;
        });
    } else {
        totalCarrito = [...totalCarrito, productos];
    }

    actualizarCarritoHtml();
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
            <td><input type="number" class="form-control ActualizarCantidad" value="${cantidad}" data-id="${id}"></td>
            <td><a href="#" class="btn btn-danger eliminarProducto" data-id="${id}">X</a></td>
        `;

        contenedorCarrito.appendChild(row);
        const eliminar = row.querySelector('.eliminarProducto');
        eliminar.addEventListener('click',eliminarProducto);

        const ActualizarCantidadInput = row.querySelector('.ActualizarCantidad');
        ActualizarCantidadInput.addEventListener('input',ActualizarCantidad);
        
    });
    total()
}


function eliminarProducto(e){
    const id =  e.target.getAttribute('data-id');
    console.log(`eliminando...  ${id}`);
    console.log(totalCarrito);
    
    totalCarrito = totalCarrito.map(producto=>{
        if(producto.id === id){
          if (producto.cantidad > 1) {
              producto.cantidad--
          }
          else {
            return null
          }
        }
        
        return producto
    })
    totalCarrito = totalCarrito.filter(producto=>producto !== null)
    actualizarCarritoHtml()
}


function total(){
   const totalProductos = totalCarrito.reduce((total,producto)=> total + (producto.cantidad * producto.precio),0);
   const totalCarritoHtml = document.getElementById('total-carrito');
   totalCarritoHtml.innerHTML =  `Total $${Math.floor(totalProductos)}`
}



function ActualizarCantidad(e){
    const id =  e.target.getAttribute('data-id');
    const NuevaCantidad = parseInt(e.target.value);

    totalCarrito = totalCarrito.map(producto=>{
        if(producto.id === id){
           producto.cantidad = NuevaCantidad;
        }
        return producto
    })

    total()
    actualizarCarritoHtml()
}

