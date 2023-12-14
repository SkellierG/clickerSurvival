$(document).ready(function () {
    let muerto = false;

    const resources = [];

    const hogar = {
        boton: $("#hogar"),
        adentro: false
    };

    const nada = $("#nothing");

    const clicks = {
        total: $("#clicksPerSeason"),
        totalvalue: 4,
        left: $("#clicksLeft"),
        leftvalue: 4,

        season: {
            number: $("#seasonNumber"),
            value: 0,
            text: $("#seasonText")
        }
    };

    function createResources(nombre, display, donde, botonId, spanId, smaxId, valor, maximo, extraer) {
        resources.push({
            name: nombre,
            show: display,
            where: $(`#${donde}`),
            boton: $(`#${botonId}`),
            span: $(`#${spanId}`),
            smax: $(`#${smaxId}`),
            value: valor,
            max: maximo,
            extract: extraer
        });
    }

    createResources("tecnologia", true, "tecno", "tecnoBoton", "tecnoSpan", "tecnoMax", 0, 100, 1);
    createResources("comida", true, "comida", "comidaBoton", "comidaSpan", "comidaMax", 0, 4, 1);
    createResources("piedras", true, "piedras", "piedrasBoton", "piedrasSpan", "piedrasMax", 0, 1, 1);
    createResources("ramas", true, "ramas", "ramasBoton", "ramasSpan", "ramasMax", 0, 1, 1);

    hogar.boton.click(function () {
        if (hogar.adentro === false) {
            hogar.boton.text("Salir");
            hogar.adentro = true;
            clicks.leftvalue--;
            resources[1].value--;
        } else {
            hogar.boton.text("Entrar");
            hogar.adentro = false;
            clicks.leftvalue--;
            resources[1].value--;
        }
    });

    nada.click(function () {
        clicks.leftvalue--;
        resources[1].value--;
    });

    resources[0].boton.click(function () {
        if (resources[0].value < resources[0].max) {
            if (clicks.season.text.text() === "Spring") {
                clicks.leftvalue--;
                resources[0].value += resources[0].extract;
                resources[0].span.text(resources[0].value);
            } else if (clicks.season.text.text() === "Winter") {
                clicks.leftvalue--;
                resources[0].value += resources[0].extract;
                resources[1].value--;
                resources[0].span.text(resources[0].value);
            }
        }
    });

    function genResourcesButton() {
        for (let k = 1; k < resources.length; k++) {
            if (resources[k].show === true) {
                resources[k].boton.click(function () {
                    if (resources[k].value < resources[k].max) {
                        if ((clicks.season.text.text() === "Winter" && k === 1) || ((clicks.season.text.text() === "Spring" && k === 1) && hogar.adentro === true)) {
                            resources[k].span.text(resources[k].value);
                        } else if (clicks.season.text.text() === "Spring") {
                            clicks.leftvalue--;
                            resources[k].value += resources[k].extract;
                            resources[k].span.text(resources[k].value);
                        } else if (clicks.season.text.text() === "Winter") {
                            clicks.leftvalue--;
                            resources[k].value += resources[k].extract;
                            resources[1].value--;
                            resources[k].span.text(resources[k].value);
                        }
                    }
                });
            }
        }
    }

    function textBotonUpdate() {
        for (let cual = 0; cual < resources.length; cual++) {
            resources[cual].boton.text(`${resources[cual].name} x ${resources[cual].extract}`);
        }
    }

    function checkClicks() {
        if (clicks.leftvalue <= 0) {
            clicks.leftvalue = clicks.totalvalue;
            clicks.season.value++;
            if (clicks.season.text.text() === "Winter") {
                clicks.season.text.text("Spring");
            } else clicks.season.text.text("Winter");
        }
        clicks.total.text(clicks.totalvalue);
        clicks.left.text(clicks.leftvalue);
        clicks.season.number.text(clicks.season.value);
    }

    function checkDead() {
        if (resources[1].value < 0 && muerto === false) {
            muerto = true;
            $("body").html("<b>MUERTO</b>");
        }
    }

    function animation() {
        requestAnimationFrame(animation, 10);
        checkDead();
        textBotonUpdate();
        checkClicks();
        for (let i = 0; i < resources.length; i++) {
            resources[i].boton.text(`${resources[i].name} x ${resources[i].extract}`);
            resources[i].span.text(resources[i].value);
            resources[i].smax.text(resources[i].max);
        }
    }

    genResourcesButton();
    animation();
});