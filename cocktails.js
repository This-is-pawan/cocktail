const section = document.querySelector(".section");
const sectionAlign = document.querySelector(".sectionAlign");
const loader = document.querySelector(".loader");
const products = document.querySelector(".products-details");
const form = document.querySelector("form");
const input = document.querySelector("input");

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";

const dataFunction = async (url) => {
  try {
    const resp = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    const res = await resp.json();
    const drinkData = [...res.drinks];

    form.addEventListener("keyup", () => {
      const searchItem = input.value.toLowerCase();
      const filteredDrinks = drinkData.filter((drink) =>
        drink.strDrink.toLowerCase().includes(searchItem)
      );
      renderDrink(filteredDrinks);
    });
 window.upWord = () => {

  console.log('This is click successful');
};

window.downword = () => {
  console.log('Downword button clicked');
};
    const renderDrink = (drinkData) => {
      if (drinkData.length < 1) {
        sectionAlign.innerHTML = `<h2 class='heading'>Sorry, no products matched your search</h2>`;
        return;
      }
      section.innerHTML = drinkData
        .map(({ idDrink, strDrink, strIngredient1, strDrinkThumb }) => `
          <section class="Section">
            <article class="sectionAlign">
              <article class="loading" id="${idDrink}">
                <img src="${strDrinkThumb}" class="images" alt="${strDrink}" data-id="${idDrink}">
                <div class="section-center">
                  <h3 class="title">${strIngredient1}</h3>
                  <p>${strDrink}</p>
                </div>
              </article>
            </article>
          </section>
        `)
        .join("");

 
      document.querySelectorAll(".images").forEach((img) => {
        img.addEventListener("click", (e) => {
          const drinkId = e.target.getAttribute("data-id");
          const selectedDrink = drinkData.find((drink) => drink.idDrink === drinkId);
          products.innerHTML = `
            <div class="details">
              <article class="xmark">
                <i class="fas fa-xmark"></i>
              </article>
               <article class='sider_btn'>
      <button onclick="upWord()"><</button>
      <button onclick="downWord()">></button>
    </article>
              <img src="${selectedDrink.strDrinkThumb}" alt="${selectedDrink.strDrink}">
              <span>${selectedDrink.strDrink}</span>
              <p>ID: ${selectedDrink.idDrink}</p>
              
            </div>
          `;

          document.querySelector(".fa-xmark").addEventListener("click", () => {
            products.innerHTML = "";
          });
        });
      });
    };
  
    renderDrink(drinkData);
    }
  catch (error) {
    console.error("Error fetching data:", error);
  }
};

dataFunction(url);
