from ast import For
from ctypes.wintypes import PINT
from lib2to3.pgen2.token import tok_name
from flask import Flask, render_template, request, redirect, session
from mido import Message, MidiFile, MidiTrack #para usarlo en mido
import random                                 #para usarlo en mido
from itertools import count                   #para reproducir musica sincronizadamente
from time import sleep                        #para reproducir musica sincronizadamente
#import pygame.mixer                           #para reproducir musica sincronizadamente
import threading                              #para reproducir musica sincronizadamente
import pymongo                      # para la base de datos
from bson.objectid import ObjectId  # para poder usar _id de mongo
import smtplib        #para enviar mensajes a correos


app = Flask(__name__)
app.secret_key = "miclaveXD"

tareas = []
tareaNotas = []
compaces = []
tonalidadVolatil = "C"
modoVolatil = "mayor"
existeCorreo = "noExiste"
tipoSecuencia = ""
caracteristicaSilencioSecuenica = ""
caracteristicaFigurasSecuenica = ""
largoDeIdeas = 0


 

#conexcion a base de datos
myClient = pymongo.MongoClient("mongodb+srv://davis123:davis123@cluster0.hujqu.mongodb.net/test3")
myDb = myClient["3febrero2022"]#basde de datos
myCollection=myDb["coleccion1"]#coleccion
    

#metodos externos
def recuperarContrasena(correo):
    buscarInfo = myCollection.find_one({"correo":correo})
    id = str([buscarInfo['_id']])
    idFiltrado = ""
    for i in range(11, (len(id)-3)):
        idFiltrado += id[i]
    query = {"_id": ObjectId(idFiltrado)}
    muestraId = myCollection.find_one(query)
    contrasena = str(muestraId['contrasena'])
    #ahora enviamos el mensaje
    message = "Hola, esta es tu clave \n " + contrasena + "\n\n\n\n\n\n Gracias por usar nuestros servicios!!!"
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login('davimusikherokkuapp@gmail.com','davimusik')
    server.sendmail('davimusikherokkuapp@gmail.com', correo, message)
    server.quit()
    print("mensaje de recuperación enviado con exito")







@app.route('/')
def principal():
    # dedicado al logeo 
    return render_template('index.html')


@app.route('/agregar', methods=["GET", "POST"])
def agregar():
        
    if request.method == "GET":
        return render_template("agregar.html")
    else:
        
        tarea = request.form.get("tarea")    
        tareas.append(tarea)
        return redirect("/")

@app.route('/mostraError') #borrarla cuando ya pase la fase beta
def mostrarError():
    return render_template('mostrarError.html')



@app.route('/borrarIdea', methods=["POST"]) 
def borrarIdea():
        global tareas
        global tareaNotas
        global tipoSecuencia
        global caracteristicaSilencioSecuenica
        global caracteristicaFigurasSecuenica
        borrarIdea = request.form.get("borrarIdea") 
           
        try:
                #primero buscamos lo ya hecho, borrar idea en mongodb
                correo = str(session["correo"])
                buscarInfo = myCollection.find_one({"correo":correo})
                id = str([buscarInfo['_id']])
                idFiltrado = ""
                for i in range(11, (len(id)-3)):
                    idFiltrado += id[i]
                query = {"_id": ObjectId(idFiltrado)}
                muestraId = myCollection.find_one(query)
                tareas = []
                tareas = muestraId['secuenciasFiguras']
                tareaNotas = []
                tareaNotas = muestraId['secuenciasNotas']
                compaces = []
                compaces = muestraId['secuenciasCompaces']
                tipoSecuencia = ""
                caracteristicaSilencioSecuenica = ""
                caracteristicaFigurasSecuenica = ""
                #ahora se les inserta la idea nueva
                tareas.pop(int(borrarIdea))  
                tareaNotas.pop(int(borrarIdea))
                compaces.pop(int(borrarIdea))
                #se inserta a la base de datos
                updateTask = {"$set":{"secuenciasFiguras": tareas, "secuenciasNotas": tareaNotas, "secuenciasCompaces": compaces, "tipoSecuencia":tipoSecuencia, "caracteristicaSilencioSecuenica":caracteristicaSilencioSecuenica, "caracteristicaFigurasSecuenica":caracteristicaFigurasSecuenica}}
                result = myCollection.update_one(query, updateTask)
              
        except:
                print(" error al tratar de borrar")
                return redirect("/") 
             
        #para decidir a donde redirigir
        if str(request.form.get("ubicacion")) == "dictados":
            return redirect("/dictados") 
        else: 
            return redirect("/")   
          

@app.route('/lenguajes')
def mostrarLenguajes():
    misLenguajes = ("PHP", "Python", "Java", "C#",
                    "JavaScript", "Perl", "Ruby", "Rust")
    return render_template('lenguajes.html', lenguajes=misLenguajes)


@app.route('/contacto')
def contacto():
    return render_template('contacto.html')


@app.route('/sobremi')
def sobremi():
    return render_template('sobremi.html')

@app.route('/libros')
def libros():
    return render_template('libros.html') 





@app.route('/dictados')
def dictado():
    global tareas
    global tareaNotas
    global compaces 
    global tonalidadVolatil 
    global modoVolatil 
    global existeCorreo 
    global largoDeIdeas 
    global tipoSecuencia
    global caracteristicaSilencioSecuenica
    global caracteristicaFigurasSecuenica

    if 'correo' in session:
            print("mirar correo " + str(session["correo"]))
            correo = str(session["correo"])
            buscarInfo = myCollection.find_one({"correo":correo})
            id = str([buscarInfo['_id']])
            idFiltrado = ""
            for i in range(11, (len(id)-3)):
                idFiltrado += id[i]
            idFiltrado
            query = {"_id": ObjectId(idFiltrado)}
            muestraId = myCollection.find_one(query)
            
            tareas = []
            tareas = muestraId['secuenciasFiguras']
            tareaNotas = muestraId['secuenciasNotas']
            compaces = muestraId['secuenciasCompaces']
            largoDeIdeas = len(tareas)
            tonalidadVolatil = muestraId['tonalidadVolatil']
            modoVolatil = muestraId['modoVolatil']
            tipoSecuencia = muestraId['tipoSecuencia']
            caracteristicaSilencioSecuenica = muestraId['caracteristicaSilencioSecuenica']
            caracteristicaFigurasSecuenica = muestraId['caracteristicaFigurasSecuenica']
            secuenciasCompaces = muestraId['secuenciasCompaces']
            
            print("largo ideas " + str(len(tareas)))
            print(muestraId)
            
            return render_template('dictados.html', tareas = tareas, largoDeIdeas = largoDeIdeas, tareaNotas = tareaNotas, compaces = compaces, tonalidadVolatil = tonalidadVolatil, modoVolatil = modoVolatil, tipoSecuencia = tipoSecuencia, caracteristicaSilencioSecuenica = caracteristicaSilencioSecuenica, caracteristicaFigurasSecuenica = caracteristicaFigurasSecuenica, secuenciasCompaces = secuenciasCompaces)    
    else:
            return redirect("/")

def verificarExistenciaDelCorreo(correo):
    global existeCorreo
    
    existeCorreo = "noExiste"
    buscarInfo = myCollection.find({"correo":correo})
    print("informacion desde busqueda ") 
    for document in buscarInfo:
            existeCorreo = "habilitado"
            print(document)
    print("desde función verificarExistenciaDelCorreo, existeCorreo? " + str(existeCorreo))


@app.route('/logear', methods=["POST"])
def logear():
    correo = request.form.get("email") 
    contrasena =  request.form.get("contrasena")
    contrasenaVerificar = request.form.get("contrasenaVerificar")
    global existeCorreo
    
    verificarExistenciaDelCorreo(correo)
    if existeCorreo == "habilitado" and contrasenaVerificar == "" and contrasena == "":
            recuperarContrasena(correo)
            existeCorreo = "mensajeEnviado"
    elif existeCorreo == "habilitado" and contrasenaVerificar != "":
            existeCorreo = "correoExistente"
    elif contrasenaVerificar != "":
        if contrasena == contrasenaVerificar: # es decir, validamos si está registrandose, de lo contrario validamos si el correo con contraseña es correcta
            #se crea un nuevo usuario a la base de datos
            crearUsuario = {"correo":correo, "contrasena":contrasena, "secuenciasFiguras": [], "secuenciasNotas": [], "secuenciasCompaces":[], "tonalidadVolatil": "C", "modoVolatil": "mayor", "tipoSecuencia":"", "caracteristicaSilencioSecuenica":"", "caracteristicaFigurasSecuenica":"", "estadisticaUsuario":{ "soloNota":{"correctos":0,"incorrectos":0}, "percusivo":{"correctos":0,"incorrectos":0}, "melodico":{"correctos":0,"incorrectos":0}}}
            myCollection.insert_one(crearUsuario)
            existeCorreo = "habilitado"
            session["correo"] = correo
            print("usuario creado exitosamente...")
            buscarInfo = myCollection.find_one({"correo":correo})
            id = str([buscarInfo['_id']])
            idFiltrado = ""
            for i in range(11, (len(id)-3)):
                idFiltrado += id[i]
            idGlobal = idFiltrado
            query = {"_id": ObjectId(idGlobal)}
            return redirect("/dictados") 
        else:
            existeCorreo = "creacionUsuarioHerrada"
    else:    
        verificarExistenciaDelCorreo(correo)
        if existeCorreo == "habilitado": # entonces buscamos su correo y de ahí su id
            buscarInfo = myCollection.find_one({"correo":correo})
            id = str([buscarInfo['_id']])
            idFiltrado = ""
            for i in range(11, (len(id)-3)):
                idFiltrado += id[i]
            contraseñaCorrecta =  str(buscarInfo['contrasena'])
            print("id a usar: " + idFiltrado + ", contrasena " +  contraseñaCorrecta)
            if contraseñaCorrecta == contrasena:
                  session["correo"] = correo
                  print("logeo exitoso...")
                  return redirect("/dictados") 
            else:
                  existeCorreo = "logeoErrado"
        else:
            existeCorreo = "noExiste"       

    return render_template("index.html", existeCorreo = existeCorreo)


# para usar mido  
@app.route('/crearIdeaMusical', methods=["POST"])
def crearIdeaMusical():
    global tareas
    global tareaNotas
    global tonalidadVolatil
    global modoVolatil
    global tipoSecuencia
    global caracteristicaSilencioSecuenica
    global caracteristicaFigurasSecuenica

    #print("referencia_a_crear: " + str(request.form.get("referencia_a_crear")) + ", " + str(request.form.get("semicorcheas")) + ", " + str(request.form.get("corcheas")) + ", " + str(request.form.get("negras")) + ", " + str(request.form.get("blancas")) + ", " + str(request.form.get("redondas")) + ", " + str(request.form.get("si")) + ", " + str(request.form.get("no")) )
    #print("mirar... " +  str(request.form.get("cantidadCompasinfo")) + " " + str(request.form.get("silenciosinfo")) +  " " + str(request.form.get("figurasinfo")) + ", tonalidad: " + str(request.form.get("tonalidadinfo")) + ", modo: " +  str(request.form.get("modoinfo"))   )
    #print("resultado: "  + str(request.form.get("resultadoEjercicioSolonotainfo")) + str(request.form.get("resultadoEjercicioRitmoinfo")) + str(request.form.get("resultadoEjercicioMelodicoinfo")))


    # estas variables locales serán usadas para cada una de la ideas a crear
    cantidadCompaces =  0
    referenciaCompas =  ""
    referenciaCompasACrear = 0
    silencio = ""
    figuras = ""
    tonalidadAleatoria = {0:"C", 1:"D", 2:"E", 3:"F", 4:"G", 5:"A", 6:"B"}
    modoAleatorio = {0:"mayor", 1:"menor"}
    
    #validar las referencias a crear
    tipoSecuencia = str(request.form.get("referencia_a_crear"))
    if str(request.form.get("referencia_a_crear")) == "dictadoSoloNota":
            cantidadCompaces = 1
            referenciaCompas =  "2/4"
            silencio = "no"
            figuras = "blancas" 
            caracteristicaFigurasSecuenica  = str(request.form.get("accionSoloNota"))
            caracteristicaSilencioSecuenica = "no"
            if str(request.form.get("accionSoloNota")) == "naturales":
                        tonalidadVolatil = "C"
                        modoVolatil = "mayor"
            elif str(request.form.get("accionSoloNota")) == "alteraciones":
                        tonalidadVolatil = "B" 
                        modoVolatil = "mayor"
            elif str(request.form.get("accionSoloNota")) == "aleatorio": 
                        numAleatorio = random.randint(0, 6)
                        tonalidadVolatil = tonalidadAleatoria[numAleatorio]
                        numAleatorio = random.randint(0, 1)
                        modoVolatil = modoAleatorio[numAleatorio]
    elif str(request.form.get("referencia_a_crear")) == "dictadoPrecusivo":
            tonalidadVolatil = "C"
            modoVolatil = "mayor"
            cantidadCompaces = int(request.form.get("cantidadCompacesDictadoPercusivo"))
            referenciaCompas =  str(request.form.get("compasDictadoPercusivo"))
            silencio = str(request.form.get("silenciosDictadoPercusivo"))
            figuras  = str(request.form.get("figurasDictadoPercusivo"))
            caracteristicaSilencioSecuenica = str(request.form.get("silenciosDictadoPercusivo"))
            caracteristicaFigurasSecuenica = figuras
            print("figuras a usar " + str(request.form.get("figurasDictadoPercusivo")) + ", silencios " + str(request.form.get("silenciosDictadoPercusivo")))
    elif str(request.form.get("referencia_a_crear")) == "dictadoMelodico":
            caracteristicaSilencioSecuenica = str(request.form.get("silenciosinfo"))  
            caracteristicaFigurasSecuenica = str(request.form.get("figurasinfo")) 
            if str(request.form.get("tonalidadinfo")) == "aleatorio":
                    numAleatorio = random.randint(0, 6)
                    tonalidadVolatil = tonalidadAleatoria[numAleatorio]
            else:
                    tonalidadVolatil = str(request.form.get("tonalidadinfo"))

            if str(request.form.get("modoinfo")) == "aleatorio":
                    numAleatorio = random.randint(0, 1)
                    modoVolatil = modoAleatorio[numAleatorio]
            else:
                    modoVolatil = str(request.form.get("modoinfo")) 

            cantidadCompaces =  int(request.form.get("cantidadCompasinfo"))
            referenciaCompas =  str(request.form.get("compasinfo"))
            silencio = str(request.form.get("silenciosinfo"))  
            figuras = str(request.form.get("figurasinfo"))       


   

    
    
    mid = MidiFile()
    track = MidiTrack()
    mid.tracks.append(track)

    duracionFigura =     {'redonda': 1920, 'blanca': 960, 'negra': 480, 'corchea': 240}
    duracionFiguraParaAcumulado =    {'redonda': 4,    'blanca': 2,   'negra': 1,   'corchea': .5}
    figuraAleatoria =   {'redonda': 1,    'blanca': 2,   'negra': 4,   'corchea': 6}
    nombreFiguras = ['redonda',       'blanca',      'negra',      'corchea']
    ritmoDePaso = []
    notasDePaso = []
    a = 0
   
    if referenciaCompas == "4/4":
        referenciaCompasACrear = 4
    elif  referenciaCompas == "3/4":
        referenciaCompasACrear = 3
    elif referenciaCompas == "2/4":
        referenciaCompasACrear = 2
    elif referenciaCompas == "6/8":
        referenciaCompasACrear = 3    



    notas = {1:"C", 2:"Db", 3:"D", 4:"Eb", 5:"E", 6:"F", 7:"Gb", 8:"G", 9:"Ab", 10:"A", 11:"Bb", 12:"B"}
    notaMidi = {"C":60, "Db": 61, "D": 62, "Eb": 63, "E": 64, "F":65, "Gb":66, "G":67, "Ab":68, "A":69, "Bb": 70, "B":71}
    convercionGrado = {"C":"I", "Db":"IIb", "D":"II", "Eb":"IIIb", "E":"III", "F":"IV", "Gb":"Vb", "G":"V", "Ab":"VIb", "A":"VI", "Bb":"VIIb", "B":"VII"}
    track.append(Message('program_change', program=29, time=0))
                  #figura, nota 
    def aderirIdea():
        #duracionPaso = duracionFigura[figura]
        #notaPaso = notaMidi[nota]  #arreglar a futuro
        #track.append(Message('note_on', note=notaPaso, velocity=100, time=0))
        #track.append(Message('note_off', note=notaPaso, velocity=100, time=duracionPaso))
        # a futuro hacer funcionar el archivo midi

        a = 0
        silencioEnUso = False
        while a < (cantidadCompaces * referenciaCompasACrear):
           
            if silencio == "si":
                num = random.randint(1,3)
                if num == 3 and silencioEnUso == False:
                    silencioEnUso = True
                    notasDePaso.append("silencio")
                else:
                    silencioEnUso = False
                    if str(request.form.get("referencia_a_crear")) == "dictadoPrecusivo":
                        notasDePaso.append("VI")     
                    else:
                        num = random.randint(1,12) 
                        paso = convercionGrado[notas[num]] 
                        notasDePaso.append(paso)    
            else:
                num = random.randint(1,12) 
                if str(request.form.get("referencia_a_crear")) == "dictadoSoloNota" and str(request.form.get("accionSoloNota")) == "alteraciones":
                        numLista = random.randint(1, 5)
                        lista = {1:"II", 2:"IIIb", 3:"V", 4:"VIb", 5:"VIIb"}
                        paso = lista[numLista]
                        notasDePaso.append(paso)
                elif str(request.form.get("referencia_a_crear")) == "dictadoPrecusivo":
                        notasDePaso.append("VI")       
                else:            
                        paso = convercionGrado[notas[num]] 
                        notasDePaso.append(paso)

            if figuras == "negras" and ((a+1) <= (cantidadCompaces * referenciaCompasACrear)):
               ritmoDePaso.append("negra")
               a += 1 
            elif figuras == "blancas" and ((a+2) <= (cantidadCompaces * referenciaCompasACrear)):
               ritmoDePaso.append("blanca")
               a += 2
            elif figuras == "corcheas" and ((a+0.5) <= (cantidadCompaces * referenciaCompasACrear)):
               ritmoDePaso.append("corchea")
               a += 0.5
            elif figuras == "mixto" or a < (cantidadCompaces * referenciaCompasACrear):
               figu = {1:"corchea", 2:"negra", 3:"blanca", 4:"redonda"}
               dura = {"corchea":0.5, "negra":1, "blanca":2, "redonda":4} 
               conDura = {0.5:"corchea", 1:"negra", 2:"blanca", 4:"redonda"}
               num = random.randint(1, 4)
               numPaso = dura[figu[num]]
               if (numPaso + a)<= (cantidadCompaces * referenciaCompasACrear):
                   print("cola ... " + figu[num] + ", numPaso .. " + str(numPaso))
                   ritmoDePaso.append(figu[num])
                   a += numPaso
               else:
                   restante = (cantidadCompaces * referenciaCompasACrear) - a
                   ritmoDePaso.append(conDura[restante])
                   a += restante
  
              #nuevaFigura, notaPasar
    aderirIdea()

    
    longitudActual = len(tareas)
    print(str(longitudActual + 1) + ' lonjitud actual' )
    print(ritmoDePaso)
    
    
    #para guardar la nueva idea en la base de datos
    #primero buscamos lo ya hecho
    correo = str(session["correo"])
    buscarInfo = myCollection.find_one({"correo":correo})
    id = str([buscarInfo['_id']])
    idFiltrado = ""
    for i in range(11, (len(id)-3)):
        idFiltrado += id[i]
    query = {"_id": ObjectId(idFiltrado)}
    #no busco su id Porque deseo que siempre tenga una sola secuenica guardada en la base de datos
    tareas = []
    tareaNotas = []
    compaces = []
    #este es la validación de las respuetas evaluadas para posteriormente acualizarlas en la base de datos
    muestraId = myCollection.find_one(query)
    a = muestraId['estadisticaUsuario']  
    b =  a["soloNota"]; conteoCorrectosSoloNota = int(b["correctos"]); conteoIncorrectosSoloNota = int(b["incorrectos"]) 
    b = a["percusivo"]; conteoCorrectosRitmos = int(b["correctos"]); conteoIncorrectosRitmos = int(b["incorrectos"])
    b =  a["melodico"]; conteoCorrectosMelodias = int(b["correctos"]); conteoIncorrectosMelodias = int(b["incorrectos"])
   
    #print(str(request.form.get("resultadoEjercicioSolonotainfo")) +  " " + str(request.form.get("resultadoEjercicioRitmoinfo")) + " " + str(request.form.get("resultadoEjercicioMelodicoinfo")))
    if   str(request.form.get("resultadoEjercicio")) == "dictadoSoloNotatrue" :
            print("resultadoEjercicio")
            conteoCorrectosSoloNota += 1
    elif str(request.form.get("resultadoEjercicio")) == "dictadoSoloNotafalse" :
            conteoIncorrectosSoloNota += 1    
    elif str(request.form.get("resultadoEjercicio")) == "dictadoPrecusivotrue" :
            conteoCorrectosRitmos += 1
    elif str(request.form.get("resultadoEjercicio")) == "dictadoPrecusivofalse" :
            conteoIncorrectosRitmos += 1
    elif   str(request.form.get("resultadoEjercicio")) == "dictadoMelodicotrue":
            conteoCorrectosMelodias += 1
    elif str(request.form.get("resultadoEjercicio")) == "dictadoMelodicofalse":
            conteoIncorrectosMelodias += 1 
   
    

   
    #ahora se les inserta la idea nueva
    tareas.append(ritmoDePaso)
    tareaNotas.append(notasDePaso)
    compaces.append(referenciaCompas)
    #se inserta a la base de datos
    updateTask = {"$set":{"secuenciasFiguras": tareas, "secuenciasNotas": tareaNotas, "secuenciasCompaces":compaces, "tonalidadVolatil": tonalidadVolatil, "modoVolatil": modoVolatil, "tipoSecuencia":tipoSecuencia, "caracteristicaSilencioSecuenica": caracteristicaSilencioSecuenica, "caracteristicaFigurasSecuenica":caracteristicaFigurasSecuenica, "estadisticaUsuario":{ "soloNota":{"correctos":conteoCorrectosSoloNota,"incorrectos":conteoIncorrectosSoloNota}, "percusivo":{"correctos":conteoCorrectosRitmos,"incorrectos":conteoIncorrectosRitmos}, "melodico":{"correctos":conteoCorrectosMelodias,"incorrectos":conteoIncorrectosMelodias}}}}
    myCollection.update_one(query, updateTask)

    mid.save('idea.mid')
    print(str(mid) )

    #para decidir a donde redirigir
    return redirect("/dictados") 
   

@app.route('/salir')
def salir():
    session.clear()
    return render_template('index.html')     

@app.route('/estadistica')
def estadistica():
    correo = str(session["correo"])
    buscarInfo = myCollection.find_one({"correo":correo})
    id = str([buscarInfo['_id']])
    idFiltrado = ""
    for i in range(11, (len(id)-3)):
        idFiltrado += id[i]
    query = {"_id": ObjectId(idFiltrado)}
    muestraId = myCollection.find_one(query)
    a = muestraId['estadisticaUsuario']  
    b =  a["soloNota"]; conteoCorrectosSoloNota = int(b["correctos"]); conteoIncorrectosSoloNota = int(b["incorrectos"]) 
    b = a["percusivo"]; conteoCorrectosRitmos = int(b["correctos"]); conteoIncorrectosRitmos = int(b["incorrectos"])
    b =  a["melodico"]; conteoCorrectosMelodias = int(b["correctos"]); conteoIncorrectosMelodias = int(b["incorrectos"])
   
    
    return render_template('estadistica.html',  conteoCorrectosSoloNota = conteoCorrectosSoloNota, conteoIncorrectosSoloNota = conteoIncorrectosSoloNota, conteoCorrectosRitmos = conteoCorrectosRitmos, conteoIncorrectosRitmos = conteoIncorrectosRitmos, conteoCorrectosMelodias = conteoCorrectosMelodias, conteoIncorrectosMelodias = conteoIncorrectosMelodias)     
    

if __name__ == '__main__':
    app.run(debug=True, port=3000)
