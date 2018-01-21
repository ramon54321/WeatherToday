import controller from "./controller"
import view from "./view"

/**
	Data will be populated by fetch request from server.
	The server should return an array like data.
*/
let data = []

/**
	Vuedata is a shared reference to data used by vue.
	Update vuedata to change values in UI.
*/
var vuedata = {
	location: "",
	latest: "",
	min: "",
	max: "",
	records: [
		{
			time: "33:41",
			temperature: 23
		},
		{
			time: "43:41",
			temperature: 24
		},
		{
			time: "53:41",
			temperature: 25
		},
		{
			time: "63:41",
			temperature: 26
		},
		{
			time: "73:41",
			temperature: 27
		}
	]
}

/**
	Vueapp is the vue instance.
*/
var vueapp = new Vue({
	el: "#app",
	data: vuedata
});

/**
	Send POST to server to add a new temperature.
	First the inputs are validated.
	Then the request is made.
	Since the request is a promise, while it is made, the UI is updated.
*/
function addNewTemperature() {
	// -- Validation
	let location = vuedata.location
	let temperature = $("#temperatureInput").val()

	if(location == null || location == undefined){
		console.log("[WARNING] The location is null or undefined -> Not adding observation")
		return;
	}

	if(temperature == null || temperature == undefined || temperature == ""){
		console.log("[WARNING] The temperature is null, undefined or empty -> Not adding observation")
		$("#temperatureInput").addClass("invalid")
		return;
	}

	if(temperature < -50 || temperature > 60) {
		console.log("[WARNING] The temperature is out of a reasonable range (-50 -> 60) -> Not adding observation")
		$("#temperatureInput").addClass("invalid")
		return
	}

	// -- Request
	fetch("api/temperature", {
		method: "POST",
		body: JSON.stringify({location: location, temperature: temperature}),
		headers: new Headers({
			"Content-Type": "application/json"
		})
	}).then((response) => {
		return response.json()
	}).then((resData) => {
		console.log("[INFO] Completed POST to server with temperature " + temperature + " at location " + location)
	})

	// -- UI Update
	console.log("disableing");
	$("#add").unbind("click")
	$("#add").addClass("disabled")
	$("#temperatureInput").removeClass("invalid")
	$("#slideBottomText").text("ADDED")

	// -- Update Vue
	let index = controller.getIndex()
	data[index].latest = temperature
	if(temperature < data[index].min)
		data[index].min = temperature

	if(temperature > data[index].max)
		data[index].max = temperature

	updateVueData(index)
}

/**
	Set the data in the actual vue object instance to that of the cached array.
*/
function updateVueData(index){
	vuedata.location = data[index].location
	vuedata.latest = data[index].latest
	vuedata.min = data[index].min
	vuedata.max = data[index].max
}

/**
	Set the callback function to call when the index changes.
	This function sets the vuedata to the value of the data at the new index.
*/
controller.setCallback(updateVueData)

/**
	Add event handlers to left and right arrows, and add button.
*/
$("#arrow_left").click(controller.previousIndex)
$("#arrow_right").click(controller.nextIndex)
$("#add").click(addNewTemperature)
$("#viewList").click(() => {view.fadeOut("#viewList", 800)})
$("#blockListButton").click(() => {view.fadeIn("#viewList", 800)})

/**
	Start logic when all content is ready.
*/
$(document).ready(() => {
	/**
		Fade in loading.
	*/
	view.fadeIn("#viewLoading", 800)

	/**
		Fetch the data from the server.
	*/
	fetch("api/temperature")
	.then((response) => {
		return response.json()
	}).then((resData) => {
		data = resData

		/**
			Fade out loading. Fade in main container.
		*/
		view.fadeOut("#viewLoading", 800)
		view.fadeIn("#viewMain", 1200)

		/**
			Set the index to 0 initially TODO: set the default index to url parameter
		*/
		controller.setIndex(0)
	})
})
