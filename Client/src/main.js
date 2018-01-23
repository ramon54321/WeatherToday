import controller from "./controller"
import view from "./view"
import data from "./data"

/**
	Globals
*/
const FADE_DURATION = 200

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
		view.fadeOut("#viewMain", FADE_DURATION)
		view.fadeIn("#viewList", FADE_DURATION)
	})

	$("#blockListButton").text("loading")
})

/**
	Clicking on the list itself.
*/
$("#viewList").click(() => {view.fadeOut("#viewList", FADE_DURATION); view.fadeIn("#viewMain", FADE_DURATION);})


/**
	Start logic when all content is ready.
*/
$(document).ready(() => {
	/**
		Fade in loading.
	*/
	view.fadeIn("#viewLoading", FADE_DURATION)

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
		view.fadeOut("#viewLoading", FADE_DURATION)
		view.fadeIn("#viewMain", FADE_DURATION)

		/**
			Set the index to 0 initially TODO: set the default index to url parameter
		*/
		controller.setIndex(0)
	})
})
