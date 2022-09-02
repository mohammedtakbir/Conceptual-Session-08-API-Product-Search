loadProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    const data = await res.json()
    return data;
}
setAllMenu = async () => {
    // loadProducts()
    // .then(data => console.log(data))
    const data = await loadProducts()
    const menu = document.getElementById('all-menu');

    const uniqueArray = [];

    for (const product of data) {
        // console.log(product)
        if (uniqueArray.indexOf(product.category) === -1) {
            uniqueArray.push(product.category);
            const li = document.createElement('li');
            li.innerHTML = `
                <a>${product.category}</a>
            `;
            menu.appendChild(li);
        }
    }
}
const searchField =  document.getElementById('search-field')
searchField.addEventListener('keypress', async(e) => {
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');
    if(e.key === 'Enter'){
        const searchValue = searchField.value;
        const allProducts = await loadProducts();
        spinner.classList.add('hidden')

        const productContainer = document.getElementById('product-container');
        const notFound = document.getElementById('not-found');
        productContainer.textContent = '';
        notFound.textContent = '';

        const foundProducts = allProducts.filter(product => product.category.includes(searchValue))

        if(foundProducts.length === 0){
            notFound.innerHTML = `<p class="text-red-500 text-center">Not Found</p>`;
            return;
        }
        // const productContainer = document.getElementById('product-container');
        // productContainer.textContent = '';
        foundProducts.forEach(products => {
            console.log(products)
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="card card-compact bg-base-100 shadow-xl">
                    <figure><img class="w-50 h-60 w-full" src="${products.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${products.category}</h2>
                        <p>${products.title.length > 20 ? products.title.slice(0, 20) + '...' : products.title}</p>
                        <div class="card-actions justify-end">
                        <!-- The button to open modal -->
                        <label onclick="showModal('${products.title}', '${products.description}', '${products.image}')" for="my-modal-3" class="btn btn-primary modal-button text-white">Details</label>
                        </div>
                    </div>
                </div>
            `;
            productContainer.appendChild(div)
        });
    }
})
showModal = (title ,description, image) => {
    console.log(description, image);
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <h3 class="text-lg font-bold">${title}</h3>
    <p class="py-4">${description}</p>
    <img src="${image}">
    `
}
setAllMenu();












// loadProducts()