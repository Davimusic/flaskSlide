let menuID = document.getElementById("menu");
let arr = [['imagen', 'https://res.cloudinary.com/dplncudbq/image/upload/v1658015902/mias/i1_ndc8ga.png'],['#home', 'Home'],['#home2', 'Home2'], ['#home3', 'Home3'], ['#home4', 'Home4'], ['#home', 'Home'],['#home2', 'Home2'],['', '']]

function menu(){

    let alturaPantalla = window.innerHeight; 
    let anchoPantalla = window.innerWidth; 
    let cod = "", display = "", anchoAUsar = "", clasEsconder = "", eventoMenuCelular = "";
    let alturaMenu = 30, copiaAlaturaMenu = 0;

    if(anchoPantalla <= 640){
        display = "block"
        anchoAUsar = `style= "height: 0px;"`
        clasEsconder = "none"
        eventoMenuCelular = 'onclick="menuCelular()"'
    } else {
        display = "flex"
        copiaAlaturaMenu = alturaMenu;
    }
    
    cod += 
    `
    <div id="menuDesplegable" class="color1 contenedorGaleria" ${anchoAUsar}>
        <ul class="${display} espacioEquilatero ListaLimpia">
    `
        for (let i = 0; i < arr.length; i++) {
            if(arr[i][0] != 'imagen'){
                cod +=`    
                <li class='${clasEsconder}'><a class='ListaLimpia' href="${arr[i][0]}">${arr[i][1]}</a></li>
                `
            } else {
                cod +=`    
                <li class=''><img ${eventoMenuCelular} style="height: ${alturaMenu - 5}px;" src="${arr[i][1]}" alt="" ></li>
                `
            }
        }
    cod += 
    ` 
        </ul>
    </div>
    `
    menuID.innerHTML = cod;
}

let bandera = 0
function menuCelular(){
    let menu = document.getElementById("menuDesplegable")
    menu.style.transition = "0.5s";
    if(bandera  == 0 ){
        bandera = 1
        menu.style.height = `${alturaPantalla + 25}px`
    } else {
        bandera = 0
        menu.style.height = `0px` //sacado de la altura que queda al renderizar en modo Movil
    }
    //alert("FF")
}