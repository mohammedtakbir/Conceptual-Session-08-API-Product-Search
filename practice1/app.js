const loadProducts = async () => {
    const url = 'https://fakestoreapi.com/products';
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
const setAllMenu = async () => {
    const data = await loadProducts();
    const allMenu = document.getElementById('all-menu');
    const uniqueArray = [];
    data.forEach(menu => {
        // console.log(menu)
        if (uniqueArray.indexOf(menu.category) === -1) {
            uniqueArray.push(menu.category);
            const li = document.createElement('li');
            li.innerHTML = `
            <a>${menu.category}</a>`;
            allMenu.appendChild(li);
        }
    });
}
const searchField = document.getElementById('search-field');
searchField.addEventListener('keypress', async(e) => {
    //* spinner progress
    const progress = document.getElementById('progress');
    progress.classList.remove('hidden');

    if(e.key === 'Enter'){
        const searchValue = searchField.value;
        const allProducts = await loadProducts();
        //* sotp progress
        progress.classList.add('hidden')
        const foundProducts = allProducts.filter(product => product.category.includes(searchValue));

        const notFound = document.getElementById('not-found');
        notFound.textContent = '';
        const productContainer = document.getElementById('product-container');
        productContainer.textContent = '';

        //* not found message
        if(foundProducts.length === 0){
            notFound.innerHTML = `
                <p class="text-red-500 text-center">Not Found...</p>
            `;
            return;
        }
        foundProducts.forEach(product => {
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="card card-compact bg-base-100 shadow-xl px-5">
                    <figure><img src="${product.image}" class="h-72 w-60" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${product.category}</h2>
                        <p>${product.title.length > 25 ? product.title.slice(0, 25) + '...' : product.title}</p>
                        <div class="card-actions justify-end">
                        <label onclick="productDetail('${product.description}', '${product.image}')" for="my-modal-3" class="btn btn-primary modal-button">details</label>
                        </div>
                    </div>
                </div>
            `;
            productContainer.appendChild(div);
        })
    }
});

const displayProductDetail = document.getElementById('product-detail');
const productDetail = (description, image) => {
    displayProductDetail.innerHTML = `
        <h3 class="text-lg font-bold">${description}</h3>
        <img src="${image}">
    `;
}



















setAllMenu();