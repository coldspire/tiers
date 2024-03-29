const dialog = document.querySelector('dialog');
const dialogCloseButton = document.querySelector('dialog button');
const launchers = document.querySelectorAll('.item-launcher');

launchers.forEach((launcher) => {
	launcher.addEventListener('click', () => {
		dialog.showModal();
	});
});

dialogCloseButton.addEventListener('click', () => {
	dialog.close();
});