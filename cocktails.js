const section = document.querySelector(".section");
const loader = document.querySelector(".loader");
const products = document.querySelector(".products-details");
const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";

let dataFunction = async (url) => {
  try {
    let resp = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    let res = await resp.json();
    let drinkData = [...res.drinks];

    let result = drinkData
      .map((item) => {
        const { idDrink, strDrink, strIngredient1, strDrinkThumb } = item;

        return `
          <section class="Section">
            <article class="sectionAlign">
              <article class="loading" id='${idDrink}'>
                <img src="${strDrinkThumb}" class="images" alt="${strDrink}" data-id="${idDrink}">
                <div class="section-center">
                  <h3 class="title">${strIngredient1}</h3>
                  <p>${strDrink}</p>
                </div>
              </article>
            </article>
          </section>
        `;
      })
      .join("");

    section.innerHTML = result;

    const images = document.querySelectorAll(".images");
    const productsDetails = document.querySelector(".products-details");

    images.forEach((img) => {
      img.addEventListener("click", (e) => {
        const drinkId = e.target.getAttribute("data-id");

        let newImg = drinkData
          .filter((drink) => drink.idDrink === drinkId)
          .map((drink) => {
            const { strDrinkThumb, strDrink, idDrink } = drink;
            return `
            
              <div class="details">
              <article class='xmark'>
            <i class="fas fa-xmark"></i>
            </article>
                <img src="${strDrinkThumb}" alt="${strDrink}">
                <span>${strDrink}</span>
                <p>ID: ${idDrink}</p>
              </div>
            `;
          })
          .join("");

        productsDetails.innerHTML = newImg;
        const xmark = document.querySelectorAll(".fa-xmark");
        const details = document.querySelectorAll(".details");
        xmark.forEach((ev) => {
          ev.addEventListener("click", (e) => {
            if (e.target.classList.contains('fa-xmark')) {
             products.innerHTML=''
            }
          });
        });
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

dataFunction(url);
