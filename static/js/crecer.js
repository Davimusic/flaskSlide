function crecer(id, altura){
    let imagen = document.getElementById(id)
    let calculo = (altura/100)* 120
    console.log(id + " " + altura);
    imagen.style.transition = "0.5s";
    imagen.style.height = `${calculo}px`
}

function decrecer(id, altura){
    let imagen = document.getElementById(id)
    imagen.style.height = `${altura}px`
}

function rotar(id){
    console.log(id);
    let imagen = document.getElementById(id)
    imagen.style.transition = "0.5s";
    imagen.style.transform = 'rotate(20deg)'
}

function desrotar(id){
    let imagen = document.getElementById(id)
    imagen.style.transition = "0.5s";
    imagen.style.transform = 'rotate(0deg)'
}

