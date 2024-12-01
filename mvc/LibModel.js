import EventEmitter from './EventEmitter.js';

class LibModel extends EventEmitter {
	constructor(library = []) {
		super();
		this.library = library;
	}

	getBook(id) {
		return this.library.find(book => book.id === id);
	}

	addBook(bookInfo) {
		this.library.push(bookInfo);
	}

	toggleBookStatus(bookInfo) {
		const { id, isRead } = bookInfo;
		const bookToUpdate = this.getBook(id);

		bookToUpdate.isRead = isRead;

		return bookToUpdate;
	}

	destroyBook(id) {
		const libraryWithoutBook = this.library.filter(book => book.id !== id);
		this.library = libraryWithoutBook;
	}
};

export default LibModel;
