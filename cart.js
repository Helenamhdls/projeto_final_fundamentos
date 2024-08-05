document.addEventListener('DOMContentLoaded', () => {
    const itensCarrinho = document.getElementById('cart-items');
    const totalCarrinho = document.getElementById('cart-total');
    const botaoLimparCarrinho = document.getElementById('clear-cart');

    function exibirItensCarrinho() {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        itensCarrinho.innerHTML = '';
        let total = 0;

        carrinho.forEach(produto => {
            const item = document.createElement('div');
            item.className = 'col-md-4 mb-4';

            const card = document.createElement('div');
            card.className = 'card';

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

            cardBody.appendChild(productTitle);
            cardBody.appendChild(productPrice);

            card.appendChild(productImage);
            card.appendChild(cardBody);

            item.appendChild(card);

            itensCarrinho.appendChild(item);

            total += produto.price;
        });

        totalCarrinho.textContent = total.toFixed(2);
    }

    function limparCarrinho() {
        localStorage.removeItem('carrinho');
        exibirItensCarrinho();
        alert('Compra encerrada com sucesso!');
    }

    botaoLimparCarrinho.addEventListener('click', limparCarrinho);

    exibirItensCarrinho();
});
