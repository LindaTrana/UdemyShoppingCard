 fetch("index.html")
    .then(response => response.text())
    .then(data => {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = data;

        let headerContent = tempDiv.querySelector("header");
        if (headerContent) {
            document.getElementById("headerCesta").innerHTML = headerContent.innerHTML;
    }
});

let contenedorCompra = document.querySelector(".contenedorCompra");
let contenedorCursos = document.querySelector(".contenedorCursos");
let contenedorDatos = document.querySelector('.contenedorDatos');
let contenedorPagar = document.querySelector('.contenedorPagar');
let carrito_compra = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;
document.addEventListener('DOMContentLoaded', verCesta);


function verCesta(){

    carrito_compra.forEach(curso => {
        const {imagen,titulo,precio,autor} = curso;

        total = total + parseFloat(precio);

        let divCursoImg = document.createElement('DIV');
        divCursoImg.classList.add('detallesCurso');
        divCursoImg.innerHTML =`
            <img src="${imagen}" id="imgCesta">
            <div class="informacion">
                <p class="titulo">${titulo}</p>
                <p>${autor}</p>
            </div>
            <div class='opciones'>
                <p>Eliminar</p>
                <p>Guardar para despues</p>
                <p>Mover a la lista de deseos</p>
            </div>
            <div class="divPcesta">
                <p class="precioCesta"> $${precio}</p>
                <img src='./images/tag.png' class="tag" alt="">
            </div>
        `
        contenedorCursos.appendChild(divCursoImg);
    });

    let pagoTotal = document.querySelector('.total');
    pagoTotal.textContent = `${total}US$`
    
}