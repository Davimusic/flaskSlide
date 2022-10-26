let menuID = document.getElementById("menu");
let arr = [['imagen', 'https://res.cloudinary.com/dplncudbq/image/upload/v1658015902/mias/i1_ndc8ga.png'],['#home', 'Home'],['#home2', 'Home2'], ['#home3', 'Home3'], ['#home4', 'Home4'], ['#home', 'Home'],['#home2', 'Home2'],['', '']]

function menu(){

    let alturaPantalla = window.innerHeight; 
    let anchoPantalla = window.innerWidth; 
    let cod = "", display = "", anchoAUsar = "", clasEsconder = "", eventoMenuCelular = "";

    if(anchoPantalla <= 640){
        display = "block"
        anchoAUsar = `style= "height: 50px;"`
        clasEsconder = "none"
        eventoMenuCelular = 'onclick="menuCelular()"'
    } else {
        display = "flex"
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
                <li class=''><img ${eventoMenuCelular} style="height: 30px;" src="${arr[i][1]}" alt="" ></li>
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

function menuCelular(){
    //let menu = document.getElementById()
    alert("FF")
}