const libraryGrid = document.querySelector(".library-grid");
const addBookModal = document.querySelector("#modal");
const closeModalButton = document.querySelector("#close-modal");
const openModalButton = document.querySelector("#open-modal");
const newBookForm = document.querySelector("#new-book-form");


const myLibrary = [];

function Book(title, author, datePublished, genre, isbn) {
    //create a constructor
    this.title = title;
    this.author = author;
    this.datePublished = datePublished;
    this.genre = genre;
    this.isbn = isbn;
}

function addBookToLibrary(title, author, datePublished, genre, isbn) {
    // take params, create a book then store it in the array
    myLibrary.push(new Book(title, author, datePublished, genre, isbn))
    myLibrary.sort((a, b) => a.title.localeCompare(b.title));

    displayBooks()
}

async function createBookCard(book) {
    const bookCard = document.createElement("div")
    bookCard.classList.add("book")
    bookCard.dataset.id = book.isbn
    bookCard.innerHTML = `
    <img src="" alt="${book.title} cover">
    <div class="book-info">
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Published:</strong> ${book.datePublished}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
    </div>
    <div class="card-button-wrap">
        <button class="delete-book"><img src="../img/trash_icon.svg"></button>
        <button class="mark-read">Mark as read</button>
    </div>
    `;
    libraryGrid.appendChild(bookCard)

    const deleteButton = bookCard.querySelector(".delete-book");
    deleteButton.addEventListener("click", () => deleteBookFromLibrary(deleteButton.dataset.id));

    if (book.isbn) {
        const img = bookCard.querySelector("img");
        const cleanISBN = String(book.isbn).replace(/[-\s]/g, "");
        img.setAttribute("src", `https://covers.openlibrary.org/b/isbn/${cleanISBN}-L.jpg`)
        img.onerror = () => { img.src = "../img/placeholder.jpeg"; };
    }
}

function displayBooks() {
    libraryGrid.innerHTML = "";
    myLibrary.forEach((book) => {
        createBookCard(book)
    })
}

function deleteBookFromLibrary(isbn) {
    //Find the book in the array
    const index = myLibrary.findIndex(book => book.isbn === isbn);
    myLibrary.splice(index, 1)
    displayBooks();
}


//------------Modal controls -------------//
function openModal() {
    addBookModal.showModal();
}

function closeModal() {
    addBookModal.close();
}



//--------------EVENT LISTENERS-----------//
openModalButton.addEventListener("click", openModal)
closeModalButton.addEventListener("click", closeModal)
newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary(
        e.target.title.value,
        e.target.author.value,
        e.target.year.value,
        e.target.genre.value,
        e.target.isbn.value
    );
    newBookForm.reset();
    closeModal();
})
