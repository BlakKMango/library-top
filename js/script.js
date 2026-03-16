const myLibrary = [];

function Book(title, author, datePublished, genre) {
    //create a constructor
    this.title = title;
    this.author = author;
    this.datePublished = datePublished;
    this.genre = genre;
    this.id = crypto.randomUUID;
}

function addBookToLibrary(title, author, datePublished, genre) {
    // take params, create a book then store it in the array
    myLibrary.push(new Book(title, author, datePublished, genre))
}



addBookToLibrary