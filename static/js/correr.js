function correr(){
    let cod = ""
    let padre = document.getElementById("padre")

    cod += menu()
    cod += `<div id="contenedorAudioPlayer${0}" class=""></div>`
    cod += `<div id="contenedor${0}" class="padding1"></div>`
    cod += `<div id="contenedorAudioPlayer${1}" class=""></div>`
    cod += `<div id="contenedor${1}" class="padding1"></div>`

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

    cod += traducirDiccionario()//en testeo aùn
    padre.innerHTML = cod + cod2



    ActualizarMostrario2(0)
    ActualizarMostrario2(1)
    usarReproductorAudio(0)
    usarReproductorAudio(1)

    
    avanzarMostrarioAutomatico()
}

/*let palabra = "div"
let nuevaLlave = "otro", nuevoValor = ["otro1", "otro2", "otro3"]

miArre[palabra][nuevaLlave] = nuevoValor

console.log(miArre[palabra]);*/

function traducirDiccionario(){
    let numHijo = 0;
    let arreDic = []
    let codigoInyectable = ""
    let diccionario =  [
                            {"img": {
                                "link": ["https://res.cloudinary.com/dplncudbq/image/upload/v1657473822/mias/red-304573_xrlhrp.png"],
                                "style": ["height: 100px;", "background: linear-gradient(rgba(43, 40, 40, 0.467) 0%, rgba(43, 40, 40, 0.467) 80%, white 80%, white 100%);"],
                                "class": ["borde1", "color2"],
                                "eventos": [`onclick="saludar('desde la imagen baby!!!')"`,  ``],
                                "id": [`img1`],
                                "animacion": [`onmouseover = "rotar(' img1')"`, `onmouseout = "desrotar(' img1')"`, `"`]//pilas con el id, se le agrega un espacio de mas
                            }},
                            {"div": {
                                    "class2": ["centrar", "padding1", "clase3"],
                                    "id": ["id1"], 
                                    "eventos": [`onclick="saludar('desde el div')" `, "evento2"],
                                    "style2": [""],
                                    "animacion": [``] 
                            }},
                            {"div": {
                                "class2": ["centrar", "color1", "padding1", "borde1"],
                                "id": ["id2"], 
                                "eventos": [`onclick="saludar('desde el divMAsGrande')" `, "evento2"],
                                "style2": [""],
                                "animacion": [`onmouseover = "crecer(' id2', '120')"`, `onmouseout = "decrecer(' id2', '120')"`]  
                            }}
                        ]

    for (let u = 0; u < diccionario.length; u++) {
        arreDic = []
        for (llavePrincipal in diccionario[u]) {
            arreDic.push([])
            for (llaveHija in diccionario[u][llavePrincipal]) {
                arreDic[0].push([])
                for (let i = 0; i < diccionario[u][llavePrincipal][llaveHija].length; i++) {
                    arreDic[0][numHijo].push(diccionario[u][llavePrincipal][llaveHija][i])    
                }
                numHijo += 1;
            }
            numHijo = 0;
            if(llavePrincipal == "img"){
                codigoInyectable += imagen(arreDic[0][0], arreDic[0][1], arreDic[0][2], arreDic[0][3], arreDic[0][4], arreDic[0][5])
            } 
            if(llavePrincipal == "div"){
                let clase = `class = "${descomponerArreglo(arreDic[0][0])}"`
                let id = `id = "${descomponerArreglo(arreDic[0][1])}"` 
                let eventos =  `${descomponerArreglo(arreDic[0][2])}` 
                let style = `style = "${descomponerArreglo(arreDic[0][3])}"`
                let animation = `${descomponerArreglo(arreDic[0][4])}`
                let concatenado = `${id} ${clase} ${eventos} ${style} ${animation}`
                codigoInyectable = div(concatenado, codigoInyectable)
            }
        }
    }
    return codigoInyectable
}

function saludar(text){
    console.log(`Oe bro!!! \n ${text}`)
}


