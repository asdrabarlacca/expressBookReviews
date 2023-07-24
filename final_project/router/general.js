const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {

  //1 prendo username e password dal body
  const username = req.body.username;
  const password = req.body.password;

  //2 verifica se ci sono sia username che password
  if (username && password) {

      //2.1 verfica che lo username non sia già in uso
      if (!isValid (username)) {

          //2.1.1 inserisci i dati nell'elenco utenti
          users.push({'username':username,'password':password});

          //2.1.2 segnala che la registrazione è amdata a buon fine
          return res.status(200).json({message: 'User  ' + username +' registered successfully. You can logIn'});

      //2.2 restituisci errore   
      } else {

          return res.status(404).json({message: 'this user already exist'});
      }

  //3 altrimenti dai errore
  } else {

      return res.status(404).json({message: 'unable to register user. Please write both username and password'});
  
  }

  //return res.status(300).json({message: "Yet to be implemented"});
});


/* Get the book list available in the shop
public_users.get('/',function (req, res) {
  
  const getBooks = new Promise((resolve, reject) => {
    
   res.send(JSON.stringify(books,null,4));

  });
  
  getBooks.then(() => console.log("promise for task 10 resolved"));

  //return res.status(300).json({message: "Yet to be implemented"});
});*/

// Get the book list available in the shop
function getAllBooks () {

  return new Promise ((resolve, reject) => {

    resolve (books);

  })


};

public_users.get('/',function (req, res) {

  getAllBooks().then(

    (result) => res.send(JSON.stringify(result, null, 4)),
    (error) => res.send("ERROR")

  )

});



// Get book details based on ISBN
function getBookByIsbn (isbn) {

  let book = books[isbn];

  return new Promise((resolve, reject) => {
    
      if (book) {

        resolve (book);

      } else {

        reject ('Unable to find book with this' + isbn);

      }

  })

}; 

public_users.get('/isbn/:isbn',function (req, res) {
    
  const isbn = req.params.isbn;
    
  getBookByIsbn(isbn).then (

    (bk) =>  res.send(JSON.stringify(bk, null, 4)),
    (error) => res.send(error)

  )

 });
  
/* Get book details based on author in maniera asincrona
public_users.get('/books/author/:author',function (req, res) {

  //funzione asicrona
  const get_books_author = new Promise((resolve, reject) => {

  //preparo array vuoto e individuo gli sibn
  let booksbyauthor = [];
  let isbns = Object.keys(books);

  //per ogni isbn
  isbns.forEach((isbn) => {

      //se l'autore del lib a quel sibn è uguale a quello della richiesta
      if(books[isbn]["author"] === req.params.author) {
          
          //metti i dati del lib nel array
          booksbyauthor.push({
              "isbn":isbn,
              "title":books[isbn]["title"],
              "reviews":books[isbn]["reviews"]
          });

      }

  });

  //quindi mostra array
  resolve(res.send(JSON.stringify({booksbyauthor}, null, 4)));

  //se non funziona dai errore
  reject(res.send("The mentioned author does not exist "))
      
  });

  //restituita la promise mostra messaggio nella console
  get_books_author.then(function(){

      console.log("Promise for task 12 is resolved");

  }).catch(function () { 
      
      console.log('The mentioned author does not exist');

  });

});*/

//Get book details based on author with callbacks and promises
function getBooksByAuthor (author){

  let booksByAuthor = [];

  return new Promise((resolve,reject) => {

      for (var isbn in books) {

          let book = books[isbn];
          if (book.author === author){

              booksByAuthor.push(book);

          }

      }

      resolve(booksByAuthor);  

  })

};

public_users.get('/author/:author',function (req, res) {
    
  const author = req.params.author;
  getBooksByAuthor (author).then(

      result =>res.send(JSON.stringify(result, null, 4))

  );
  
});

/* Get all books based on title
public_users.get('/title/:title',function (req, res) {
  
  //1 crea array vuoto
      let booksByTitle = [];

      //2 crea var che trova gli isbn dei libri
      let isbns = Object.keys(books);

      //3 per ogni isnb
      isbns.forEach((isbn) => {

          //3.1 cerca se titolo di quel isbn corrisponde a quello della richiesta
          if (books[isbn]['title'] === req.params.title) {

          //3.1.2 aggiungilo all'array
          booksByTitle.push ({
              'isbn': isbn,
              'author': books[isbn]['author'],
              'reviews': books[isbn]['reviews']        
          })

          }

      });

      //4 restituisci array
      res.send(JSON.stringify(booksByTitle, null, 4));

//return res.status(300).json({message: "Yet to be implemented"});
});*/

//get all books based on Title
function getBooksByTitle(title){

  let booksByTitle = [];

  return new Promise((resolve,reject)=>{

      for (var isbn in books) {

          let book = books[isbn];
          if (book.title === title){
          booksByTitle.push(book);
      
      }

    }

    resolve(booksByTitle);  

  })

};

public_users.get('/title/:title',function (req, res) {

  const title = req.params.title;
  getBooksByTitle(title).then(

      result =>res.send(JSON.stringify(result, null, 4))

  );

});

//  Get book review in base all isbn
public_users.get('/review/:isbn',function (req, res) {

const isbn = req.params.isbn;
res.send(books[isbn]['reviews'], null, 4);

//return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
