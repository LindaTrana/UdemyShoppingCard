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
const vaciar_carrito = document.querySelector('#vaciar-carrito')
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

  document.addEventListener('DOMContentLoaded', () =>{
    carrito_compra = JSON.parse(localStorage.getItem("carrito")) || [];
    verCurso();
  })
}

function crearCurso(curso){
  let datos = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    autor: curso.querySelector('p').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id:curso.querySelector('a').getAttribute('data-id'),
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

  encontrarRepetido = carrito_compra.some(car => car.id === datos.id)

}

function verCurso(){
  limpiarHtml()
  
  carrito_compra.forEach(curso =>{
      const {imagen,titulo,precio,autor} = curso;
      const row = document.createElement('tr');
      row.innerHTML =
        `<tr>
          <td><img src="${imagen}" id="imgCarrito"></td>
          <td>
              <div class="info">
                  <p class="titulo">${titulo}</p>
                  <p>${autor}</p>
                  <p class="precio">${precio}</p>
              </div>
          </td>
        </tr>
        `
      contenedor_carrito.appendChild(row);
    })

    sincronizarStorage()
}

function sincronizarStorage(){
    localStorage.setItem('carrito',JSON.stringify(carrito_compra))
}

function limpiarHtml(){

    while(contenedor_carrito.firstChild){
        contenedor_carrito.removeChild(contenedor_carrito.firstChild)
    }
}