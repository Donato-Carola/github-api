


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
 
    console.log('response', response.data);
    if(response.data.items.length == 0){
      displaySearchResults([]);
    }else{
       displaySearchResults(response.data.items); 
     
    }
   
   
    loader.style.display = 'none';
   
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
    loader.style.display = 'none';
    const resultElement = document.createElement('div');
    resultElement.classList.add('col-12');
    resultElement.innerHTML = `
    <h1>Nessun risultato </h1>
    
    `;
    row.append(resultElement);
  }else{
      results.forEach(element => {
   
    const resultElement = document.createElement('div');
    resultElement.classList.add( 'col-sm-12', 'col-md-6', 'col-lg-3','mb-3' );
    resultElement.innerHTML = `
    <div class='card container h-100 p-0'>
    
     <img id="img_account" src=" ${ 'owner' in element ?  element.owner.avatar_url : element.avatar_url}" alt="">
     <p>
      ${element.description}
     </p>
    </div>
         `; 
        // Esempio: visualizza il nome completo del repository
    row.append(resultElement);
  });
  
  }

}  
    
    
    
    
