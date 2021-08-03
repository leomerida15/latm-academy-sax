// Create a new form, then add a checkbox question, a multiple choice question,
// a page break, then a date question and a grid of questions.
const form = FormApp.create('New Form');
const item = form.addCheckboxItem();
item.setTitle('What condiments would you like on your hot dog?');
item.setChoices([item.createChoice('Ketchup'), item.createChoice('Mustard'), item.createChoice('Relish')]);
form
	.addMultipleChoiceItem()
	.setTitle('Do you prefer cats or dogs?')
	.setChoiceValues(['Cats', 'Dogs'])
	.showOtherOption(true);
form.addPageBreakItem().setTitle('Getting to know you');
form.addDateItem().setTitle('When were you born?');
form
	.addGridItem()
	.setTitle('Rate your interests')
	.setRows(['Cars', 'Computers', 'Celebrities'])
	.setColumns(['Boring', 'So-so', 'Interesting']);
Logger.log('Published URL: ' + form.getPublishedUrl());
Logger.log('Editor URL: ' + form.getEditUrl());
