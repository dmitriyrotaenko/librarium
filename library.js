import LibModel from "./mvc/LibModel.js";
import LibView from "./mvc/LibView.js";
import LibController from "./mvc/LibController.js";

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

