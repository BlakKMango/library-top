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
    `;
    libraryGrid.appendChild(bookCard)

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


//------------Modal controls -------------//
function openModal() {
    addBookModal.showModal();
}

function closeModal() {
    addBookModal.close();
}




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
