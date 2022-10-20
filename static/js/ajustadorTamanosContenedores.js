//NOTA: las figuras siempren deben ser un cuadrado y de la misma medida.

let arre = ["1-1.jpg", "2-2.jpg", "3-3.jpg", "4-4.jpg", "5-5.jpg", "6-6.jpg", "7-7.jpg", "8-8.jpg"]

let contenedor =  document.getElementById("contenedor1");
let alturaPantalla = window.innerHeight; //screen.height;
let anchoPantalla = window.innerWidth; //screen.width;

let anchoPantallaDisponible = (anchoPantalla / 100) * 95; // le restamos 4% de los 2% padding, tambièn le doy un pequeño matgen de error

let primeraReferencia = alturaPantalla/3.5



function ActualizarMostrario2(acc){

    contenedor.style.height = `${alturaPantalla/3}px`
    contenedor.style.background = "#008a8a"
    let cod = ""
    let puntero = 0
    let arrePaso = []

    cod += 
    `
    <div class="flex espacioEquilatero">
    `

    for (let i = primeraReferencia; i < anchoPantallaDisponible && i < (i + primeraReferencia); i++) {
        puntero += 1
        i += alturaPantalla/3.5
    }

    for (let i = 0; i < arre.length; i++) {
        if(i < puntero ){
            cod += `<img class="borde1 slide" style="height: ${alturaPantalla/3.5}px ;" src="../static/images/${arre[i]}" alt="">` 
        } else{
            cod += `<img class="borde1 slide esconder" style="height: ${alturaPantalla/3.5}px ;" src="../static/images/${arre[i]}" alt="">` 
        }
    }

    let pasos = 0
    while(pasos < arre.length){
        if(puntero < arre.length){
            arrePaso.push(arre[puntero])
        } else {
            puntero = 0
            arrePaso.push(arre[puntero])
        }
        puntero += 1
        pasos += 1
    }

    arre = arrePaso
    console.log(arre);

    

    cod += 
    `
    </div>
    `

    //inicio de creacion de div que se sobrepone para usar flechas y botones                                         // doble del pading establecido
    cod += 
    `                                                                                                         
        <div style="height: ${alturaPantalla/3}px; width: ${(anchoPantalla / 100) * (100 - 4)}px; background: #343b4100; position:absolute; top:4%; z-index: 100;" class="">
            <div class="flex espacioEquilatero ">
                <img style="padding-top: ${alturaPantalla/(3 * 3)}px; height: 50px; width: 50px; padding-right: ${((anchoPantalla / 100) * (100 - 4)) - 100}px;" onclick="ActualizarMostrario2('adelante')" src="../static/images/adelante.png" alt="" >
                <img style="padding-top: ${alturaPantalla/(3 * 3)}px; height: 50px; width: 50px;" onclick="ActualizarMostrario2('atras')" src="../static/images/atras.png" alt=""  >
            </div>
            <div style="padding-top: ${alturaPantalla/(3 * 2.5)}px; class="flex">
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

    //console.log(cod);
    contenedor.innerHTML = cod;
}






