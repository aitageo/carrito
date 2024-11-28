//por aitageo

const token = localStorage.getItem('token');
console.log(token);

document.addEventListener('visibilitychange',()=>{
  if (document.visibilityState === 'visible') {
    if (!token) {
      Swal.fire({
        title :"Acceso no autorizado",
        icon : 'error'
      })
      window.location.href = 'login.html';
    }
  }

})

document.addEventListener('DOMContentLoaded',()=>{




const { fromEvent } = rxjs;
const { map, debounceTime, distinctUntilChanged } = rxjs.operators;

const tabla = document.getElementById('productos').querySelector('tbody');
const modal = new bootstrap.Modal(document.getElementById('modal'));
let products = [];
const buscar = document.getElementById('buscar');
const item = document.getElementById('item');



function searchProducts(query){
  return products.filter(product=>
    product.nombre_producto.toLowerCase().includes(query.toLowerCase())
  );
}


function getProducts() {
  fetch('http://localhost/api/productos/getProductos',{
    method :'GET',
    headers : {
      'Authorization': `Bearer ${token}`,//esta no
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      products = result; 
      console.log(products);
      showProducts(products);
      const observable$ = fromEvent(buscar, 'input').pipe(
        map(event => event.target.value),
        debounceTime(300),
        distinctUntilChanged(),
        map(query => searchProducts(query))
      );
      
      observable$.subscribe(results => {
        item.innerHTML = ""; 
        
        if (results.length > 0) {
          item.style.display = "block"; 
          item.style.width = "100%";
          item.style.textAlign = "center";
          
          results.forEach(result => {
            const option = document.createElement('option');
            option.textContent = result.nombre_producto;
            option.value = result.nombre_producto;
            item.appendChild(option);
          });

          item.addEventListener('click', () => {
            buscar.value = item.value;
            item.style.display = "none";
            setTimeout(()=>{
              buscar.value = "";
            },2000)
          });
        } else {
          item.style.display = "none";
          buscar.value = "";
          
        }
      });
    })
    .catch(error =>{
      Swal.fire({
        title :"Acceso no autorizado",
        icon : 'error'
      })
      console.error(error)});
    return products = [...products];
  }

  
getProducts();




function showProducts(products){
   tabla.innerHTML = "";
  products.forEach(product => {
    const row = document.createElement('tr');
    const { nombre_producto, precio, cantidad, id_producto } = product;//esto es una desestructuracion de un objeto
    row.innerHTML = `
    <td>${nombre_producto}</td>
    <td>${precio}</td>
     <td>${cantidad}</td>
     <td><a href="#" class="btn btn-info editarProducto" data-id="${id_producto}">Editar</a></td>
     <td><a href="#" class="btn btn-danger eliminarProducto" data-id="${id_producto}">Eliminar</a></td>
     `;
     tabla.appendChild(row);
     const eliminar = row.querySelector('.eliminarProducto');
     eliminar.addEventListener('click',eliminarProducto);
     const editar = row.querySelector('.editarProducto');
     editar.addEventListener('click',updateProduct);
     
     
    });
    
    
  }
  
//fin funcion showproducts
  

  function eliminarProducto(e){
    const id = parseInt(e.target.getAttribute('data-id'));
    console.log(id);
  
  Swal.fire({
    title: 'Estas seguro de eliminar',
    icon: 'warning',
    showConfirmButton : true,
    showCancelButton: true,
    confirmButtonColor : '#d03',
  })
  .then(result=>{
    if (result.isConfirmed) {
      fetch(`http://localhost/api/productos/DeleteProducto?id=${id}`,{
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(result=>{
        Swal.fire({
          title: 'Producto eliminado con exito'
        })
        console.log(result);
        getProducts();
        
      })
      .catch(error=>{
        Swal.fire('No se pudo borrar');
        console.log(`No se pudo eliminar ${error}`)})
        
      } else {
        Swal.fire('No se borro');
      }
})

}
//fin funcion eliminar



function cleanField(){
const nombre = document.getElementById('nombre').value = "";
  const precio = document.getElementById('precio').value = "";
  const cantidad = document.getElementById('cantidad').value = "";
  const valorMarca = document.getElementById('marca').value = "";
}


//inicio funcion update

function updateProduct(e) {
  cleanField();
  // const products = getProducts();
  // console.log(products);
  
  const id = e.target.getAttribute('data-id');
  console.log(id);
  
 
  const product = products.find(product => product.id_producto === id);
  console.log(product);
  
  if (product) {
    document.getElementById('nombre').value = product.nombre_producto;
    document.getElementById('cantidad').value = product.cantidad;
    document.getElementById('precio').value = product.precio;
    document.getElementById('marca').value = product.marca;
  }
  
  modal.show();
  titulo.textContent = "Editar Producto";
  
  const guardar = document.getElementById('guardar');
  
  const nuevoGuardar = guardar.cloneNode(true);
  guardar.parentNode.replaceChild(nuevoGuardar, guardar);
  
  nuevoGuardar.addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const valorMarca = document.getElementById('marca').value;
    
    console.log(id, nombre, precio, cantidad, valorMarca);
    
    fetch('http://localhost/api/productos/updateProducto', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_producto: id,
        nombre_producto: nombre,
        precio: precio,
        cantidad: cantidad,
        marca: valorMarca
      })
    })
    .then(response => {
      if (response.status === 200) {
        Swal.fire({
          title: "Producto actualizado exitosamente",
          icon: 'success'
        });
        getProducts(); 
        modal.hide();  
      } else {
        Swal.fire({
          title: 'Datos inválidos o incompletos',
          icon: 'error'
        });
      }
    })
    .catch(error => {
      Swal.fire({
        title: "No se pudo actualizar el producto",
        icon: 'error'
      });
      console.error(error);
    });
  });
}

//fin funcion update




// Lanza el modal
const titulo = document.getElementById('Modal-title');
const crear = document.getElementById('crear');
const guardar = document.getElementById('guardar');

const nuevoGuardar = guardar.cloneNode(true);
guardar.parentNode.replaceChild(nuevoGuardar, guardar);

crear.addEventListener('click', () => {
  cleanField(); 
  modal.show();
  titulo.textContent = "Crear Producto";
  nuevoGuardar.addEventListener('click',CreateProduct)
});

function CreateProduct() {
  const nombre = document.getElementById('nombre').value;
  const precio = document.getElementById('precio').value;
  const cantidad = document.getElementById('cantidad').value;
  const valorMarca = document.getElementById('marca').value;

  console.log(nombre, precio, cantidad, valorMarca);

  fetch('http://localhost/api/productos/CreateProducto', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre_producto: nombre,
      precio: precio,
      cantidad: cantidad,
      marca: valorMarca
    })
  })
  // .then(response => response.json())
  .then(result=>{
    if (result.status === 200) {
        Swal.fire({
          title : 'Producto creado exitosamente',
          icon: 'success'
        })
    } else {
      Swal.fire({
        title : 'No se pudo crear el producto',
        icon: 'error'
      })
    }
  })
  .catch(error => {
    Swal.fire({
      title: 'Datos incompletos',
      icon: 'error'
    });
    console.error(error);
  });
}






});