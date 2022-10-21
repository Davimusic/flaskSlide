//NOTA: las figuras siempren deben ser un cuadrado y de la misma medida.

let arre = [["1-1.jpg", "texto1 <br> texto1 <br> texto1 <br> texto1", "0"], ["2-2.jpg", "texto2 <br> texto1 <br> texto1 <br> texto1", "1"], ["3-3.jpg", "texto3", "2"], ["4-4.jpg", "texto4", "3"], ["5-5.jpg", "texto5", "4"], ["6-6.jpg", "texto6", "5"], ["7-7.jpg", "texto7", "6"], ["8-8.jpg", "texto8", "7"]]

let contenedor =  document.getElementById("contenedor1");
let alturaPantalla = window.innerHeight; //screen.height;
let anchoPantalla = window.innerWidth; //screen.width;

let anchoPantallaDisponible = (anchoPantalla / 100) * 95; // le restamos 4% de los 2% padding, tambièn le doy un pequeño matgen de error

let primeraReferencia = alturaPantalla/3.5



function ActualizarMostrario2(){

    contenedor.style.height = `${alturaPantalla/3}px`
    contenedor.style.background = "#008a8a"
    let cod = ""
    let puntero = 0; 
    let arrePaso = []
    let resaltarPerlota = arre[0][2]

    

    //inicio de creacion de div que se sobrepone para usar flechas y botones                                         // doble del pading establecido
    cod += 
    `
    <div style="background: #00000000" class="borde1">                                                                                                       
        
    `

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
                cod += `
                        <div class="slide">
                            <img id="imgSlide${i}" onmouseout="decrecer('imgSlide${i}', '${alturaPantalla/3.5}')" onmouseover="crecer('imgSlide${i}', '${alturaPantalla/3.5}')" class="borde1" style="height: ${alturaPantalla/3.5}px ;" src="../static/images/${arre[i][0]}" alt="">
                            <div class="borde1" style = "background: #36797980;">${arre[i][1]} </div>
                        </div>
                ` 
            } else{
                cod += `
                        <div class="slide esconder">
                            <img class="borde1" style="height: ${alturaPantalla/3.5}px ;" src="../static/images/${arre[i][0]}" alt="">
                            <div>${arre[i][1]} </div>
                        </div>
                ` 
            }
        }
        cod += 
        `
        </div>  
    `   
        cod += 
        `
        <div>
            <div class="flex espacioEquilatero paddingSuperiorInferior contenedorGaleria">
                <img style="height: 30px; width: 30px; padding-right: 10px;  padding-left: 10px;" onclick="ActualizarMostrario2('adelante')" src="../static/images/adelante.png" alt="" >
                <img style="height: 30px; width: 30px; padding-right: 10px;  padding-left: 10px;" onclick="ActualizarMostrario2('atras')" src="../static/images/atras.png" alt=""  >
            
    `
    //calculo la cantidad de imagenes disponibles

    for (let i = 0; i < arre.length; i++) {
        let decision = ""
        if(resaltarPerlota == i){
            decision = "circuloRelleno.png"
        } else {
            decision = "circuloVacio.png"
        }
        cod += 
                `
                <img onclick="pelota(${i})" style="height: 20px; width: 20px;  padding-right: 10px;  padding-left: 10px;" src="../static/images/${decision}" alt="" >
                `
    }

    cod +=
        `        
            </div>    
        </div>
        `

        cod += 
        `
    </div>  
    `

    contenedor.innerHTML = cod;

    //Actualizar arreglo
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
    //console.log(arre);
}


function pelota(id){
    let empezar = "no"
    let conteo  = 0;
    let arrePaso = []
    for(let i = 0; i < arre.length; i++) {
        if(id == arre[i][2]){
            empezar = "si"
            console.log("empieza " + id);
            console.log("i " + i);
        }
        if(empezar == "si"){
            arrePaso.push(arre[i])
            conteo += 1;
        }
    }

    for (let i = 0; i < (arre.length - conteo); i++) {
        arrePaso.push(arre[i])
    }

    arre = arrePaso;
    ActualizarMostrario2()
    console.log(arrePaso);
    


}




/**
 * console.log(arre);
    
    let arrePaso = []
    for (let i = 0; i < arre.length; i++) {
        if(arre[i][2]  == id){
            empezar = "si"
            console.log(id);
            console.log("empieza desde el " + i);
        }

        if(empezar == "si"){
            arrePaso.push(arre[i])
            conteo += 1
        }
    }

    //console.log(arrePaso);
    

    if(conteo >= (arre.length - 1)){
        console.log("acaba ciclo");
        empezar = "no"
        console.log(arrePaso);
        //ActualizarMostrario2()
        //console.log(arre);
    } else {
        console.log("entra pelota");
        console.log("conteo " + conteo + " arre.length - 1 " + (arre.length - 1));
        pelota(id)
    }
 */