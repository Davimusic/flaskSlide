//NOTA: las figuras siempren deben ser un cuadrado y de la misma medida.

let arre = ["1-1.jpg", "2-2.jpg", "3-3.jpg", "4-4.jpg", "5-5.jpg", "6-6.jpg", "7-7.jpg", "8-8.jpg"]

let contenedor =  document.getElementById("contenedor1");
let alturaPantalla = window.innerHeight; //screen.height;
let anchoPantalla = window.innerWidth; //screen.width;

let anchoPantallaDisponible = (anchoPantalla / 100) * 95; // le restamos 4% de los 2% padding, tambièn le doy un pequeño matgen de error
let cod = ""
let primeraReferencia = alturaPantalla/3.5

function ActualizarMostrario2(acc){

    contenedor.style.height = `${alturaPantalla/3}px`
    contenedor.style.background = "#008a8a"

    let conteo = 0

    cod += 
    `
    <div class="flex espacioEquilatero">
    `
    for (let i = primeraReferencia; i < anchoPantallaDisponible && i < (i + primeraReferencia); i++) {
        cod += `<img class="borde1" style="height: ${alturaPantalla/3.5}px ;" src="../static/images/${arre[conteo]}" alt="">`
        conteo += 1
        i += alturaPantalla/3.5
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
}






