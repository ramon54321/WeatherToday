import $ from "jquery"
import controller from "./controller"
import view from "./view"
import data from "./data"
import FADE_DURATION from "./ui"

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
