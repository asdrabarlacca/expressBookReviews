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


// Get the book list available in the shop
public_users.get('/',function (req, res) {
  
  //const getBooks = new Promise((resolve, reject) => {
    
   res.send(JSON.stringify(books,null,4));

  //})
  
  //getBooks.then(() => console.log("promise for task 10 resolved"));

  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

  //const getBooksIsbn = new Promise(() => {
    
    const isbn = req.params.isbn;
    res.send(books[isbn]);

 // })
  
  //getBooksIsbn.then(() => console.log ("promise for tack 11 resolved"));

  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    
    //1 crea array vuoto dove metterai dettagli libro/i
    let booksByAuthor = [];

    //2 individua libri per isbn
    let isbns = Object.keys(books);

    //3 per ogni isbn
    isbns.forEach ((isbn) => {

      //3.1 cerca se l'autore di quel isbn corrisponde a quello della richiesta
      if (books[isbn]['author'] === req.params.author) {

        //3.1.2 se si mettilo nell array
        booksByAuthor.push ({

          'isbn'    : isbn,
          'title'   : books[isbn]['title'],
          'reviews' : books[isbn]['reviews']

        })
        
      }
    
    })
    
    //4 restituisci l'array
    res.send(JSON.stringify(booksByAuthor, null, 4));

  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
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
});

//  Get book review in base all isbn
public_users.get('/review/:isbn',function (req, res) {

const isbn = req.params.isbn;
res.send(books[isbn]['reviews'], null, 4);

//return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
