import controller from "./controller"

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
	max: ""
}

/**
	Vueapp is the vue instance.
*/
var vueapp = new Vue({
	el: "#app",
	data: vuedata
});

/**
	Fetch the data from the server.
*/
fetch("api/temperature")
.then((response) => {
	return response.json()
}).then((resData) => {
	data = resData

	$("#loading").fadeOut(1200)
	$("#mainContainer").fadeIn(1200)

	/**
		Set the index to 0 initially TODO: set the default index to url parameter
	*/
	controller.setIndex(0)
})

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
	$("#slide-bottom-text").text("ADDED")

	// -- Update Vue
	let index = controller.getIndex()
	data[index].latest = temperature
	if(temperature < data[index].min)
		data[index].min = temperature

	if(temperature > data[index].max)
		data[index].max = temperature

	updateVueData(index)
}

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

/**
	Fade in loading.
*/
$("#loading").delay(200).fadeIn(800)
