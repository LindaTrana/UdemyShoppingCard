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
enviarCurso();
conectarCursos()

function conectarCursos(){
  let url = 'script/db.json';

  fetch(url)
  .then(data => data.json())
  .then(resultado => crearCurso(resultado));
}

function crearCurso(informacion){
  let contador = 0;

  let container = document.querySelector('.container')

  let contenedorSecundario = document.createElement('section');
  contenedorSecundario.classList.add('contenedorSecundario');

  let h1 = document.createElement('h1');
  h1.classList.add('encabezado')
  h1.setAttribute('id','encabezado');

  let row = document.createElement('div');
  row.classList.add('row');

  informacion.forEach((curso) =>{


    let fcolums = document.createElement('div');
    fcolums.classList.add('four','columns');

    let card = document.createElement('div');
    card.classList.add('card');
    
    let imgCurso = document.createElement('img');
    imgCurso.classList.add('imagen-curso', 'u-full-width');
    imgCurso.src = curso.imageUrl

    let infCard = document.createElement('div');
    infCard.classList.add('info-card');

    let titulo = document.createElement('h4');
    titulo.textContent = curso.title

    let autor = document.createElement('p');
    autor.textContent = curso.author

    let imgEstrella = document.createElement('img');
    imgEstrella.src = curso.starsUrl

    let precio = document.createElement('p');
    precio.classList.add('precio')

    let span = document.createElement('span');
    span.classList.add('u-pull-right');
    span.textContent = `${curso.price}`

    let button = document.createElement('a');
    button.href = '#';
    button.classList.add('u-full-width', 'button-primary' ,'button', 'input', 'agregar-carrito');
    button.setAttribute('data-id',contador++);
    button.textContent = 'Agregar al carrito';

    infCard.appendChild(titulo);
    infCard.appendChild(autor);
    infCard.appendChild(imgEstrella);
    precio.appendChild(span)
    infCard.appendChild(precio);
    infCard.appendChild(button);

    card.appendChild(imgCurso);
    card.appendChild(infCard);

    fcolums.appendChild(card);

    row.appendChild(fcolums);
    //contenedorSecundario.appendChild(h1)
    contenedorSecundario.appendChild(row);
    container.appendChild(contenedorSecundario);

  })
}

function enviarCurso(){
  lista_curso.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        crearCarrito(curso);
    }
  })

  document.addEventListener('DOMContentLoaded', () =>{
    carrito_compra = JSON.parse(localStorage.getItem("carrito")) || [];
    notificaciones();
    verCurso();
  })
}

function notificaciones(){
    carrito_compra = JSON.parse(localStorage.getItem("carrito")) || [];

    let notificacion = document.querySelector('.notificacion');
    
    if(carrito_compra.length > 0){
      let cantNotificacion =  document.querySelector('.cantNotificacion');
      cantNotificacion.textContent = carrito_compra.length;
      notificacion.style.display = 'block';
    } else {
      notificacion.style.display = 'none';
    }
}

function crearCarrito(curso){
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
  notificaciones();
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