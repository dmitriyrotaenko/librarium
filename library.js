import LibModel from "./LibModel.js";
import LibView from "./LibView.js";
import LibController from "./LibController.js";


new LibController(
	new LibModel([
		{
			title: 'The Plague 🦠',
			author: 'A. Camus',
			numberOfPages: 216,
			isRead: true,
			id: '1'
		},
		{
			title: 'The Old Man and the Sea 🌊',
			author: 'Ernest Hemingway',
			numberOfPages: 112,
			isRead: false,
			id: '2'
		}
	]), 
	new LibView()
);

