function correr(){
    let cod = ""
    let padre = document.getElementById("padre")

    padre.innerHTML = `
        <div id="menu" class="sticky"></div>
        <div id="contenedorPadreSlides" class="padding1"></div> 
        <div id="audioPlayer" class=""></div> 
    `
    menu()

    for (let i = 0; i < 2; i++){
        cod += `
        <div id="contenedorAudioPlayer${i}" class=""></div>
        `
    }

    let slides = document.getElementById(`contenedorPadreSlides`)
    for (let i = 0; i < 2; i++){
        cod += `
        <div id="contenedor${i}" class="padding1"></div>
        `
    }

    slides.innerHTML = cod
    ActualizarMostrario2(0)
    ActualizarMostrario2(1)
    usarReproductorAudio(0)
    usarReproductorAudio(1)

    let mirar = [texto('H1', 'Titulo'), texto("p","Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt ducimus voluptatem recusandae adipisci at. Aliquam, sit vel. Placeat laudantium magnam corrupti debitis facere accusamus libero fugit autem laborum saepe explicabo nemo dolorem tenetur, ut eos eaque labore nesciunt nulla, aut quam. Officia reiciendis aut accusamus, fugiat accusantium nisi asperiores unde?"), espacio(1), div(`class="flex"`, `${texto('p', 'textooooooooooooooooooooooo')} ${negrita('la madre en negrita')}`)]
    let textoDePrueba = 'texto("p","desde string")'
    //mirar.push(`${texto("p","desde string")}`)
    mirar.push()
    let cod2 = `
    <div id="prueva" class="padding1 centrar" onmouseout="desrotar('prueva')" onmouseover="rotar('prueva')">
        <div class="color1 padding1 centrar borde2">
    `

    for (let i = 0; i < mirar.length; i++) {
        //console.log("mirar");
        //console.log(mirar[i]);
        cod2 += mirar[i]
    }

    cod2 += `
        </div
    </div>
    `

    document.getElementById("general").innerHTML = cod2


    traducirDiccionario()//en testeo aùn
    avanzarMostrarioAutomatico()
}




/*let palabra = "div"
let nuevaLlave = "otro", nuevoValor = ["otro1", "otro2", "otro3"]

miArre[palabra][nuevaLlave] = nuevoValor

console.log(miArre[palabra]);*/

function traducirDiccionario(){
    let numPadre = 0, numHijo = 0;
    let arreDic = []
    let codigoInyectable = ""
    let diccionario =  {"img": {
        "link": ["https://res.cloudinary.com/dplncudbq/image/upload/v1657473822/mias/red-304573_xrlhrp.png"],
        "style": ["height: 100px;", "background: linear-gradient(rgba(43, 40, 40, 0.467) 0%, rgba(43, 40, 40, 0.467) 80%, white 80%, white 100%);"],
        "class": ["borde1", "color2"],
        "eventos": [`onclick="saludar('desde la imagen baby!!!')"`,  ``],
        "id": [`img1`],
        "animacion": [`onmouseover = "rotar(' img1')"`, `onmouseout = "desrotar(' img1')"`, `"`]//pilas con el id, se le agrega un espacio de mas
        },
    "div": {
            "class2": ["centrar", "padding1", "clase3"],
            "id2": ["id1"], 
            "eventos": [`onclick="saludar('desde el div')" `, "evento2"],
            "style2": [""] 
        }         
        } 
    for (llavePrincipal in diccionario) {
        arreDic.push([])
        //console.log(`llave principal: ${llavePrincipal} \n\n\n`); //muestra el nombre de las llaves principales
        
        for (llaveHija in diccionario[llavePrincipal]) {

            //console.log(`llave hija: ${llaveHija} \n\n`); //muestra el nombre de cada llave interna
            //console.log(diccionario[arreDic][llaveHija]); muestra el contenido de cada llave hija
            arreDic[numPadre].push([])

            for (let u = 0; u < diccionario[llavePrincipal][llaveHija].length; u++) {
                //console.log(`contenido final: ${diccionario[llavePrincipal][llaveHija][u]}` ); 
                //console.log(arreDic);  
                //console.log(`${numPadre} ${numHijo}`);
                arreDic[numPadre][numHijo].push(diccionario[llavePrincipal][llaveHija][u])    
            }
            numHijo += 1;
            //console.log(`\n\n`);
        }
        
        numPadre += 1;
        numHijo = 0;

        if(llavePrincipal == "img"){
            codigoInyectable += imagen(arreDic[0][0], arreDic[0][1], arreDic[0][2], arreDic[0][3], arreDic[0][4], arreDic[0][5])
            //console.log(codigoInyectable);
        } 
        if(llavePrincipal == "div"){
            let clase = `class = "${descomponerArreglo(arreDic[1][0])}"`
            let id = `id = "${descomponerArreglo(arreDic[1][1])}"` 
            let eventos =  `${descomponerArreglo(arreDic[1][2])}` 
            let style = `style = "${descomponerArreglo(arreDic[1][3])}"`
            let concatenado = `${id} ${clase} ${eventos} ${style}`
            codigoInyectable = div(concatenado, codigoInyectable)
        }
    }

    codigoInyectable += `
    <div class="flex">
        <div class="color1 centrar" style=" width: 200px; height: 50px;" id="div1" ondrop="drop(event)" ondragover="allowDrop(event)">
        <img src=" https://res.cloudinary.com/dplncudbq/image/upload/v1657473822/mias/red-304573_xrlhrp.png" draggable="true" ondragstart="drag(event)" id="drag1" width="88" height="31">
        </div>

        <div class="color2 centrar" style=" width: 200px; height: 50px;" id="div2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
    </div>
    `

    document.getElementById("testeo").innerHTML = codigoInyectable;
    
    //console.log(arreDic);
}

function drop(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    console.log("drop");
}

function allowDrop(ev){
    ev.preventDefault();
    console.log("allowDrop");
}

function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);
    console.log("drag");
}

function saludar(text){
    console.log(`Oe bro!!! \n ${text}`)
}