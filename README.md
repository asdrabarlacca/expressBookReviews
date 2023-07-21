tasks completed as per lab instructions:

Task 1:
Complete the code for getting the list of books available in the shop under public_users.get('/',function (req, res) {.
Use the JSON.stringify method for displaying the output neatly.

Task 2:
Complete the code for getting the book details based on ISBN under public_users.get('/isbn/:isbn',function (req, res) {.
Retrieve the ISBN from the request parameters

Task 3:
Complete the code for getting the book details based on the author under public_users.get('/author/:author',function (req, res) {.
1. Obtain all the keys for the ‘books’ object.
2. Iterate through the ‘books’ array & check the author matches the one provided in the request parameters.

Task 4:
Complete the code for getting the book details based on the author under public_users.get('/title/:title',function (req, res) {.
This will be similar to Exercise 3

Task 5:
Complete the code for getting book reviews under public_users.get('/review/:isbn',function (req, res) {.
Get the book reviews based on ISBN provided in the request parameters.

Task 6:
Complete the code for registering a new user
The code should take the ‘username’ and ‘password’ provided in the body of the request for registration. If the username already exists, it must mention the same & must also show other errors like eg. when username &/ password are not provided.

Task 7:
Complete the code for logging in as a registered user.
The code must validate and sign in a customer based on the username and password created in Exercise 6. It must also save the user credentials for the session as a JWT.

Task 8:
Complete the code for adding or modifying a book review.
You have to give a review as a request query & it must get posted with the username (stored in the session) posted. If the same user posts a different review on the same ISBN, it should modify the existing review. If another user logs in and posts a review on the same ISBN, it will get added as a different review under the same ISBN.

Task 9:
Complete the code for deleting a book review under regd_users.delete("/auth/review/:isbn", (req, res) => {
Filter & delete the reviews based on the session username, so that a user can delete only his/her reviews and not other users’.

Task 10:
Add the code for getting the list of books available in the shop (done in Task 1) using Promise callbacks or async-await with Axios.
Refer to this lab on Promises and Callbacks.

Task 11:
Add the code for getting the book details based on ISBN (done in Task 2) using Promise callbacks or async-await with Axios.
Refer to this lab on Promises and Callbacks.

Task 12:
Add the code for getting the book details based on Author (done in Task 3) using Promise callbacks or async-await with Axios.
Refer to this lab on Promises and Callbacks.

Task 13:
Add the code for getting the book details based on Title (done in Task 4) using Promise callbacks or async-await with Axios.
Refer to this lab on Promises and Callbacks.

Task 14:
Please commit and push all the changes to your forked Github repo.
