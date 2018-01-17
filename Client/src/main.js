import controller from "./controller"

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

var vuedata = {
	location: "Tokyo",
	latest: 24,
	min: 3,
	max: 28
}

var vueapp = new Vue({
	el: "#app",
	data: vuedata
})

controller.setCallback(function(index){
	vuedata.location = data[index].location
	vuedata.latest = data[index].latest
	vuedata.min = data[index].min
	vuedata.max = data[index].max
})
controller.setIndex(0)
$("#arrow_left").click(controller.previousIndex)
$("#arrow_right").click(controller.nextIndex)
