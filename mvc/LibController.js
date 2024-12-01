class LibController {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		view.on('add', this.addBook);
		view.on('toggle', this.toggleReadStatus);
		view.on('destroy', this.destroyBook);

		view.renderAllBooks(this.model.library);
	}

	addBook = bookInfo => {
		const newBook = {
			id: crypto.randomUUID(),
			...bookInfo
		};

		this.model.addBook(newBook);
		this.view.addBookCard(newBook);
	}

	toggleReadStatus = bookInfo => {
		// rewrite
		const updatedBook = this.model.toggleBookStatus(bookInfo);
		this.view.toggleBookStatus(updatedBook);
	};

	destroyBook = id => {
		this.model.destroyBook(id);
		this.view.removeBookCard(id);
	}
}

export default LibController;