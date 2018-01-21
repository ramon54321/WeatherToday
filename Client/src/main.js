import controller from "./controller"
import view from "./view"
import data from "./data"

/**
	Set the callback function to call when the index changes.
	This function sets the vuedata to the value of the data at the new index.
*/
controller.setCallback(data.updateVueData)

/**
	Add event handlers to left and right arrows, and add and history buttons.
*/
$("#arrow_left").click(controller.previousIndex)
$("#arrow_right").click(controller.nextIndex)
$("#add").click(data.addNewTemperature)

/**
	Clicking on the view history button.
*/
$("#blockListButton").click(() => {
	// -- Store text of button
	let buttonText = $("#blockListButton").text()

	/**
		Fetch the data from the server for list.
	*/
	fetch("api/temperature/" + data.getLocation())
	.then((response) => {
		return response.json()
	}).then((resData) => {
		data.setRecords(resData)
		$("#blockListButton").text(buttonText)
		view.fadeOut("#viewMain", 400)
		view.fadeIn("#viewList", 400)
	})

	$("#blockListButton").text("loading")
})

/**
	Clicking on the list itself.
*/
$("#viewList").click(() => {view.fadeOut("#viewList", 400); view.fadeIn("#viewMain", 400);})


/**
	Start logic when all content is ready.
*/
$(document).ready(() => {
	/**
		Fade in loading.
	*/
	view.fadeIn("#viewLoading", 400)

	/**
		Fetch the data from the server.
	*/
	fetch("api/temperature")
	.then((response) => {
		return response.json()
	}).then((resData) => {
		data.setData(resData)

		/**
			Fade out loading. Fade in main container.
		*/
		view.fadeOut("#viewLoading", 400)
		view.fadeIn("#viewMain", 400)

		/**
			Set the index to 0 initially TODO: set the default index to url parameter
		*/
		controller.setIndex(0)
	})
})
