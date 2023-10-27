// Defino algunas constantes para ser utilizadas luego
const categoriasDeseadas = ["men's clothing", "women's clothing"];
const MENSAJE_BIENVENIDA = "Hola otra vez! como estas? Muchas gracias por visitar nuestra tienda";
const MENSAJE_GRACIAS = "¡Muchas gracias por visitarnos! Nos vemos pronto!";

// Tomo la lista de products y las categorias elegidas para devolver una nueva lista con los productos que cumplan con dicha categoria
function filtrarProductosPorCategoria(products, categories) {
    return products.filter(product => categories.includes(product.category));
}
// Luego ordeno la lista de manera A-Z con el metodo sort. Uso la funcion localecompare, comparando el item a con el b. 
function ordenarProductosPorTitulo(products) {
    return products.sort((a, b) => a.title.localeCompare(b.title));
}
// A continuacion tomo el array de productos ordenado y retorno la lista de productos con un index+1 para que mostrar una lista que empiece desde 1 y no 0.
function mostrarProductos(productosOrdenados) {
    return productosOrdenados.map((producto, index) => `${index + 1})- ${producto.title}`).join('\n');
}

// Defino funcion para calcular que la entrega no se haga un sabado o un domingo, sino dias habiles de la semana
function calcularFechaEntrega(diasHabiles) {
    let fechaEntrega = new Date();
    while (diasHabiles > 0) {
        fechaEntrega.setDate(fechaEntrega.getDate() + 1);
        // Si el día de la semana es diferente de 0 (domingo) y 6 (sábado), se reduce el contador de días hábiles
        if (fechaEntrega.getDay() !== 0 && fechaEntrega.getDay() !== 6) {
            diasHabiles--;
        }
    }
    return fechaEntrega;
}

// Se le pide al usuario elegir un producto de la lista, si el nro no es valido le pide que iontente nuevamente hasta que ingrese uno valido o cancele.

function obtenerProductoElegido(mensajeProductos, productosOrdenados) {
    let productoEncontrado = false;
    let productoElegido = prompt(`Por ahora nos quedaron estos productos, por favor elija el numero para poder continuar\n${mensajeProductos}`);
    let productoSeleccionado;

    while (!productoEncontrado) {
        const numeroProductoElegido = parseInt(productoElegido);
        if (numeroProductoElegido > 0 && numeroProductoElegido <= productosOrdenados.length) {
            productoSeleccionado = productosOrdenados[numeroProductoElegido - 1];
            productoEncontrado = true;
            // En caso de cancelar la compra, pregunto al usuario si esta seguro.
        } else if (productoElegido === null) {
            const respuestaUsuario = confirm("¿Estas seguro que quieres salir?");
            if (respuestaUsuario) {
                alert(MENSAJE_GRACIAS);
                break;
            } else {
                productoElegido = prompt(`Estos son los productos disponibles:\n${mensajeProductos}\n¿Qué producto desea comprar?`);
            }
        } else {
            const respuestaUsuario = confirm("El número de producto seleccionado no es válido. ¿Desea aceptar para intentarlo otra vez?");
            if (respuestaUsuario) {
                productoElegido = prompt(`Estos son los productos disponibles:\n${mensajeProductos}\n¿Qué producto desea comprar?`);
                if (productoElegido === null) {
                    alert(MENSAJE_GRACIAS);
                    break;
                }
            } else {
                alert(MENSAJE_GRACIAS);
                break;
            }
        }
    }

    return productoSeleccionado;
}
// Creo la funcion para mostrarle al usuario los detalles del producto elegido y pregunto si desea realizar la compra. En caso de cancelar le muestro el alert. Si el usuario acepta se muestra el mensaje proporcionandole una fecha estimada de entrega.
function confirmarCompra(productoSeleccionado) {
    const confirmacionCompra = confirm(`Nombre: ${productoSeleccionado.title}\nDescripción: ${productoSeleccionado.description}\nPrecio: $${productoSeleccionado.price}\n¿Desea completar la compra?`);
    if (confirmacionCompra) {
        const fechaEntrega = calcularFechaEntrega(5);
        alert(`¡Esoo! ¡Ya es tuyo! La fecha estimada de entrega es ${fechaEntrega.toLocaleDateString()}.`);
    } else {
        alert(MENSAJE_GRACIAS);
    }
}

// Uso del código 
const productosFiltrados = filtrarProductosPorCategoria(products, categoriasDeseadas);
alert(MENSAJE_BIENVENIDA);
alert(`A continuacion encontraras un poco de :\n- Ropa de hombre\n- Ropa de mujer\n \n Dale aceptar para que podamos mostrarte`);
const productosOrdenados = ordenarProductosPorTitulo(productosFiltrados);
const mensajeProductos = mostrarProductos(productosOrdenados);
const productoSeleccionado = obtenerProductoElegido(mensajeProductos, productosOrdenados);
// Compruebo si productoseleccionado es un objeto valido, Si es asi llama a la funcion confirmarcompra
if (productoSeleccionado) {
    confirmarCompra(productoSeleccionado);
}