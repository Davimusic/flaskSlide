let textDragDrop = `
<div class="flex">
    <div class="color1 centrar" style=" width: 200px; height: 50px;" id="div1" ondrop="drop(event)" ondragover="allowDrop(event)">
        <img src=" https://res.cloudinary.com/dplncudbq/image/upload/v1657473822/mias/red-304573_xrlhrp.png" draggable="true" ondragstart="drag(event)" id="drag1" width="88" height="31">
    </div>
    <div class="color2 centrar" style=" width: 200px; height: 50px;" id="div2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
</div>
`

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