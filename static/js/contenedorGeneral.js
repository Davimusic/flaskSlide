function texto(tipo, acc, text){
    let cod = `
        <${quitarEspacioInicial(tipo)} ${acc}>
            ${text}
        </${quitarEspacioInicial(tipo)}>
    `
    return cod;
}

function espacio(num){
    let cod = ""
    if(num == undefined){
        cod = `
        <br>
    ` 
    } else {
        for (let u = 0; u < num; u++) {
            //console.log("entra " + u);
            cod += `
            <br>
        ` 
        }
    }
    //console.log(cod);
    return cod;
}

function negrita(text){
    let cod = `
    <b> ${text} </b>
    `
    return cod;
}

function div(atributos, info){
    let cod = `
        <div ${atributos}>
            ${info}
        </div>
    `
    //console.log(cod);
    return cod;
}

function imagen(link, style, clas, events, id, animation){
    //console.log(style);
    let cod = `
    <img id="${descomponerArreglo(id)}" ${descomponerArreglo(animation)} src="${descomponerArreglo(link)}" style="${descomponerArreglo(style)}" class="${descomponerArreglo(clas)}" ${descomponerArreglo(events)} alt="">
    `
    return cod;
}

function quitarEspacioInicial(text){
    return text.slice(1)
}

function descomponerArreglo(arr){
    let text = ""
    for (let u = 0; u < arr.length; u++) {
        text += ` ${arr[u]}`   
    }
    return text;
}