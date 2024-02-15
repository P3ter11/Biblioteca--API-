const api = "https://striveschool-api.herokuapp.com/books";

const searchButton = document.getElementById('searchButton');
const inputSearch = document.getElementById('inputSearch');

let booksToCart = [];
let priceCart = 0;
let modalContainer = document.querySelector('.modal-body');
let liveInput = document.getElementById('inputSearch');

function getBooks(){
  fetch(api)
  .then((response)=>{return response.json()})
  .then(json => cyclebooks(json))      
  .catch(error => console.log(error))

}

getBooks();

let activeResults;
let containerBooks = document.getElementById('containerBooks');

function cyclebooks(data, savedResults = true){
  if(savedResults)
    activeResults = data;

  containerBooks.innerHTML = "";
  data.forEach((book) =>{
    createTemplate(book);
  })
}



function createTemplate(book){

  let colBook = document.createElement('div');
  colBook.classList.add('col', 'col-4', 'mb-3');

  let bookBox = document.createElement('div');
  bookBox.classList.add('card', 'text-center');

  let bookImg = document.createElement('img');
  bookImg.classList.add('card-img-top');
  bookImg.src = book.img;

  let bodyCard = document.createElement('div');
  bodyCard.classList.add('card-body');

  let bookTitle = document.createElement('h6');
  bookTitle.innerText = book.title;

  let buttonBook = document.createElement('button');
  buttonBook.classList.add('btn', 'btn-primary', 'm-2');
  buttonBook.innerText = 'Add to Cart';

  let buttonHide = document.createElement('button');
  buttonHide.classList.add('btn', 'btn-danger', 'm-2');
  buttonHide.innerText = "Hide";

  bodyCard.append(bookTitle, buttonBook, buttonHide);
  bookBox.append(bookImg, bodyCard);
  colBook.appendChild(bookBox);
  containerBooks.appendChild(colBook);

  buttonBook.addEventListener("click", ()=> {
     bookBox.classList.toggle('added');
     if(bookBox.classList.contains('added')){
        addToCart(book.title, book.price);
        buttonBook.innerText = "Remove to Cart";
     }
     else{
      removeToCart(book.title, book.price);
      buttonBook.innerText = "Add to Cart";
     }

    });

    buttonHide.addEventListener("click", () =>{
      bookBox.classList.add('d-none');
    })

  }

function addToCart(title, price){
  booksToCart.push(title);
  priceCart += price;
  console.log(booksToCart, priceCart.toFixed(2));
}

function removeToCart(title, price) {
  priceCart -= price;
  booksToCart = booksToCart.filter(string => string !== title);
  console.log(booksToCart, priceCart.toFixed(2));
}

function showCart(){
  for(item of booksToCart){
    let li = document.createElement('li');
    li.innerText = item;
    modalContainer.appendChild(li);
  }

  modalContainer.innerHTML += "<p>Total Price: <b>"+priceCart.toFixed(2)+"</b></p>";
}

function clean(){
  modalContainer.innerHTML = "";
}

function liveSearch(){
    let filteredResults = activeResults.filter((book) => {
      return book.title.toLowerCase().includes(liveInput.value.toLowerCase().trim());
    });
  
    cyclebooks(filteredResults, false);
}

