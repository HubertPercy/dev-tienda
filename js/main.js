const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody') //lugar donde se va a insertar el html
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); //boton
const listaCursos = document.querySelector('#lista-cursos'); //contenedor
let articulosCarrito=[];

cargarEventListeners();
function cargarEventListeners(){
    listaCursos.addEventListener('click',agregarCurso);

    carrito.addEventListener('click',eliminarCurso);

    document.addEventListener('DOMContentLoaded',() => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHtml();
    })


    vaciarCarritoBtn.addEventListener('click',() => {
        articulosCarrito = [];
        limpiarHtml();
    })
}

function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado=(e.target.parentElement.parentElement);
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        
        carritoHtml();
    }

}


function leerDatosCurso(curso){
    const infoCurso ={
        titulo:curso.querySelector('h4').textContent,
        img:curso.querySelector('img').src,
        precio:curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }else{
        articulosCarrito = [...articulosCarrito,infoCurso];
    }
    carritoHtml();
}

function carritoHtml(){
    limpiarHtml()
    articulosCarrito.forEach(curso =>{
        const row =document.createElement('tr');
        row.innerHTML=`
            <td>
               ${curso.titulo}
            </td>
            <td>
               <img src="${curso.img}" width="120">
            </td>
            <td>
               ${curso.precio}
            </td>
            <td>
               ${curso.cantidad}
            </td>
            <td>
               <a href="#" class="borrar-curso" data-id="${curso.id}" >X</a>

        `;
        contenedorCarrito.appendChild(row);
    })

    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito' ,JSON.stringify(articulosCarrito));
}

function limpiarHtml(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
