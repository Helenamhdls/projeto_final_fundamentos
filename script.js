document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'https://api.mercadolibre.com/sites/MLB/search?q=notebooks';
    const listaProdutos = document.getElementById('product-list');
    const mensagemConfirmacao = document.getElementById('confirmation-message');

    async function buscarProdutos() {
        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            exibirProdutos(data.results.slice(0, 12));
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    function exibirProdutos(produtos) {
        listaProdutos.innerHTML = '';
        produtos.forEach(produto => {
            const productCard = document.createElement('div');
            productCard.className = 'col-md-4 mb-4';

            const card = document.createElement('div');
            card.className = 'card product-card';

            const productImage = document.createElement('img');
            productImage.src = produto.thumbnail;
            productImage.alt = produto.title;
            productImage.className = 'card-img-top';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const productTitle = document.createElement('h5');
            productTitle.className = 'card-title';
            productTitle.textContent = produto.title;

            const productPrice = document.createElement('p');
            productPrice.className = 'card-text';
            productPrice.textContent = `R$ ${produto.price.toFixed(2)}`;

            const buyButton = document.createElement('button');
            buyButton.className = 'btn btn-primary';
            buyButton.textContent = 'Comprar';
            buyButton.setAttribute('aria-label', `Adicionar ${produto.title} ao carrinho`);
            buyButton.addEventListener('click', () => {
                adicionarAoCarrinho(produto);
                exibirMensagemDeConfirmacao();
            });

            cardBody.appendChild(productTitle);                             
            cardBody.appendChild(productPrice);
            cardBody.appendChild(buyButton);

            card.appendChild(productImage);
            card.appendChild(cardBody);

            productCard.appendChild(card);

            listaProdutos.appendChild(productCard);
        });
    }

    function adicionarAoCarrinho(produto) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.push(produto);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    function exibirMensagemDeConfirmacao() {
        mensagemConfirmacao.classList.remove('d-none');
        setTimeout(() => {
            mensagemConfirmacao.classList.add('d-none');
        }, 3000);
    }

    buscarProdutos();
});
