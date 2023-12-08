let muerto = false;

const resources = [];

const hogar = {
    boton: document.getElementById("hogar"),
    adentro: false
}

const nada = document.getElementById("nothing");

const clicks = {
    total: document.getElementById("clicksPerSeason"),
    totalvalue: 4,
    left: document.getElementById("clicksLeft"),
    leftvalue: 4,
    
    season: {
        number: document.getElementById("seasonNumber"),
        value: 0,
        text: document.getElementById("seasonText")
    }
}


function createResources(nombre, display, donde, botonId, spanId, smaxId, valor, maximo, extraer) {
    resources.push({
        name: nombre,
        show: display,
        where: document.getElementById(`${donde}`),
        boton: document.getElementById(`${botonId}`),
        span: document.getElementById(`${spanId}`),
        smax: document.getElementById(`${smaxId}`),
        value: valor,
        max: maximo,
        extract: extraer
    });
}

createResources("tecnologia", true, "tecno", "tecnoBoton", "tecnoSpan", "tecnoMax", 0, 100, 1)
createResources("comida", true, "comida", "comidaBoton", "comidaSpan", "comidaMax", 0, 4, 1)
createResources("piedras", true, "piedras", "piedrasBoton", "piedrasSpan", "piedrasMax", 0, 1, 1)
createResources("ramas", true, "ramas", "ramasBoton", "ramasSpan", "ramasMax", 0, 1, 1)

hogar.boton.addEventListener("click", ()=>{
    if (hogar.adentro === false) {
        hogar.boton.textContent = "Salir";
        hogar.adentro = true;
        clicks.leftvalue--;
        resources[1].value--;
    }
    else {
        hogar.boton.textContent = "Entrar";
        hogar.adentro = false;
        clicks.leftvalue--;
        resources[1].value--;
    }
});

nada.addEventListener("click", ()=>{
    clicks.leftvalue--;
    resources[1].value--;
});

resources[0].boton.addEventListener("click", ()=>{
    if (resources[0].value < resources[0].max) {
        if (clicks.season.text.textContent === "Spring") {
             clicks.leftvalue--;
            resources[0].value += resources[0].extract;
            resources[0].span.textContent = resources[0].value;
        }
        else if (clicks.season.text.textContent === "Winter") {
            clicks.leftvalue--;
            resources[0].value += resources[0].extract;
            resources[1].value--;
            resources[0].span.textContent = resources[0].value;
        }
    }
});

function genResourcesButton(){
    for (let k = 1; k < resources.length; k++){
        if (resources[k].show === true) {
            resources[k].boton.addEventListener("click", ()=>{
                if (resources[k].value < resources[k].max) {
                    if ((clicks.season.text.textContent === "Winter" && k === 1)||((clicks.season.text.textContent === "Spring" && k === 1) && hogar.adentro === true)) {
                        resources[k].span.textContent = resources[k].value;
                    }
                    else if (clicks.season.text.textContent === "Spring") {
                        clicks.leftvalue--;
                        resources[k].value += resources[k].extract;
                        resources[k].span.textContent = resources[k].value;
                    }
                    else if (clicks.season.text.textContent === "Winter") {
                        clicks.leftvalue--;
                        resources[k].value += resources[k].extract;
                        resources[1].value--;
                        resources[k].span.textContent = resources[k].value;
                    }
                }
            });
        }
    }
}

function textBotonUpdate() {
    for (let cual = 0; cual < resources.length; cual++) {
        resources[cual].boton.textContent = `${resources[cual].name} x ${resources[cual].extract}`;
    }
}

function checkClicks() {
    if (clicks.leftvalue <= 0) {
        clicks.leftvalue = clicks.totalvalue;
        clicks.season.value++;
        if (clicks.season.text.textContent === "Winter") {
            clicks.season.text.textContent = "Spring";
        }
        else clicks.season.text.textContent = "Winter";
    }
    clicks.total.textContent = clicks.totalvalue;
    clicks.left.textContent = clicks.leftvalue;
    clicks.season.number.textContent = clicks.season.value;
}

function checkDead() {
    if (resources[1].value < 0 && muerto === false) {
        muerto = true;
        document.write(`<b>MUERTO</b>`);
    }
}

function animation() {
    requestAnimationFrame(animation, 10);
    checkDead();
    textBotonUpdate();
    checkClicks();
    for (let i = 0; i < resources.length; i++) {
        resources[i].boton.textContent = `${resources[i].name} x ${resources[i].extract}`;
        resources[i].span.textContent = resources[i].value;
        resources[i].smax.textContent = resources[i].max;
    };
}

genResourcesButton();
animation();