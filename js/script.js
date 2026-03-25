const libraryGrid = document.querySelector(".library-grid");
const addBookModal = document.querySelector("#modal");
const closeModalButton = document.querySelector("#close-modal");
const openModalButton = document.querySelector("#open-modal");
const newBookForm = document.querySelector("#new-book-form");

const myLibrary = [];

class Book {
    constructor(title, author, datePublished, genre, isbn) {
        this.title = title;
        this.author = author;
        this.datePublished = datePublished;
        this.genre = genre;
        this.isbn = isbn;
        this.read = false;
    }

    get bookInfo() {
        const { title, author, datePublished, genre, isbn } = this;
        return { title, author, datePublished, genre, isbn };
    }

    //methods
    toggleRead() {
        this.read = !this.read
    }

    deleteBook() {
        const index = myLibrary.indexOf(this);
        myLibrary.splice(index, 1);
    }

    //Static - applied to class only
    static addBookToLibrary(title, author, datePublished, genre, isbn) {
        // take params, create a book then store it in the array
        myLibrary.push(new Book(title, author, datePublished, genre, isbn))
        myLibrary.sort((a, b) => a.title.localeCompare(b.title));

        displayBooks()
    }
}

function createBookCard(book) {
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
    </div>
    `;
    libraryGrid.appendChild(bookCard)
    renderDelete(book, bookCard)
    renderRead(book, bookCard)

    if (book.isbn) {
        const img = bookCard.querySelector("img");
        const cleanISBN = String(book.isbn).replace(/[-\s]/g, "");
        img.setAttribute("src", `https://covers.openlibrary.org/b/isbn/${cleanISBN}-L.jpg`)
        img.onerror = () => { img.src = "../img/placeholder.jpeg"; };
    }  
}

function renderRead(book, bookCard) {
    const cardButtons = bookCard.querySelector(".card-button-wrap");
    const readButton = document.createElement("button");
    readButton.classList.add("mark-read");
    readButton.textContent = book.read ? "Finished" : "Mark as read";
    readButton.dataset.id = book.isbn
    cardButtons.appendChild(readButton);

    readButton.addEventListener("click", () => {
        book.toggleRead();
        readButton.textContent = book.read ? "Finished" : "Mark as read";
        readButton.classList.toggle("finished");
    })
}

function renderDelete(book, bookCard) {
  const cardButtons = bookCard.querySelector(".card-button-wrap");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-book");
  const icon = document.createElement("img");
  icon.src = "/library-top/img/trash_icon.svg";
  deleteButton.appendChild(icon);
  cardButtons.appendChild(deleteButton);
  deleteButton.addEventListener("click", () => {
    book.deleteBook();
    displayBooks();
  });
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


//--------------EVENT LISTENERS-----------//
openModalButton.addEventListener("click", openModal)
closeModalButton.addEventListener("click", closeModal)
newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    Book.addBookToLibrary(
        e.target.title.value,
        e.target.author.value,
        e.target.year.value,
        e.target.genre.value,
        e.target.isbn.value
    );
    newBookForm.reset();
    closeModal();
})


Book.addBookToLibrary("All the Light We Cannot See", "Anthony Doerr", "2014", "historical-fiction", "9781476746586");
Book.addBookToLibrary("Anxious People", "Fredrik Backman", "2019", "literary-fiction", "9781405930253");
Book.addBookToLibrary("Beautiful World, Where Are You", "Sally Rooney", "2021", "literary-fiction", "9780571365425");
Book.addBookToLibrary("Conversations with Friends", "Sally Rooney", "2017", "literary-fiction", "9780571333134");
Book.addBookToLibrary("Crying in H Mart", "Michelle Zauner", "2021", "biography", "9780525657743");
Book.addBookToLibrary("Daisy Jones and The Six", "Taylor Jenkins Reid", "2019", "literary-fiction", "9781524798628");
Book.addBookToLibrary("Malibu Rising", "Taylor Jenkins Reid", "2021", "literary-fiction", "9781524798659");
Book.addBookToLibrary("Normal People", "Sally Rooney", "2018", "literary-fiction", "9780571334650");
Book.addBookToLibrary("Sunburn", "Chloe Michelle Hooper", "2024", "literary-fiction", "9780857308412");
Book.addBookToLibrary("The Handmaid's Tale", "Margaret Atwood", "1985", "dystopian", "9780385490818");
Book.addBookToLibrary("The Hunger Games", "Suzanne Collins", "2008", "dystopian", "9780439023481");
Book.addBookToLibrary("The Midnight Library", "Matt Haig", "2020", "literary-fiction", "9780525559474");
Book.addBookToLibrary("Where the Crawdads Sing", "Delia Owens", "2018", "literary-fiction", "9783453424012");
Book.addBookToLibrary("The Seven Husbands of Evelyn Hugo", "Taylor Jenkins Reid", "2017", "literary-fiction", "9783548066738");
Book.addBookToLibrary("Rubyfruit Jungle", "Rita Mae Brown", "1973", "literary-fiction", "9780553278866");