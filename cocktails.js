// const section = document.querySelector(".section");
// const sectionAlign = document.querySelector(".sectionAlign");
// const loader = document.querySelector(".loader");
// const products = document.querySelector(".products-details");
// const form = document.querySelector("form");
// const input = document.querySelector("input");

// const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";

// const dataFunction = async (url) => {
//   try {
//     const resp = await fetch(url, {
//       headers: { Accept: "application/json" },
//     });
//     const res = await resp.json();
//     const drinkData = [...res.drinks];

//     form.addEventListener("keyup", () => {
//       const searchItem = input.value.toLowerCase();
//       const filteredDrinks = drinkData.filter((drink) =>
//         drink.strDrink.toLowerCase().includes(searchItem)
//       );
//       renderDrink(filteredDrinks);
//     });
//  window.upWord = () => {

//   console.log('This is click successful');
// };

// window.downword = () => {
//   console.log('Downword button clicked');
// };
//     const renderDrink = (drinkData) => {
//       if (drinkData.length < 1) {
//         sectionAlign.innerHTML = `<h2 class='heading'>Sorry, no products matched your search</h2>`;
//         return;
//       }
//       section.innerHTML = drinkData
//         .map(({ idDrink, strDrink, strIngredient1, strDrinkThumb }) => `
//           <section class="Section">
//             <article class="sectionAlign">
//               <article class="loading" id="${idDrink}">
//                 <img src="${strDrinkThumb}" class="images" alt="${strDrink}" data-id="${idDrink}">
//                 <div class="section-center">
//                   <h3 class="title">${strIngredient1}</h3>
//                   <p>${strDrink}</p>
//                 </div>
//               </article>
//             </article>
//           </section>
//         `)
//         .join("");

 
//       document.querySelectorAll(".images").forEach((img) => {
//         img.addEventListener("click", (e) => {
//           const drinkId = e.target.getAttribute("data-id");
//           const selectedDrink = drinkData.find((drink) => drink.idDrink === drinkId);
//           products.innerHTML = `
//             <div class="details">
//               <article class="xmark">
//                 <i class="fas fa-xmark"></i>
//               </article>
//                <article class='sider_btn'>
//       <button onclick="upWord()"><</button>
//       <button onclick="downWord()">></button>
//     </article>
//               <img src="${selectedDrink.strDrinkThumb}" alt="${selectedDrink.strDrink}">
//               <span>${selectedDrink.strDrink}</span>
//               <p>ID: ${selectedDrink.idDrink}</p>
              
//             </div>
//           `;

//           document.querySelector(".fa-xmark").addEventListener("click", () => {
//             products.innerHTML = "";
//           });
//         });
//       });
//     };
  
//     renderDrink(drinkData);
//     }
//   catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// dataFunction(url);
// #$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// some change and add some functionality in it 
const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";

const section = document.querySelector(".section");
const sectionAlign = document.querySelector(".sectionAlign");
const loader = document.querySelector(".loader");
const products = document.querySelector(".products-details");
const form = document.querySelector("form");
const input = document.querySelector("input");

const header = {
  headers: { Accept: "application/json" },
};

const dataFunction = async (url) => {
  try {
    const response = await fetch(url, header);
    const responses = await response.json();
    const drinkData = [...responses.drinks];

    form.addEventListener("keyup", () => {
      const searchItem = input.value.toLowerCase();
      const filteredDrinks = drinkData.filter((drink) =>
        drink.strDrink.toLowerCase().includes(searchItem)
      );
      renderDrink(filteredDrinks);
    });

    const renderDrink = (drinkData) => {
      if (drinkData.length < 1) {
        sectionAlign.innerHTML = `<h2 class='heading'>Sorry, no products matched your search</h2>`;
        return;
      }

      const generateHTML = (drinkData) => {
        return drinkData.map(({ idDrink, strDrink, strIngredient1, strDrinkThumb }) => {
            return `
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
            `;
          })
          .join("");
      };

      section.innerHTML = generateHTML(drinkData);

      document.querySelectorAll(".images").forEach((img) => {
        img.addEventListener("click", (e) => {
          const drinkId = e.target.getAttribute("data-id");
          const selectedDrink = drinkData.find((drink) => drink.idDrink === drinkId);
// console.log(selectedDrink);

          displayDrinkDetails(selectedDrink, drinkData);
        });
      });
    };

    const displayDrinkDetails = (selectedDrink, drinkData) => {
      products.innerHTML = `
        <div class="details">
          <article class="xmark">
            <i class="fas fa-xmark"></i>
          </article>
          <button class='pageBtn first'><</button>
          <button class='pageBtn second'>></button>
          <img src="${selectedDrink.strDrinkThumb}" alt="${selectedDrink.strDrink}">
          <span>${selectedDrink.strDrink}</span>
          <p>ID: ${selectedDrink.idDrink}</p>
        </div>
      `;

      document.querySelector(".fa-xmark").addEventListener("click", () => {
        products.innerHTML = "";
      });

      const changeDrink = (direction) => {

        let currentIndex = drinkData.findIndex((drink) => {
          
          // console.log( selectedDrink.idDrink);
          return drink.idDrink === selectedDrink.idDrink
        });
        let randomNum=Math.floor(Math.random()*drinkData.length)%2
        console.log(randomNum);
        
        //  console.log(currentIndex);
        if (direction === "next") {
          
          currentIndex = (currentIndex + 1) % drinkData.length;
          console.log(currentIndex  );
          
        } else {
          currentIndex = (currentIndex - 1 + drinkData.length) % drinkData.length;
        }
        displayDrinkDetails(drinkData[currentIndex], drinkData);
      };

      document.querySelector(".first").addEventListener("click", () => changeDrink("prev"));
      document.querySelector(".second").addEventListener("click", () => changeDrink("next"));
    };

    renderDrink(drinkData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

dataFunction(url);

