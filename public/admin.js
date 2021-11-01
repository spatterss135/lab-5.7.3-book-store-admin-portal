async function getBooks() {
  let response = await fetch("http://localhost:3001/listBooks");
  let books = await response.json();
  
  books.forEach((book) => {
    let newBook = document.createElement("div");
    let bookTitle = document.createElement("h4");
    let quantityInputBox = document.createElement("input");
    let submitNewQuantity = document.createElement("button");
    let deleteBook = document.createElement("button");
    deleteBook.classList.add("delete");
    deleteBook.textContent = "Delete Book";
    submitNewQuantity.classList.add("submit");
    submitNewQuantity.textContent = "Submit";
    submitNewQuantity.setAttribute("data-button-for", book.title);
    deleteBook.setAttribute("data-button-for", book.title);
    quantityInputBox.value = book.quantity;
    quantityInputBox.setAttribute("data-input-for", book.title);
    bookTitle.textContent = book.title;
    newBook.append(bookTitle, quantityInputBox, submitNewQuantity, deleteBook);
    document.body.append(newBook);
  });

  let submitButtons = document.querySelectorAll(".submit");
  let deleteButtons = document.querySelectorAll(".delete");
  let inputAreas = document.querySelectorAll("input");

  submitButtons.forEach((button) => {
    button.addEventListener("click", updateBookQuantity);
  });
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteBook);
  });

  async function updateBookQuantity() {
    let inputAreaForSpecificBook;
    let specificBookObject;
    inputAreas.forEach((inputArea) => {
      if (
        inputArea.getAttribute("data-input-for") ===
        this.getAttribute("data-button-for")
      ) {
        inputAreaForSpecificBook = inputArea;
      }
    });
    books.forEach((book) => {
      if (
        book.title === inputAreaForSpecificBook.getAttribute("data-input-for")
      ) {
        specificBookObject = book;
      }
    });
    console.log(specificBookObject);

    await fetch("http://localhost:3001/updateBook", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: specificBookObject.id,
        title: specificBookObject.title,
        year: specificBookObject.year,
        description: specificBookObject.description,
        quantity: inputAreaForSpecificBook.value,
        imageURL: specificBookObject.imageURL,
      }),
    });
  }

async function deleteBook() {
    let specificBookObject;
    books.forEach(book => {
        if (book.title === this.getAttribute("data-button-for")){
            specificBookObject = book
        }
        })
    
    await fetch(`http://localhost:3001/removeBook/${specificBookObject.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    response = await fetch("http://localhost:3001/listBooks");
    books = await response.json();
    
    const bookItems = [...document.querySelectorAll('div')]
    bookItems.forEach(book => console.log(book))
    
    
    }
    
    
  
}
// Your Code Here
getBooks();
