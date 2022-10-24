function crecer(id, altura){
    let imagen = document.getElementById(id)
    let calculo = (altura/100)* 120
    console.log(calculo);
    imagen.style.transition = "0.5s";
    imagen.style.height = `${calculo}px`
}

function decrecer(id, altura){
    let imagen = document.getElementById(id)
    imagen.style.height = `${altura}px`
}

