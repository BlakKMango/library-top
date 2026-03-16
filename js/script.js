const libraryGrid = document.querySelector(".library-grid");

const myLibrary = [];

function Book(title, author, datePublished, genre) {
    //create a constructor
    this.title = title;
    this.author = author;
    this.datePublished = datePublished;
    this.genre = genre;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, datePublished, genre) {
    // take params, create a book then store it in the array
    myLibrary.push(new Book(title, author, datePublished, genre))
    myLibrary.sort((a, b) => a.title.localeCompare(b.title));

    displayBooks()
}

function createBookCard(book) {
    const bookCard = document.createElement("div")
    bookCard.classList.add("book")

    const imgSrc = `../img/${book.title.replace(/\s/g, '').toLowerCase()}.jpeg`

    bookCard.innerHTML = `
    <img src="${imgSrc}" alt="${book.title} cover">
    <div class="book-info">
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Published:</strong> ${book.datePublished}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
    </div>
    `;

    libraryGrid.appendChild(bookCard)
}

function displayBooks() {
    libraryGrid.innerHTML = "";
    myLibrary.forEach((book) => {
        createBookCard(book)
    })
}


