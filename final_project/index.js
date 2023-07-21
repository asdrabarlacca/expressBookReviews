const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
app.use(express.json());

//let users = [];

/*funzione per verificare se utente già esistente
const alreadyExist = (username) => {

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
};*/

/*funzione per verificare se utente registrato
const registeredUser = (username, password) => {

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

};*/


app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next) {

    if(req.session.authorization) {

        token = req.session.authorization['accessToken'];
        jwt.verify (token, 'access', (err, user) => {

            if (!err) {

                req.user = user;
                next ();

            } else {

                return res.status(403).json({message: 'user not authenticated'})
            
            }

        });

    } else {

        return res.status(403).json({message: 'user not logged in'})

    }

});

/*registrazione utente
app.post('/register', (req,res) => {

    //1 prendo username e password dal body
    const username = req.body.username;
    const password = req.body.password;

    //2 verifica se ci sono sia username che password
    if (username && password) {

        //2.1 verfica che lo username non sia già in uso
        if (!alreadyExist (username)) {

            //2.1.1 inserisci i dati nell'elenco utenti
            users.push({'username':username,'password':password});

            //2.1.2 segnala che la registrazione è amdata a buon fine
            return res.status(200).json({message: 'User registered successfully. You can logIn'});

        //2.2 restituisci errore   
        } else {

            return res.status(404).json({message: 'this user already exist'});
        }

    //3 altrimenti dai errore
    } else {

        return res.status(404).json({message: 'unable to register user. Please writwboth username and password'});
    
    }
});*/

/*login
app.post('/login', (req,res) => {

    //1 prendo username e password dal body
    const username = req.body.username;
    const password = req.body.password;

    //2 se non ci sono username o password
    if (!username || !password) {

        //2.1 dai errore
        return res.status(404).json({message: 'Error! Please write your Username and Password'});

    }

    //3 controlla se utente registrato
    if (registeredUser(username, password)) {

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
    
});*/
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
