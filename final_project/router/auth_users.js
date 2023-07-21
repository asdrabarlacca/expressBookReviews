const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

//funzione per verificare se nome utente già esiste
const isValid = (username)=>{

//1 filtra tutti gli utenti per username e mettili in un array
    let usersWithThisName = users.filter((user) =>{

        return user.username === username

    });

    //2 se l'array ha lunghezza
    if (usersWithThisName.length > 0) {

        //2.1 vero restituisci vero
        return true;

    //3 altrimenti
    } else {

        //3.1 restituisci falso
        return false

    }
}

const authenticatedUser = (username,password)=>{ 
    //1 crea array e filtraci gli elemnti dell array users
    let validUsers = users.filter((user) => {

        //1.1 tutti gli utenti cui sia username che password corrispondono a quelli dati
        return (user.username === username && user.password === password)

    });

    //2 se l'array ha lunghezza 
    if (validUsers.length > 0) {

        //2.1 vero
        return true;

    //3 altrimenti
    } else {

        //3.1 falso
        return false;

    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  
    //1 prendo username e password dal body
    const username = req.body.username;
    const password = req.body.password;

    //2 se non ci sono username o password
    if (!username || !password) {

        //2.1 dai errore
        return res.status(404).json({message: 'Error! Please write your Username and Password'});

    }

    //3 controlla se utente registrato
    if (authenticatedUser(username, password)) {

        //3.1 crea token con scadenza 1ora
        let accessToken = jwt.sign ({data: password}, 'access', {expiresIn: 60 * 60});

        //3.2 alla richiesta consegna accesToken e username
        req.session.authorization = {accessToken, username}

        //3.3 restituisci messaggio di successo
        return res.status(200).send({message: 'User successfully logged in'});

    //4 altrimenti
    } else {

        //4.1 resituisci errore 
        return res.status(208).json({message: 'Invalid username or password'});
    
    }

  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  
  //1 verifica se utente loggato
  if (req.session.authorization) {

    //1.2 prendi il token e verifica
    token = req.session.authorization['accessToken'];
    jwt.verify (token, 'access', (err,user) =>{

      //1.2.1 se verifica ok
      if (!err) {

        //1.2.1.1 prendi isbn richiesta e trova il libro
        const isbn = req.params.isbn;
        let book = books[isbn];

        //1.2.1.2 trova se il libro esiste
        if (book) {

          //1.2.1.2.1 prendi la review dalla richiesta e lo username dalla sessione
          const newReview = req.body.review;
          let currentUser = req.session.authorization.username;

          //2.1.1.2.2 inserisci la review nell'array e restituisci mess successo
          book.reviews[currentUser] = newReview;
          return res.send({message: 'Review succesfully posted'});
        
        //1.2.1.3 altrimenti  
        } else {

          //1.2.1.3.1 errore non c'è il libro che cerchi
          return res.status(408).send({message: 'ISBN not found'});

        }

      //1.2.2 altrimenti
      } else {

        //1.2.2.3 mes di errore
        return res.status(403).json({message: 'User not authenticated'});

      }
    })

  } else {

    return res.status(403).json({message: 'user not logged in'});
  
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

//cancella review
regd_users.delete("/auth/review/:isbn", (req, res) => {

    const isbn = req.params.isbn;
    const username = req.session.authorization.username;
    if (books[isbn]) {
        let book = books[isbn];
        delete book.reviews[username];
        return res.status(200).send({message: "Review successfully deleted"});
    }
    else {
        return res.status(404).json({message: `ISBN ${isbn} not found`});
    }

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
