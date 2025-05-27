const list = document.querySelector("ul");
const buttonShowAll = document.querySelector(".show-all");
const carousel = document.getElementById("carousel");
const dotsContainer = document.getElementById("dots");
const buttonMapAll = document.querySelector(".map-all");
const buttonSumAll = document.querySelector(".sum-all");
const buttonFilterAll = document.querySelector(".filter-all")

function showAll(productArray) {
  let myLi = "";
  
  productArray.forEach((product) => {
    myLi += `
      <li>
        <img src="${product.src}">
        <p>${product.name}</p>
        <p class="item-price">R$ ${product.price.toFixed(2)}</p>
      </li>
    `;
  });

  list.innerHTML = myLi;
  gerarDots();
}

buttonShowAll.addEventListener("click", () => showAll(menuOptions));

function gerarDots() {
  const items = carousel.querySelectorAll("li");
  const itemWidth = items[0]?.offsetWidth + 20 || 0;
  const totalWidth = itemWidth * items.length;
  const visibleWidth = carousel.offsetWidth;

  const pageCount = Math.ceil(totalWidth / visibleWidth);
  dotsContainer.innerHTML = "";

  for (let i = 0; i < pageCount; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      const allDots = document.querySelectorAll(".dot");
      allDots.forEach(d => d.classList.remove("active"));

      dot.classList.add("active");

      const scrollX = i * visibleWidth;
      carousel.scrollTo({ left: scrollX, behavior: "smooth" });
    });

    dotsContainer.appendChild(dot);
  }

  carousel.addEventListener("scroll", () => {
    const scrollLeft = carousel.scrollLeft;
    const activeIndex = Math.round(scrollLeft / visibleWidth);

    const allDots = document.querySelectorAll(".dot");
    allDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === activeIndex);
    });
  });
}

function mapAllIntems() {
  const newPrices = menuOptions.map((product) => ({
    ...product,
    price: +(product.price * 0.9).toFixed(2)
  }));

  showAll(newPrices);
}

function sumAllIntems() {
  const totalOriginal = menuOptions.reduce((acc, crr) => acc + crr.price, 0);
  const totalDiscounted = menuOptions.reduce((acc, crr) => acc + (crr.price * 0.9), 0);

  list.innerHTML = `
    <li>
      <p>O valor total dos itens é R$ ${totalOriginal.toFixed(2)}</p>
      <p><strong>Valor total com desconto: R$ ${totalDiscounted.toFixed(2)}</strong></p>
    </li>
  `;
}

function filterAllIntems() {

const filterJustVegan = menuOptions.filter((product) => product.vegan)

showAll(filterJustVegan)

}

buttonMapAll.addEventListener("click", mapAllIntems);
buttonSumAll.addEventListener("click", sumAllIntems);
buttonFilterAll.addEventListener("click", filterAllIntems);
