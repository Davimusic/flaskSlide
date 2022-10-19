//NOTA: las figuras siempren deben ser un cuadrado y de la misma medida.

let contenedor =  document.getElementById("contenedor1");
let alturaPantalla = window.innerHeight; //screen.height;
let anchoPantalla = window.innerWidth; //screen.width;

let anchoPantallaDisponible = (anchoPantalla / 100) * 95; // le restamos 4% de los 2% padding
let cod = ""

console.log("alto ventana " + window.innerWidth);
console.log(" alturaPantalla " + alturaPantalla);
console.log(" anchoPantalla " + anchoPantalla);
console.log("incremento " + (alturaPantalla/3.5));

contenedor.style.height = `${alturaPantalla/3}px`
contenedor.style.background = "#008a8a"

let pimeraReferencia = alturaPantalla/3.5
for (let i = pimeraReferencia; i < anchoPantallaDisponible && i < (i + pimeraReferencia); i++) {
    cod += `<img style="height: ${alturaPantalla/3.5}px ;" src="../static/images/circuloVacio.png" alt="">`
    i += alturaPantalla/3.5
    console.log("i " + i);
    console.log("i antes de entrar a ciclo de nuevo " + (i + pimeraReferencia));
}

contenedor.innerHTML = cod;




