const section = document.querySelector(".section");
const loader = document.querySelector(".loader");


let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";

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
            <img src="${strDrinkThumb}" alt="${strDrink}" class='images'>
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
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

dataFunction(url);
