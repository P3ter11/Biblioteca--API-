const api = "https://striveschool-api.herokuapp.com/books";

const searchButton = document.getElementById('searchButton');
const inputSearch = document.getElementById('inputSearch');

function getBooks(){
    fetch(api)
    .then((response)=>{return response.json()})
    .then(json => {
        let cont = document.querySelector(".row");

    cont.innerHTML = json.map((book) => {
      return ` <div class='col col-4'> <div class="card mb-4 shadow-sm">
              <img src='${book.img}' />

              <div class="card-body">
                
                <div
                  class="d-flex justify-content-between align-items-center"
                >
                  
                  <small class="text-muted">${book.title}</small>

                  <button class="btn btn-primary" onclick="addList()">Add List</button>
                </div>
              </div>
            </div> </div>`
  }).join("")
})
      
    .catch(error => console.log(error))

}

getBooks();

const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');

searchInput.addEventListener('input', () => {
  let query = searchInput.value.trim(); // Ottieni il valore dell'input e rimuovi eventuali spazi iniziali e finali

  if (query.length > 0) {
    fetch(api+`/search?q=${query}`) // Sostituisci con l'URL dell'API
      .then(response => response.json())
      .then(data => {
        // Filtra i risultati in base alla query dell'utente
        const filteredResults = data.filter(result => result.name.toLowerCase().includes(query.toLowerCase()));

        // Pulisci i risultati precedenti
        resultsContainer.innerHTML = '';

        // Mostra i nuovi risultati filtrati
        filteredResults.forEach(result => {
          const resultElement = document.createElement('div');
          resultElement.textContent = result.name; // Sostituisci 'name' con la chiave appropriata dei risultati dell'API
          resultsContainer.appendChild(resultElement);
        });
      })
      .catch(error => {
        console.error('Si è verificato un errore durante la ricerca:', error);
      });
  } else {
    // Se l'input è vuoto, pulisci i risultati
    resultsContainer.innerHTML = '';
  }
});




  /* let container = document.getElementById('containerCards');
        let jsonData = json;

        jsonData.forEach(element => {
            console.log(element.img);
            let bookCard = document.createElement('div');
            bookCard.classList.add("card", "col-3");

            let imgCard = document.createElement('img');
            imgCard.src = element.img; 
            imgCard.classList.add("card-img-top");

            let cardBody = document.createElement('div');
            cardBody.classList.add("card-body");

            let titleCard = document.createElement('h3');
            titleCard = element.title;
            console.log(titleCard);

            let buttonCarrello = document.createElement('button');
            buttonCarrello.classList.add("btn","btn-primary");
            buttonCarrello.innerText = "Add List";


            cardBody.appendChild(titleCard, buttonCarrello);
            bookCard.appendChild(imgCard, cardBody);
            container.appendChild(bookCard);
        });

    }) */