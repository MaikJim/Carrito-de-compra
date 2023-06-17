const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
let carrito = {};

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});
items.addEventListener('click', (e) => {
  addCarrito(e);
});
const fetchData = async () => {
  try {
    const res = await fetch('api.json');
    const data = await res.json();
    pintarCard(data);
  } catch (error) {
    console.log(error);
  }
};

const pintarCard = (data) => {
  data.forEach((producto) => {
    templateCard.querySelector('h5').textContent = producto.title;
    templateCard.querySelector('p').textContent = `$${producto.precio}.00`;
    templateCard
      .querySelector('img')
      .setAttribute('src', producto.thumbnailUrl);
    templateCard.querySelector('.btn-dark').dataset.id = producto.id;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
};

const addCarrito = (e) => {
  if (e.target.classList.contains('btn-dark')) {
   setCarrito(e.target.parentElement);
  }
  e.stopPropagation();
};

const setCarrito = (obj) => {
  const producto = {
    id: obj.querySelector('.btn-dark').dataset.id
  }
  console.log(producto)
};
