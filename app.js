const slides = document.getElementById("slides");
let currentIndex = 0;

function nextSlide() {
   currentIndex = (currentIndex + 1) % slides.children.length;
      updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.children.length) % slides.children.length;
  updateSlider();
}

function updateSlider() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

        // Slider automático
setInterval(nextSlide, 8000);


//-------- CARRITO DE COMPRA

//CREACION DE VARIABLES
const lista_curso = document.querySelector('#lista-cursos');
const contenedor_carrito = document.querySelector('#lista-carrito');
let carrito_compra = []

// CREACION DE FUNCIONES
enviarCurso()

function enviarCurso(){
  lista_curso.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        crearCurso(curso)
    }
  })
}

function crearCurso(curso){
  let datos = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id:curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }

  encontrarRepetido = carrito_compra.some(car => car.id === datos.id)

  if(encontrarRepetido){
    const cursos = carrito_compra.map(c => {
      if(c.id === datos.id){
        carrito_compra = [...cursos]
      }
    })
  }else{

    carrito_compra = [...carrito_compra,datos]
  }


  verCurso()
}

function verCurso(){
  limpiarHtml()
  
 carrito_compra.forEach(curso =>{
    const {imagen,titulo,precio,cantidad,id} = curso
    const row = document.createElement('tr');
    row.innerHTML = `
    <td><img src=${imagen} width='100'></td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td> <a href="#" class="borrar-curso" data-id="${id}"> X </a> </td>
    `
    contenedor_carrito.appendChild(row);
  })
}

function limpiarHtml(){
    //contenedor_carrito.innerHTML = ''

    while(contenedor_carrito.firstChild){
        contenedor_carrito.removeChild(contenedor_carrito.firstChild)
    }
}