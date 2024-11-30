import EventEmitter from './EventEmitter.js';

class LibView extends EventEmitter {
	constructor() {
		super();

		this.dialog = document.querySelector('.book-dialog');
		this.form = document.querySelector('.book-form');
		this.bookList = document.querySelector('.books');

		this.bindEvents();
	}

	renderAllBooks(books) {
		books.forEach(this.addBookCard.bind(this));
	}

	addBookCard(bookInfo) {
		const bookCard = document.querySelector('.book-template').content.cloneNode(true).querySelector('.book');
		const { title, author, numberOfPages, isRead, id } = bookInfo;

		const readStatusCheckbox = bookCard.querySelector('.status__native-checkbox');

		bookCard.querySelector('.book__title').textContent = title;
		bookCard.querySelector('.book__title').title = title;

		bookCard.querySelector('.book__author').textContent = author;
		bookCard.querySelector('.book__pages').textContent = numberOfPages;

		readStatusCheckbox.checked = isRead;

		readStatusCheckbox.addEventListener('change', this.handleStatusChange);
	
		bookCard.dataset.id = id;

		this.bookList.appendChild(bookCard);
	}

	removeBookCard(id) {
		const cardToRemove = this.findBookCard(id);
		if(confirm('Do you want to delete this book?')) {
			cardToRemove.querySelector('.status__native-checkbox').removeEventListener('change', this.handleStatusChange);
			this.bookList.removeChild(cardToRemove);
		}
	}

	findBookCard(id) {
		return this.bookList.querySelector(`[data-id="${id}"]`); 
	}

	toggleBookStatus(bookInfo) {
		const bookToToggle = this.findBookCard(bookInfo?.id);		
		bookToToggle.querySelector('.status__native-checkbox').checked = bookInfo?.isRead; 
	}

	handleFormSubmit = event => {
		event.preventDefault();

		const formData = new FormData(this.form);
		const isRead = formData.has('isRead');

		if(this.form.checkValidity()) {
			
			const userInput = {
				...Object.fromEntries(formData),
				isRead
			};

			this.emit('add', userInput);

			this.handleDialogClose();
		} else {
			this.form.reportValidity();
		}
	}

	handleBookDelete = ({ target }) => {
		if(target.classList.contains('book__delete')) {
			const bookID = target.closest('.book').dataset.id;
			this.emit('destroy', bookID);
		}
	}

	handleStatusChange = ({ target }) => {
		const bookID = target.closest('.book').dataset.id;
		const isRead = target?.checked;

		this.emit('toggle', { id: bookID, isRead});
	}

	handleDialogClose = () => {
		this.form.reset();
		this.dialog.close();
	}

	bindEvents() {
		this.form.addEventListener('submit', this.handleFormSubmit);
		this.bookList.addEventListener('click', this.handleBookDelete);
		this.dialog.querySelector('.book-dialog__cancel').addEventListener('click', this.handleDialogClose);

		document.querySelector('.open-dialog-btn').addEventListener('click', () => this.dialog.showModal());
	}
}

export default LibView;