import AwesomeBooks from './awesome_books.js';
import { DateTime } from 'luxon/src/luxon';

const books = new AwesomeBooks();
const booksSection = document.getElementById('books');
const form = document.getElementById('book_form');
const listTag = document.getElementById('list');
const newTag = document.getElementById('new');
const contactTag = document.getElementById('contact_section');

const createBookElements = () => {
  booksSection.replaceChildren();
  if (books.books.length > 0) {
    const booksList = document.createElement('ul');
    booksList.style.listStyleType = 'none';
    booksList.style.margin = '0';
    booksList.style.padding = '0';
    for (let i = 0; i < books.books.length; i += 1) {
      const b = books.books[i];
      const bookCard = document.createElement('li');
      if (i % 2) {
        bookCard.style.backgroundColor = 'white';
      } else {
        bookCard.style.backgroundColor = 'rgb(160, 153, 153)';
      }
      const titleElement = document.createElement('h4');
      titleElement.style.padding = '0';
      titleElement.style.margin = '0';
      const titleText = document.createTextNode(`"${b.title}" by ${b.author}`);
      titleElement.appendChild(titleText);
      bookCard.appendChild(titleElement);
      const removeBtn = document.createElement('button');
      const btnText = document.createTextNode('Remove');
      removeBtn.onclick = function () {
        books.removeBook(b.id);
        books.saveBooks();
        createBookElements();
      };
      removeBtn.appendChild(btnText);
      bookCard.appendChild(removeBtn);
      booksList.appendChild(bookCard);
    }
    booksSection.appendChild(booksList);
  } else {
    const noBooks = document.createElement('h3');
    const noBooksText = document.createTextNode('There are no books available');
    noBooks.appendChild(noBooksText);
    booksSection.appendChild(noBooks);
  }
};

const getAddedBook = () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  books.addBook(title, author);
  createBookElements();
  form.reset();
};

const initStorage = () => {
  if (localStorage.getItem('books')) {
    books.getStoredBooks();
    createBookElements();
  } else {
    createBookElements();
  }
};

const deactivateActivity = (id) => {
  const menus = [listTag, newTag, contactTag];
  menus.map((m) => {
    if (m.id !== id) {
      m.classList.remove('active_menu');
    }
    return m;
  });
};

const showAndHide = (id) => {
  const formSection = document.getElementById('form_section');
  const contactSection = document.getElementById('contact');
  const sections = [booksSection, formSection, contactSection];
  sections.map((s) => {
    if (s.id === id) {
      if (s.id !== 'books') {
        s.style.display = 'flex';
      } else {
        s.style.display = 'block';
      }
    } else {
      s.style.display = 'none';
    }
    return s;
  });
};

const updateView = (id) => {
  if (id === listTag.id) {
    if (!listTag.classList.contains('active_menu')) {
      listTag.classList.toggle('active_menu');
    }
    deactivateActivity(id);
    showAndHide('books');
  } else if (id === newTag.id) {
    if (!newTag.classList.contains('active_menu')) {
      newTag.classList.toggle('active_menu');
    }
    deactivateActivity(id);
    showAndHide('form_section');
  } else if (id === contactTag.id) {
    if (!contactTag.classList.contains('active_menu')) {
      contactTag.classList.toggle('active_menu');
    }
    deactivateActivity(id);
    showAndHide('contact');
  }
};

const createDate = () => {
  const d = DateTime.now();
  document.getElementById('time').innerHTML = d;
};

const initAll = () => {
  initStorage();
  form.addEventListener('submit', getAddedBook);
  listTag.addEventListener('click', () => { updateView(listTag.id); });
  newTag.addEventListener('click', () => { updateView(newTag.id); });
  contactTag.addEventListener('click', () => { updateView(contactTag.id); });
  createDate();
};

export default initAll;