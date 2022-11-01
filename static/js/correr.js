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
        <div id="contenedorAudioPlayer${i}" class="padding1"></div>
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
}

