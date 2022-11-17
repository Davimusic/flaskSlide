//NOTA: las figuras siempren deben ser un cuadrado y de la misma medida.

let arrePadre = [[["1-1.jpg", "texto1 <br> texto1 <br> texto1 <br> texto1", "0"], ["2-2.jpg", "texto2 <br> texto1 <br> texto1 <br> texto1", "1"], ["3-3.jpg", "texto3 <br> texto1 <br> texto1 <br> texto1", "2"], ["4-4.jpg", "texto4 <br> texto1 <br> texto1 <br> texto1", "3"], ["5-5.jpg", "texto5 <br> texto1 <br> texto1 <br> texto1", "4"], ["6-6.jpg", "texto6 <br> texto1 <br> texto1 <br> texto1", "5"], ["7-7.jpg", "texto7 <br> texto1 <br> texto1 <br> texto1", "6"], ["8-8.jpg", "texto8 <br> texto1 <br> texto1 <br> texto1", "7"], ["n1.jpg", "texto9 <br> texto1 <br> texto1 <br> texto1", "8"], ["n2.jpg", "texto10 <br> texto1 <br> texto1 <br> texto1", "9"], ["n3.jpg", "texto11 <br> texto1 <br> texto1 <br> texto1", "10"], ["n4.jpg", "texto12 <br> texto1 <br> texto1 <br> texto1", "11"]], [["c1.jpg", "texto1 <br> texto1 <br> texto1 <br> texto1", "0"], ["c2.jpg", "texto2 <br> texto1 <br> texto1 <br> texto1", "1"], ["c3.jpg", "texto3 <br> texto1 <br> texto1 <br> texto1", "2"], ["c4.jpg", "texto4 <br> texto1 <br> texto1 <br> texto1", "3"], ["c5.jpg", "texto5 <br> texto1 <br> texto1 <br> texto1", "4"], ["c6.jpg", "texto6 <br> texto1 <br> texto1 <br> texto1", "5"], ["c7.jpg", "texto7 <br> texto1 <br> texto1 <br> texto1", "6"], ["c8.jpg", "texto8 <br> texto1 <br> texto1 <br> texto1", "7"], ["n1.jpg", "texto9 <br> texto1 <br> texto1 <br> texto1", "8"], ["n2.jpg", "texto10 <br> texto1 <br> texto1 <br> texto1", "9"], ["n3.jpg", "texto11 <br> texto1 <br> texto1 <br> texto1", "10"], ["n4.jpg", "texto12 <br> texto1 <br> texto1 <br> texto1", "11"]]] 

let arre = []
let IdSeccion = 0;

let alturaPantalla = window.innerHeight; //screen.height;
let anchoPantalla = window.innerWidth; //screen.width;
let anchoPantallaDisponible = (anchoPantalla / 100) * 95; // le restamos 4% de los 2% padding, tambièn le doy un pequeño matgen de error
let primeraReferencia = alturaPantalla/3.5

function ActualizarMostrario2(idSeccion){
    IdSeccion = parseInt(idSeccion);
    arre = arrePadre[IdSeccion]
    let contenedor =  document.getElementById(`contenedor${IdSeccion}`);

    //contenedor.style.height = `${alturaPantalla/3}px`
    //contenedor.style.background = "#2b2828"
    contenedor.style.background = 'linear-gradient(to bottom, #2b282877 0%, #2b282877 80%, white 80%, white 100%)'
    
    let cod = ""
    let puntero = 0; 
    let arrePaso = []
    let resaltarPerlota = arre[0][2]


    //inicio de creacion de div que se sobrepone para usar flechas y botones 
                                                         // relativo       gradiante
    cod += ` 
        <div class="borde2 contenedor1  sombra padding1 color1 ">                                                                                                       
            
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
                                <img id="${IdSeccion}imgSlide${i}" onmouseout="desrotar('${IdSeccion}imgSlide${i}', '${alturaPantalla/3.5}')" onmouseover="rotar('${IdSeccion}imgSlide${i}', '${alturaPantalla/3.5}')" class="borde1 mano" style="height: ${alturaPantalla/3.5}px ;" src="../static/images/${arre[i][0]}" alt="">
                                <div class="" style = "background: ;">${arre[i][1]} </div>
                            </div>
                    ` 
                } else{
                    cod += `
                            <div class="slide esconder">
                                <img class="borde1 mano" style="height: ${alturaPantalla/3.5}px ;" src="../static/images/${arre[i][0]}" alt="">
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
                    <img class='mano' style="height: 30px; width: 30px; padding-right: 10px;  padding-left: 10px;" onclick="pelota('1','flecha','${IdSeccion}', 'descativarMostrario')" src="../static/images/adelante.png" alt="" >
                    <img class='mano' style="height: 30px; width: 30px; padding-right: 10px;  padding-left: 10px;" onclick="pelota('-1', 'flecha','${IdSeccion}', 'descativarMostrario')" src="../static/images/atras.png" alt=""  >
                
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
                    <img class='mano' onclick="pelota(${i}, 'pelota','${IdSeccion}', 'descativarMostrario')" style="height: 20px; width: 20px;  padding-right: 10px;  padding-left: 10px;" src="../static/images/${decision}" alt="" >
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
    arrePadre[IdSeccion] = arre
    contenedor.innerHTML = cod;


}

let idActual = 0
let usoActivoMostrario = true
function pelota(ref, acc, idSec, usoMostrario){
    let IdSec = parseInt(idSec)
    if(usoMostrario == "descativarMostrario"){
        usoActivoMostrario = false // este variable me desactiva el cambio automatico del mostrario
    }
    
    if(acc == "pelota"){
        idActual = ref
    } else if(acc == "flecha"){
        if(ref == -1){
            if((idActual + parseInt(ref)) <= -1){
                idActual = (arrePadre[IdSec].length - 1)
            } else {
                idActual -= 1
            }
        } else {
            if((idActual + parseInt(ref)) <= (arrePadre[IdSec].length - 1)){
                idActual += 1
            } else {
                idActual = 0
            }
        }
    }

    let empezar = "no"
    let conteo  = 0;
    let arrePaso = []

    for(let i = 0; i < arrePadre[IdSec].length; i++) {
        if(idActual == arrePadre[IdSec][i][2]){
            empezar = "si"
        }
        if(empezar == "si"){
            arrePaso.push(arrePadre[IdSec][i])
            conteo += 1;
        }
    }

    for (let i = 0; i < (arrePadre[IdSec].length - conteo); i++) {
        arrePaso.push(arrePadre[IdSec][i])
    }

    arrePadre[IdSec] = arrePaso;
    ActualizarMostrario2(IdSec)     
}

function avanzarMostrarioAutomatico(){
    let cantidadComponentes = 2;//debe ser dinamico a futuro
    if(usoActivoMostrario == true){
        //console.log("i");
        pelota('1','flecha', '0')
        pelota('1','flecha', '1')
        setTimeout(avanzarMostrarioAutomatico, 7000)
    } else {
        console.log("usoActivoPasoMostrario desactivado");
    }
    
    
}



window.onpageshow = function(event){
    //parece no servir, no se està usando
    if(event.persisted){
        window.location.reload();
        alert("fuè")
    }
}



