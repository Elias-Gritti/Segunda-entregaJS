// Definimos nuestra clase modelo de producto
class combo {
    constructor(comida, imgSrc, precio) {
        this.comida = comida
        this.imgSrc = imgSrc
        this.precio = precio
    }
}

// Generamos nuestros productos
const combo1 = new combo('Hamburguesa', './img/hamburguesa.jpg', 650)
const combo2 = new combo('Pizza', './img/pizza.jpg' , 850)
const combo3 = new combo('Papas fritas', './img/papas-fritas.jpg', 500)
const combo4 = new combo('Sandwich', './img/sandwich.jpg', 450)
const combo5 = new combo('Empanadas', './img/empanadas.jpg', 700)
const combo6 = new combo('Panchos', './img/pancho.jpg', 200)


// Creamos un array con todos nuestros productos dentro
const productos = [combo1, combo2, combo3, combo4, combo5, combo6]

// Creamos un array vacio que va a ser nuestro carrito de compras
let carrito = []



// Guardamos la referencia de nuestro div donde se renderizaran nuestros productos
const cardContainer = document.querySelector('#cardContainer')

// Por cada producto generamos una nueva card
productos.forEach((producto) => {
    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
            <h3 class="cardTitle"> ${producto.comida} </h3>
            <img src="${producto.imgSrc}" class="cardImg">
            <span class="cardPrice"> $${producto.precio} </span>
            <button data-id="${producto.comida}" class="buttonCTA"> Agregar al Carrito </button>
        `
    cardContainer.append(card)
})
// Creamos una variable para que cada producto seleccionado, quede en el carrito
const carritoConteiner = document.querySelector('#carritoConteiner')

const imprimirCarrito = () => {
    carritoConteiner.innerHTML = ""
    carrito.forEach((producto) => {
        const cartRow = document.createElement('div')
        cartRow.className = 'cartRow'
        cartRow.innerHTML = `
        <div class="cartImg">
        <img src="${producto.imgSrc}">
        </div>
        <div class="cartTitle"><span> combo ${producto.comida}</span></div>
        <div class="cartPrice"><span> $${producto.precio}</span></div>
        `
        carritoConteiner.append(cartRow)
    })
} 

// Cuando el usuario haga click en un boton, a traves del parametro e nos va a llegar cual es el boton en cuestion. 
const agregarProducto = (e) => {
    // Al acceder a target accedemos al nodo (etiqueta button) y con getAttribute accedemos al atributo donde nosotros guardamos el valor de referencia (conviene siempre que sea un id unico)
    const productoElegido = e.target.getAttribute('data-id')
    // Una vez que tenemos el valor de referencia que guardamos en el boton (en este ejemplo la marca del monitor) hacemos una busqueda (find) en el array original de productos (el mismo que usamos para mostrarlos) y este nos va a devolver todo el objeto que coincida con la busqueda (buscar por el mismo dato que enviamos a data-id)
    const producto = productos.find((producto) => producto.comida ==  productoElegido)
    // Una vez tenemos todo el objeto, lo enviamos al carrito y ya tenemos nuestro primer producto seleccionado!
    carrito.push(producto)
    imprimirCarrito()
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

// Una vez que nuestras cards se renderizaron, accedemos a todos nuestros botones a traves de la clase en comun y le agregamos la escucha del evento click
const botonesCompra = document.querySelectorAll('.buttonCTA')
botonesCompra.forEach ((botonCompra) => {
    botonCompra.addEventListener('click', agregarProducto)
})

if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
    imprimirCarrito()
}

//le damos una funcion al boton borrar carrito
const VaciarCarrito = () => {
    if (localStorage.getItem('carrito')) {
        localStorage.removeItem('carrito')
    }
    carrito = []
    imprimirCarrito()
}

const vaciarCarritoBtn = document.querySelector('#VaciarCarrito')
vaciarCarritoBtn.addEventListener('click', VaciarCarrito)

