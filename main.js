const contenedorCarrito = document.querySelector('.box-container');
const lista_carrito = document.getElementById('lista-carrito').querySelector('tbody');
let totalCarrito = [];

MostrarCarrito();
function MostrarCarrito(){
  const carrito = document.querySelector('.titulo img');
  carrito.addEventListener('click', () => {
    console.log('Diste click en el carrito');
    
    const Mimodal = new bootstrap.Modal(document.getElementById('miModal'));
    Mimodal.show();
  });
}


principal();
function principal(){
  contenedorCarrito.addEventListener('click', agregarCarrito);
}

function agregarCarrito(e){
  e.preventDefault();
  
  if (e.target.classList.contains('btn')) {
    const productoSeleccionado = e.target.parentElement.parentElement;
    console.log(productoSeleccionado);
    

    const productos = {
      img: productoSeleccionado.querySelector('img').src,
      nombre: productoSeleccionado.querySelector('.card-title').textContent,
      precio: Math.floor(productoSeleccionado.querySelector('.card-text').innerText.replace(/[^0-9.-]+/g, "")),
      cantidad: 1,
      id: productoSeleccionado.querySelector('a').getAttribute('data-id')
    };

    //animacion de botones

    const button = e.target;
    button.textContent = "agregando al carrito";
    
    setTimeout(()=>{
      button.textContent = "Agregado al carrito";
    },1000);

    setTimeout(()=>{
      button.textContent = "Agregar al carrito";
    },3000);

    
   
    const existe = totalCarrito.some(producto => producto.id === productos.id);
    if (existe) {
      
      const productosActualizados = totalCarrito.map(producto => {
        if (producto.id === productos.id) {
          producto.cantidad++;
        }
        return producto;
      });
      totalCarrito = [...productosActualizados];
    } else {
      
      totalCarrito = [...totalCarrito, productos];
      console.log(totalCarrito);
      console.log(productos);
      
      
    }
    
    agregarHtml();
  }
}

function agregarHtml(){

  lista_carrito.innerHTML = '';  
  totalCarrito.forEach(producto => {
    const { img, nombre, precio, id, cantidad } = producto;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${img}" width="50"></td>
      <td>${nombre}</td>
      <td>$${precio}</td>
      <td><input type="number" min="1" class="form-control cantidad-producto" data-id="${id}" value="${cantidad}"></td>
      <td><button class="btn btn-danger eliminar-producto" data-id="${id}">X</button></td>
    `;

    lista_carrito.appendChild(row);
  });

  lista_carrito.querySelectorAll('.cantidad-producto').forEach(input => {
    input.addEventListener('input', actualizarCantidad);
  });

  lista_carrito.querySelectorAll('.eliminar-producto').forEach(btn => {
    btn.addEventListener('click', eliminarProducto);
  });

  
  actualizarTotal();
}

function actualizarCantidad(e){
  const input = e.target;
  const id = input.getAttribute('data-id');
  console.log(id);
  
  const nuevaCantidad = parseInt(input.value);

  totalCarrito = totalCarrito.map(producto => {
    if (producto.id === id) {
      producto.cantidad = nuevaCantidad;
    }
    return producto;
  });

  actualizarTotal();
}

function eliminarProducto(e){
  const id = e.target.getAttribute('data-id');
  // actualizarCantidad(e);
  totalCarrito = totalCarrito.filter(producto => producto.id !== id);
  agregarHtml();
}

function actualizarTotal(){
  let total = 0;

  totalCarrito.forEach(producto => {
    total += producto.precio * producto.cantidad;
  });

  document.getElementById('total-carrito').textContent = `Total: $${Math.floor(total)}`;
}
