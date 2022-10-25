//NOTA: las figuras siempren deben ser un cuadrado y de la misma medida.

let arre = [["1-1.jpg", "texto1 <br> texto1 <br> texto1 <br> texto1", "0"], ["2-2.jpg", "texto2 <br> texto1 <br> texto1 <br> texto1", "1"], ["3-3.jpg", "texto3 <br> texto1 <br> texto1 <br> texto1", "2"], ["4-4.jpg", "texto4 <br> texto1 <br> texto1 <br> texto1", "3"], ["5-5.jpg", "texto5 <br> texto1 <br> texto1 <br> texto1", "4"], ["6-6.jpg", "texto6 <br> texto1 <br> texto1 <br> texto1", "5"], ["7-7.jpg", "texto7 <br> texto1 <br> texto1 <br> texto1", "6"], ["8-8.jpg", "texto8 <br> texto1 <br> texto1 <br> texto1", "7"], ["n1.jpg", "texto9 <br> texto1 <br> texto1 <br> texto1", "8"], ["n2.jpg", "texto10 <br> texto1 <br> texto1 <br> texto1", "9"], ["n3.jpg", "texto11 <br> texto1 <br> texto1 <br> texto1", "10"], ["n4.jpg", "texto12 <br> texto1 <br> texto1 <br> texto1", "11"]]

let contenedor =  document.getElementById("contenedor1");
let alturaPantalla = window.innerHeight; //screen.height;
let anchoPantalla = window.innerWidth; //screen.width;

let anchoPantallaDisponible = (anchoPantalla / 100) * 95; // le restamos 4% de los 2% padding, tambièn le doy un pequeño matgen de error

let primeraReferencia = alturaPantalla/3.5



function ActualizarMostrario2(){

    //contenedor.style.height = `${alturaPantalla/3}px`
    //contenedor.style.background = "#2b2828"
    contenedor.style.background = 'linear-gradient(to bottom, #2b2828 0%, #2b2828 80%, white 80%, white 100%)'
    
    let cod = ""
    let puntero = 0; 
    let arrePaso = []
    let resaltarPerlota = arre[0][2]

    

    //inicio de creacion de div que se sobrepone para usar flechas y botones                                         // doble del pading establecido
    cod += 
    `
    <div style="background: #008a8a" class="contenedor1 relativo gradiente sombra padding1 gradiante">                                                                                                       
        
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
                            <img id="imgSlide${i}" onmouseout="decrecer('imgSlide${i}', '${alturaPantalla/3.5}')" onmouseover="crecer('imgSlide${i}', '${alturaPantalla/3.5}')" class="borde1 mano" style="height: ${alturaPantalla/3.5}px ;" src="../static/images/${arre[i][0]}" alt="">
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
                <img class='mano' style="height: 30px; width: 30px; padding-right: 10px;  padding-left: 10px;" onclick="pelota('1','flecha')" src="../static/images/adelante.png" alt="" >
                <img class='mano' style="height: 30px; width: 30px; padding-right: 10px;  padding-left: 10px;" onclick="pelota('-1', 'flecha')" src="../static/images/atras.png" alt=""  >
            
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
                <img class='mano' onclick="pelota(${i}, 'pelota')" style="height: 20px; width: 20px;  padding-right: 10px;  padding-left: 10px;" src="../static/images/${decision}" alt="" >
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
}

let idActual = 0
function pelota(ref, acc){

    if(acc == "pelota"){
        idActual = ref
    } else if(acc == "flecha"){
        if(ref == -1){
            if((idActual + parseInt(ref)) <= -1){
                idActual = (arre.length - 1)
            } else {
                idActual -= 1
            }
        } else {
            if((idActual + parseInt(ref)) <= (arre.length - 1)){
                idActual += 1
            } else {
                idActual = 0
            }
        }
    }

    let empezar = "no"
    let conteo  = 0;
    let arrePaso = []

    for(let i = 0; i < arre.length; i++) {
        if(idActual == arre[i][2]){
            empezar = "si"
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
}

window.onpageshow = function(event){
    //parece no servir, no se està usando
    if(event.persisted){
        window.location.reload();
        alert("fuè")
    }
}



