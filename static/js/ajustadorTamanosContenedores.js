//NOTA: las figuras siempren deben ser un cuadrado y de la misma medida.

let contenedor =  document.getElementById("contenedor1");
let alturaPantalla = window.innerHeight; //screen.height;
let anchoPantalla = window.innerWidth; //screen.width;

let anchoPantallaDisponible = (anchoPantalla / 100) * 95; // le restamos 4% de los 2% padding, tambièn le doy un pequeño matgen de error
let cod = ""

contenedor.style.height = `${alturaPantalla/3}px`
contenedor.style.background = "#008a8a"

let pimeraReferencia = alturaPantalla/3.5
cod += 
`
<div class="flex espacioEquilatero">
`
for (let i = pimeraReferencia; i < anchoPantallaDisponible && i < (i + pimeraReferencia); i++) {
    cod += `<img style="height: ${alturaPantalla/3.5}px ;" src="../static/images/circuloVacio.png" alt="">`
    i += alturaPantalla/3.5
    //console.log("i " + i);
    //console.log("i antes de entrar a ciclo de nuevo " + (i + pimeraReferencia));
}
cod += 
`
</div>
`

//inicio de creacion de div que se sobrepone para usar flechas y botones                                         // doble del pading establecido
cod += 
`                                                                                                         
    <div style="height: ${alturaPantalla/3}px; width: ${(anchoPantalla / 100) * (100 - 4)}px; background: #343b4100; position:absolute; top:4%; z-index: 100;" class="">
        <div class="flex espacioEquilatero ">
            <img style="padding-top: ${alturaPantalla/(3 * 3)}px; height: 50px; width: 50px; padding-right: ${((anchoPantalla / 100) * (100 - 4)) - 100}px;" onclick="ActualizarMostrario('adelante')" src="../static/images/adelante.png" alt="" >
            <img style="padding-top: ${alturaPantalla/(3 * 3)}px; height: 50px; width: 50px;" onclick="ActualizarMostrario('atras')" src="../static/images/atras.png" alt=""  >
        </div>
        <div style="padding-top: ${alturaPantalla/(3 * 4)}px; class="flex">
`
//calculo la cantidad de imagenes disponibles
let arre = ["1-1.jpg", "2-2.jpg"]
    for (let i = 0; i < arre.length; i++) {
        cod += 
                `
                <img style="height: 20px; width: 20px;" src="../static/images/circuloVacio.png" alt="" >
                `
    }

cod +=
`        
        </div>    
    </div>

`

console.log(cod);
contenedor.innerHTML = cod;




