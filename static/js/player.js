let audioEnUso = false
let punteroAudio, punteroBarraDeAudio;
let arreAudios =   [['https://res.cloudinary.com/dplncudbq/video/upload/v1658158699/mias/26mesclaLista_kf3qai.wav','https://res.cloudinary.com/dplncudbq/image/upload/v1658015902/mias/i1_ndc8ga.png', 'titulo', 'chachara.....'],
                    ['https://res.cloudinary.com/dplncudbq/video/upload/v1657579441/mias/m1_s2epfa.mp3','https://res.cloudinary.com/dplncudbq/image/upload/v1657473822/mias/red-304573_xrlhrp.png', 'titulo2', 'chachara2.....'],
                    ['https://res.cloudinary.com/dplncudbq/video/upload/v1657299118/mias/m2_koysag.mp3','https://res.cloudinary.com/dplncudbq/image/upload/v1657297550/mias/logoGenerico_dotmc8.png', 'titulo3', 'chachara3.....']    ] 


function usarReproductorAudio(){
    let audioPlayer = document.getElementById("audioPlayer")
    let cod = "";

    cod += `
    <div  class="padding1" >
        <div class="padding1 color1 sombra">
    `

    for (let i = 0; i < arreAudios.length; i++) {
            cod += `
            <div id="div_miAudio${i}" class="flex" onclick="seleccionarAudio('miAudio${i}')">
                <div>
                    <img style="width:50px" src="${arreAudios[i][1]}" alt="seo">
                </div>
                <div class="block">
                    <div>
                        ${arreAudios[i][2]}
                    </div>
                    <div>
                        ${arreAudios[i][3]}
                    </div>
                </div>
            </div>
            <audio id="miAudio${i}">
                <source src="${arreAudios[i][0]}" type="audio/wav">
                Your browser does not support the audio element.
            </audio>
            `
        } 

        cod += `
            <img style="width:50px" onclick="playAudio()" src="../static/images/play.png" alt="seo">
            <img style="width:50px" onclick="pauseAudio()" src="../static/images/pause.png" alt="seo">
            <img style="width:50px" onclick="stopAudio()" src="../static/images/stop.png" alt="seo">
            <input class="rangeLimpio fondoTransparente" type="range" onchange="actualizarUbicacionAudio(this.value)" id="barraDeReproductorAudio" value="0" max=""/>
        </div>
    </div>
    `

    audioPlayer.innerHTML = cod;
}

function seleccionarAudio(id){

    if(punteroAudio != undefined){
        stopAudio()
    }

    punteroAudio = document.getElementById(id); 
    
    let buscar = "";
    for (let i = 0; i < arreAudios.length; i++) {
        buscar = `div_miAudio${i}`
        document.getElementById(buscar).classList.remove("fondoTransparente")
    }
    buscar = `div_${id}`
    document.getElementById(buscar).classList.add("fondoTransparente")

    punteroBarraDeAudio =  document.getElementById("barraDeReproductorAudio")
    punteroBarraDeAudio.value = 0;
    punteroBarraDeAudio.max = punteroAudio.duration;
    
    playAudio()
}

function playAudio() { 
    if(punteroAudio == undefined){
        if(arreAudios.length != 0){
            seleccionarAudio('miAudio0')
        } else {
            alert("no hay audios cargados!!!")
        }
    } else {
        punteroAudio.play(); 
        audioEnUso = true
        cronometro()
    }
    
} 

function pauseAudio() { 
    punteroAudio.pause(); 
    audioEnUso = false;
} 

function stopAudio() {
    pauseAudio()
    punteroAudio.currentTime = 0;
    punteroBarraDeAudio.value = 0;
}

function actualizarUbicacionAudio(acc){
    punteroAudio.currentTime = acc;
}

function cronometro(){
    if(audioEnUso == true){
        punteroBarraDeAudio.value = parseInt(punteroBarraDeAudio.value) + 1
        setTimeout(cronometro, 1000)
    }
}