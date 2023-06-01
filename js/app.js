document.addEventListener('DOMContentLoaded', function () {

    /* Creando el objeto principal para validar y sincronizar datos. */
    const inputs = {
        email: "",
        asunto: "",
        mensaje: ""
    }

    /* Seleccionar los elementos <input> de la interfaz. */
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector("#formulario button[type='submit']");
    const btnReset = document.querySelector("#formulario button[type='reset']");
    const spinner = document.querySelector('#spinner');


    /* Asignar eventos... 
    callback => cuando un evento ocurre y ocurre una función */
    inputEmail.addEventListener('input', validar);
    /* event blur: evento que ocurre cuando se abandona un campo */
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);

    /* Añadiendo un Spinner. */
    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        /* Mostrando el Spinner cuando se envia el email y reiniciar el formulario. */
        setTimeout(() => {
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');

            /* Mostrando una alerta de éxito. */
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = "Email enviado exitosamente"

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

            resetFormulario();
        }, 3000);
    }

    /* Resetear el Formulario. */
    btnReset.addEventListener('click', function (e) {
        e.preventDefault(); /* Previene la acción por defecto... */
        resetFormulario();
    });

    /* Creando una Función para Validar. */
    function validar(e) {

        /* Detectando cuando un campo esta vacío.
        -> trim(); string method que elimina los espacios en blanco de una cadena de texto */
        if (e.target.value.trim() === "") {
            /* Validando cada campo. */
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            inputs[e.target.name] = ""; /* Cuando la validación falla, borra el value del objeto */
            comprobarInputs();
            return; /* detiene la ejecución de la siguiente línea de código */
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta("El campo email no es valido", e.target.parentElement);
            inputs[e.target.name] = ""; /* Cuando la validación falla, borra el value del objeto */
            comprobarInputs();
            return; /* detiene la ejecución de la siguiente línea de código */
        }

        quitarAlerta(e.target.parentElement);

        /* Asignar los valores... */
        inputs[e.target.name] = e.target.value.trim().toLowerCase();

        /* Comprobar el objeto inputs... */
        comprobarInputs();
    }

    /* Creando una alerta de error en la validación. */
    function mostrarAlerta(mensaje, referencia) {

        /* Prevenir que se generen múltiples alertas.
        Comprueba si ya existe una alerta... */
        quitarAlerta(referencia)

        /* Crear etiqueta HTML... */
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        /* Añadiendo la alerta al HTML. & Mostrando la alerta junto a su campo. */
        referencia.appendChild(error);

        /* Reemplazar todo el contenido del contenedor <form>...
        formulario.innerHTML = error; // [object HTMLParagraphElement]
        formulario.innerHTML = error.innerHTML; */
    }

    /* Ocultar alertas si pasa la validación. */
    function quitarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    /* Validar el email con una expresión regular */
    function validarEmail(email) {
        /* Expresión Regular: código que busca un patron en una cadena de texto 
        o en una serie de números */
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const validar = regex.test(email);
        /* .test() es un método especial para las expresiones regulares.
        Este método retorna true o false segun cumpla el patron que corresponda. */
        return validar;
    }

    function comprobarInputs() {

        if (Object.values(inputs).includes("")) {
            /* 
            .value(objeto) => devuelve un array de valores de las propiedades enumerables de un objeto.
            .includes() => Determina si un array incluye un determinado elemento, devolviendo true o false según corresponda. */
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;
    }

    function resetFormulario() {
        formulario.reset(); /* Reinicia el formulario... */

        /* Reiniciar el objeto inputs... */
        inputs.email = "";
        inputs.asunto = "";
        inputs.mensaje = "";

        comprobarInputs();
    }
});