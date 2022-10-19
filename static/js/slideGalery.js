let num = 0
let cantidadGaleria = 0
let widthPantalla = 0
let inyectar = document.getElementById("padre")
let arreglo = ["1-1.jpg", "2-2.jpg", "3-3.jpg", "4-4.jpg", "5-5.jpg", "6-6.jpg", "7-7.jpg", "8-8.jpg"]

function ActualizarMostrario(acc){
    let arregloLocal = [], arregloDePaso = [], codigo = "";
    arregloLocal = arreglo;
    codigo += 
    `
    <div class="contenedorGaleria ">
        <div class="flex espacioEquilatero ">
            <img onclick="ActualizarMostrario('adelante')" src="../static/images/fade.png" alt="" class="botonSlide">
            <img onclick="ActualizarMostrario('atras')" src="../static/images/fatr.png" alt=""  class="botonSlide">
        </div>

        <div class="flex espacioEquilatero">
    `
        if(widthPantalla <= 650){
            console.log("entra arriba");
            if(acc == "adelante"){
                codigo += 
            `
                <div class="slide padding1">
                    <img class="tamanoImagenSlide borde1" src="../static/images/${arregloLocal[0]}" alt="">
                    <p class="title">Short title 1 adelante... </p>
                </div>   
            `
            for (let e = 1; e < arregloLocal.length; e++) {
                codigo += 
            `
                <div class="slide esconder padding1">
                    <img class="tamanoImagenSlide borde1" src="../static/images/${arregloLocal[e]}" alt="">
                    <p class="title">Short title ${e+2} adelante...</p>
                </div>   
            `
                arregloDePaso.push(arregloLocal[e])
            }
            arregloDePaso.push(arregloLocal[0])
            arreglo = arregloDePaso;
            }  else {
                console.log("entra abajo");
                codigo += 
                `
                    <div class="slide padding1">
                        <img class="tamanoImagenSlide borde1" src="../static/images/${arregloLocal[(arregloLocal.length) - 1]}" alt="">
                        <p class="title">Short title 1 atras...</p>
                    </div>   
                `
                arregloDePaso.push(arregloLocal[arregloLocal.length - 1])
                for (let e = 0; e < (arregloLocal.length - 1); e++) {
                    codigo += 
                `
                    <div class="slide esconder padding1">
                        <img class="tamanoImagenSlide borde1" src="../static/images/${arregloLocal[e]}" alt="">
                        <p class="title">Short title ${e+2} atras...</p>
                    </div>   
                `
                    arregloDePaso.push(arregloLocal[e])
                }
                arreglo = arregloDePaso;  
            }
        } else {
            
        }

        codigo += `
    </div>    
        </div> 
        `
        console.log(codigo);
        console.log("arreglo " + arreglo);
        inyectar.innerHTML = codigo
}





















/*    let arregloLocal = [];
    arregloLocal =  arreglo;
    let arregloDePaso = [];
    const collection = document.getElementsByClassName("slide");
    cantidadGaleria = collection.length
    widthPantalla = screen.width

    codigo += 
`
    <div class="contenedorGaleria flex espacioEquilatero">
        <img onclick="moverGaleria('adelante')" src="./fade.png" alt="" class="botonAdelante">
        <img onclick="moverGaleria('atras')" src="./fatr.png" alt=""  class="botonAtras">
`
    if(widthPantalla <= 650){
        codigo += 
        `
            <div class="slide padding1">
                <img class="tamanoImagenSlide borde1" src="./${arregloLocal[0]}" alt="">
                <p class="title">Short title</p>
            </div>   
        `
        for (let e = 1; e < arregloLocal.length; e++) {
            arregloDePaso.push(arregloLocal[e])
        }
        arregloDePaso.push(arregloLocal[0])
    } else {

    }

    for (let i = 0; i < arregloLocal.length; i++) {
        console.log("pasa");
        codigo += 
        `
            <div class="slide padding1" id=${i+1}>
                <img class="tamanoImagenSlide borde1" src="./${arreglo[i]}" alt="">
                <p class="title">Short title ${i+1}</p>
            </div>   
        `







        if(widthPantalla <= 650){
            if(collection[index].id == (num + "")) {
                console.log("menor a 650 px num " + num + " can " + cantidadGaleria);
                collection[index].classList.remove("esconder");
            } else {
                collection[index].classList.add("esconder");
            }
        } else {
            if(collection[index].id == (num + "") || collection[index].id == ((num + 1) + "") || collection[index].id == ((num + 2) + "") || collection[index].id == ((num + 3) + "") ) {
                console.log("mayor a 650 num " + num + " can " + cantidadGaleria);
                collection[index].classList.remove("esconder");
            } else {
                collection[index].classList.add("esconder");
            }
        }
    }

    if(widthPantalla > 650){
        console.log("num entrada " + num);
        if(num < 1 && num > 8){
            num = 1
        }  else {
            num += 3
        }
        console.log("num salida " + num);
    }

}

function moverGaleria(acc){
    if(acc == "adelante"){
        if(cantidadGaleria == num){
            num = 1
        } else {
            num += 1
        }
    } else {
        if(num <= 1){
            num = cantidadGaleria
        } else {
            num -= 1
        }
    }
    ActualizarMostrario()
}*/






