import controller from "./controller"

/**
	Data will be populated by fetch request from server.
	The server should return an array like data.
*/
let data = [{
	location: "New York",
	latest: 27,
	min: 17,
	max: 32
}, {
	location: "Tokyo",
	latest: 24,
	min: 16,
	max: 28
}, {
	location: "Helsinki",
	latest: 7,
	min: -8,
	max: 9
}, {
	location: "London",
	latest: 19,
	min: 17,
	max: 23
}, {
	location: "Singapore",
	latest: 31,
	min: 24,
	max: 35
}]

/**
	Vuedata is a shared reference to data used by vue.
	Update vuedata to change values in UI.
*/
var vuedata = {
	location: "Tokyo",
	latest: 24,
	min: 3,
	max: 28
}

/**
	Vueapp is the vue instance.
*/
var vueapp = new Vue({
	el: "#app",
	data: vuedata
})

/**
	Set the callback function to call when the index changes.
	This function sets the vuedata to the value of the data at the new index.
*/
controller.setCallback(function(index){
	vuedata.location = data[index].location
	vuedata.latest = data[index].latest
	vuedata.min = data[index].min
	vuedata.max = data[index].max
})

/**
	Set the index to 0 initially TODO: set the default index to url parameter
*/
controller.setIndex(0)

/**
	Add event handlers to left and right arrows.
*/
$("#arrow_left").click(controller.previousIndex)
$("#arrow_right").click(controller.nextIndex)
