


const searchInput = document.querySelector('input');
const selectInput = document.querySelector('select');
const searchButton = document.querySelector('button');

const loader = document.getElementById('loader'); 

searchButton.addEventListener('click', function () {
  loader.style.display = 'block';


  //aggiungere propria APIKEY git



  const searchTerm = searchInput.value;
  const searchType = selectInput.value;
  if(searchTerm.trim() === ''){
    displaySearchResults([]);
  }else{
   axios.get(`https://api.github.com/search/${searchType}?q=${searchTerm}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  .then(response => {
     loader.style.display = 'none';
    // Gestione della risposta
    console.log('response', response.data);
    // Esempio di cosa fare con la risposta
    displaySearchResults(response.data.items); // Supponendo che l'array degli elementi restituiti sia accessibile tramite response.data.items
   
  })
  .catch(error => {
    // Gestione degli errori
    loader.style.display = 'none';
    console.error('Error:', error);
  });
  }

});

// Funzione di esempio per mostrare i risultati della ricerca
function displaySearchResults(results) {
  const row = document.querySelector('.row');
  row.innerHTML = ''; // Pulizia dei risultati precedenti

  if(results.length == 0){
    const resultElement = document.createElement('div');
    resultElement.classList.add('col-12');
    resultElement.innerHTML = `
    <h1>Nessun risultato </h1>
    
    `;
    row.append(resultElement);
  }else{
      results.forEach(element => {
   
    const resultElement = document.createElement('div');
    resultElement.classList.add( 'col-sm-12', 'col-md-6', 'col-lg-3' );
    resultElement.innerHTML = `
    <div class='card'>
     <h1>
     ciao</h1> 
     <img src=" ${ 'owner' in element ?  element.owner.avatar_url : element.avatar_url}" alt="">
    
    </div>
         `; 
        // Esempio: visualizza il nome completo del repository
    row.append(resultElement);
  });
  }

}  
    
    
    
    
