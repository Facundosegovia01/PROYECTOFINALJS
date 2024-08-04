
const contenedorTotal = document.querySelector("#total");

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    renderCarrito();
}

function eliminarProducto(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

function renderCarrito() {
    let contenidoHTML;
    let total = 0; 
    if (totalProductos() > 0) {
        contenidoHTML = `
        <div class="flex justify-center items-center my-10">
            <button class="flex items-center gap-2 rounded bg-red-600" onclick="vaciarCarrito();">Vaciar carrito
                <svg data-testid="geist-icon" height="20" stroke-linejoin="round" viewBox="0 0 16 16" width="20" style="color: currentcolor;">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.75 2.75C6.75 2.05964 7.30964 1.5 8 1.5C8.69036 1.5 9.25 2.05964 9.25 2.75V3H6.75V2.75ZM5.25 3V2.75C5.25 1.23122 6.48122 0 8 0C9.51878 0 10.75 1.23122 10.75 2.75V3H12.9201H14.25H15V4.5H14.25H13.8846L13.1776 13.6917C13.0774 14.9942 11.9913 16 10.6849 16H5.31508C4.00874 16 2.92263 14.9942 2.82244 13.6917L2.11538 4.5H1.75H1V3H1.75H3.07988H5.25ZM4.31802 13.5767L3.61982 4.5H12.3802L11.682 13.5767C11.6419 14.0977 11.2075 14.5 10.6849 14.5H5.31508C4.79254 14.5 4.3581 14.0977 4.31802 13.5767Z" fill="currentColor"></path>
                </svg>
            </button>
        </div>`;
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        carrito.forEach((producto, index) => {
            total += producto.price; 
            contenidoHTML += `
                <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                    <div class="hidden lg:grid grid-cols-2 py-6">
                        <div class="font-normal text-xl leading-8 text-gray-200">Producto</div>
                        <p class="font-normal text-xl leading-8 text-gray-200 flex items-center justify-between">
                            <span class="w-full max-w-[200px] text-center">Precio</span>
                        </p>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                        <div class="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                            <div class="img-box"><img src="${producto.image}" alt="" class="xl:w-[140px]"></div>
                            <div class="pro-data w-full max-w-sm">
                                <h5 class="font-semibold text-2xl leading-8 text-white max-[550px]:text-center">${producto.title}</h5>
                                <h6 class="font-medium text-lg leading-8 text-purple-500 max-[550px]:text-center">$${producto.price}</h6>
                            </div>
                        </div>
                        <div class="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                            <h6 class="text-purple-500 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">$${producto.price}</h6>
                            <button class="border-2 rounded-lg bg-red-600 border-red-600 font-bold text-1xl w-full max-w-[176px] text-center" onclick="eliminarProducto(${index});">Eliminar [-]</button>
                        </div>
                    </div>
                </div>
             `;
        });

        contenedorTotal.innerHTML = `<div class="flex justify-end items-end gap-3">
            <div class="flex gap-2 bg-purple-300 border rounded-xl p-3">
            
              Total a pagar: $${total}
            </div>
            <button class="border-2 border-purple-200 bg-purple-300 rounded-xl text-xl p-3"><a href="#" >Finalizar Compra</a></button>
          </div>`;

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No tienes productos en el carrito",
            confirmButtonColor: "#3085d6",
            confirmButtonText : '<a href="../index.html">Ir a Productos</a>'
          })
          contenedorTotal.innerHTML = ``
    }


    document.getElementById("contenido").innerHTML = contenidoHTML;
};




renderCarrito();
