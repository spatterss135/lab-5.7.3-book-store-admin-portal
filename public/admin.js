async function main() {
  let response = await fetch("http://localhost:3001/listBooks");
  let books = await response.json();

  books.forEach(renderBook)

  function renderBook(book) {
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
  }

  let submitButtons = document.querySelectorAll(".submit");
  let deleteButtons = document.querySelectorAll(".delete");
  let inputAreas = document.querySelectorAll("input");

  submitButtons.forEach((button) => {
    button.addEventListener("click", updateBookQuantity);
  });
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteBook);
  });


  function updateBookQuantity() {
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

    fetch("http://localhost:3001/updateBook", {
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

  function deleteBook() {
    let specificBookObject;
    books.forEach(book => {
        if (book.title === this.getAttribute("data-button-for")){
            specificBookObject = book
        }
        })
    
    
   fetch(`http://localhost:3001/removeBook/${specificBookObject.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    console.log(books)
    const bookItems = [...document.querySelectorAll('div')]
    bookItems.forEach(book => {
      console.log(book)
      if (book.firstChild.textContent === specificBookObject.title) {
        book.remove()
      }
    }
      )
    
    
    }


  const myForm = document.getElementById('myForm')
  myForm.addEventListener('submit', handleForm)
  function handleForm(ev) {
    ev.preventDefault(); //stop the page reloading
    //console.dir(ev.target);
    let myForm = ev.target;
    let fd = new FormData(myForm);
  
    //add more things that were not in the form
    fd.append('year', new Date().getFullYear());
    fd.append('quantity', 3);
  
    //look at all the contents
    let json = convertFD2JSON(fd);
  
    console.log(json)
    // let h = new Headers();
    // h.append('Content-type', 'application/json');
    // fetch('http://localhost:3001/addBook' , {
    //   method: 'POST',
    //   headers: h,
    //   body: json
    // }).catch(console.warn)
  
  // }
    //send the request with the formdata
    let url = 'http://localhost:3001/addBook';
    let h = new Headers();
    h.append('Content-type', 'application/json');
  
    let req = new Request(url, {
      headers: h,
      body: json,
      method: 'POST',
    });
    //console.log(req);
    fetch(req)
      .then((res) => res.json())
      .then((data) => {
        console.log('Response from server');
        console.log(data);
      })
      .catch(console.warn);
  
  
      function convertFD2JSON(formData) {
        let obj = {};
        for (let key of formData.keys()) {
          obj[key] = formData.get(key);
        }
        return JSON.stringify(obj);
      }  
  }
}



  

main()



