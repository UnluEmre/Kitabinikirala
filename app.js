let bookList =[];

const getBooks = ()=>{
    fetch("./products.json")
    .then(res => res.json())
    .then(books => bookList = books);
};
getBooks()

const createBookItemsHtml = () => {
    const bookListEl= document.querySelector(".book__list");
    let bookListHtml = "";
    bookList.forEach((book, index) => {
        bookListHtml +=`<div class="col-4 ${index % 2==0 && "offset-0 mb-5"} ">
        <div class="row book_card">
            <div class="col-5">
                <img class="img-fluid shadow book_image" 
                src="${book.imgSource}"
                alt="resim"
                width:"258"
                height="450">
            </div>
            <div class="col-7 d-flex flex-column justify-content-between mb-5">
                <div class="book_detail">
                <span class="fos gray fs-5" style="font-size:12">${book.author} </span><br>
                <span class="fs-5 fw-bold book_name">${book.name} </span><br>
                </span>
                </div>
                <div>
                    <p class="book_description fos gray">
                        ${book.description}
                    </p>
                    <div>
                        <span class="black fw-bold fs-5">${book.price} Tl </span>
                        ${
                            book.oldPrice ?
                            `<span class="gray fs-5 old_price">${book.oldPrice} Tl</span>`
                            : ""
                        }
                    </div>
                    <div class="d-flex butonbudiv">
                    <button class="btn_purple butonbu">Sepete Ekle</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>`;
});
bookListEl.innerHTML=bookListHtml;
};

const BOOK_TYPES ={
    ALL:"Tümü",
    NOVEL:"Roman",
    CHILDREN:"Çocuk",
    SELFIMPROVEMENT:"Kişisel Gelişim",
    HISTORY:"Tarih",
    FINANCE:"Finans",
    SCIENCE:"Bilim",
}
const createBookTypesHtml = () => {
    const filterEl=document.querySelector(".filtermenu");
    const filterHtml = "";
    let filterTypes=["ALL"];
    bookList.forEach(book =>{
        if(filterTypes.findIndex(filter => filter == book.type) ==-1) filterTypes.push(book.type);
    });
    filterTypes.forEach(type , index=>{
        filterHtml+=`<li class="me-3"><i class="${index ==0 ? "active" :null}" onclick="filterBooks(this)" data-type="${type}"></i>${BOOK_TYPES[type] || type}</li>  </a>`;
    });
    filterEl.innerHTML=filterHtml;
};
const filterBooks =(filterEl) => {
    let bookType=filterEl.dataset.type;
    getBooks();
    if(bookType !="ALL");
    else bookList=bookList.filter(book => book.type == filterEl.dataset.type);
    createBookItemsHtml();
}

setTimeout(() => {
    createBookItemsHtml();
    createBookTypesHtml(); 
}, 100);
