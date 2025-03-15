// Función para solicitar datos al usuario
function solicitarDatos() {
    let peso = parseFloat(prompt("Ingrese su peso en kg:"));
    let altura = parseFloat(prompt("Ingrese su altura en metros:"));

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert("Datos inválidos. Inténtelo nuevamente.");
        return solicitarDatos();
    }

    return { peso, altura };
}

// Función para calcular el IMC
function calcularIMC(peso, altura) {
    let imc = peso / (altura * altura);
    let clasificacion = "";

    if (imc < 18.5) {
        clasificacion = "Bajo peso";
    } else if (imc >= 18.5 && imc < 24.9) {
        clasificacion = "Peso normal";
    } else if (imc >= 25 && imc < 29.9) {
        clasificacion = "Sobrepeso";
    } else {
        clasificacion = "Obesidad";
    }

    return { imc, clasificacion };
}

// Función para mostrar los resultados
function mostrarResultados(peso, altura, imc, clasificacion) {
    console.log("Peso: " + peso + " kg");
    console.log("Altura: " + altura + " m");
    console.log("IMC: " + imc.toFixed(2));
    console.log("Clasificación: " + clasificacion);
    alert(`Resultados:\nPeso: ${peso} kg\nAltura: ${altura} m\nIMC: ${imc.toFixed(2)}\nClasificación: ${clasificacion}`);
}

// Función principal que ejecuta el simulador
function simuladorIMC() {
    let { peso, altura } = solicitarDatos();
    let { imc, clasificacion } = calcularIMC(peso, altura);
    mostrarResultados(peso, altura, imc, clasificacion);
}

// Llamada al simulador
simuladorIMC();