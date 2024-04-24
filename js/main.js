const searchInput = document.querySelector("input");
const selectInput = document.querySelector("select");
const searchButton = document.querySelector("button");

const loader = document.getElementById("loader");

searchButton.addEventListener("click", function () {
  loader.style.display = "block";

  //aggiungere propria APIKEY git

  
  
  const searchTerm = searchInput.value;
  const searchType = selectInput.value;
  if (searchTerm.trim() === "") {
    displaySearchResults([]);
  } else {
    axios
      .get(`https://api.github.com/search/${searchType}?q=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then((response) => {
        console.log("response", response.data);
        if (response.data.items.length == 0) {
          displaySearchResults([]);
        } else {
          displaySearchResults(response.data.items);
        }

        loader.style.display = "none";
      })
      .catch((error) => {
        // Gestione degli errori
        loader.style.display = "none";
        console.error("Error:", error);
      });
  }
});

// Funzione di esempio per mostrare i risultati della ricerca
function displaySearchResults(results) {
  const row = document.querySelector(".row");
  row.innerHTML = ""; // Pulizia dei risultati precedenti

  if (results.length == 0) {
    loader.style.display = "none";
    const resultElement = document.createElement("div");
    resultElement.classList.add("col-12");
    resultElement.innerHTML = `
    <h1>Nessun risultato </h1>
    
    `;
    row.append(resultElement);
  } else {
    results.forEach((element) => {
      const resultElement = document.createElement("div");
      resultElement.classList.add("col-sm-12", "col-md-6", "col-lg-3", "mb-3");
      resultElement.innerHTML = `
    <div class='card container  h-100 p-0'>

    <div class='d-flex justify-content-center'>  
       <img id="img_account" src=" ${ "owner" in element ? element.owner.avatar_url : element.avatar_url}" alt="">
    </div>
  
     <div class='card-body'>   
    <h5 class='card-title'>
    ${"owner" in element ? element.full_name.length > 20 ? element.name : element.full_name : element.login}
    </h5>
      <p class="card-text ${'owner' in element ? '' : 'd-none'}">${element.description != null ? element.description.slice(0,50) + '...' : '...'}</p>
      <p class="card-text ${'owner' in element ? '' : 'd-none'}">★${element.stargazers_count}</p>
      <p class="card-text ${'owner' in element ? '' : 'd-none'}">🛈${element.open_issues}</p>
      <p class="card-text ${'owner' in element ? 'd-none' : ''}">Profilo:${element.type}</p>
     </div>
     <a href="${element.html_url}" class="card-footer text-center"> ${'owner' in element ? 'Vai alla Repo' : 'Vai al Profilo'}
      <img class=" my_link" src='https://cdn.icon-icons.com/icons2/2348/PNG/512/external_link_icon_143096.png'>
     </a>

    </div>
    
         `;
      // Esempio: visualizza il nome completo del repository
      row.append(resultElement);
    });
  }
}
