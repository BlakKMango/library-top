const myLibrary = [];

function Book(title, author, datePublished, genre) {
    //create a constructor
    this.title = title;
    this.author = author;
    this.datePublished = datePublished;
    this.genre = genre;
    this.id = crypto.randomUUID();
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author} (${this.published}) - ${this.genre}`;
}

function addBookToLibrary(title, author, datePublished, genre) {
    // take params, create a book then store it in the array
    myLibrary.push(new Book(title, author, datePublished, genre))
    myLibrary.sort((a, b) => a.title.localeCompare(b.title));

    displayLibrary()
}

function displayLibrary() {
    myLibrary.forEach((book) => {
        //create a new book element in the DOM
        
    })
}


addBookToLibrary