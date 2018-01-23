import controller from "./controller"

/**
	Data will be populated by fetch request from server.
	The server should return an array/
*/
let _mainData = []
let _records = []

/**
	Vuedata is a shared reference to data used by vue.
	Update vuedata to change values in UI.
*/
var vuedata = {
	location: "",
	latest: "",
	min: "",
	max: "",
	records: []
}

/**
	Vueapp is the vue instance.
*/
var vueapp = new Vue({
	el: "#app",
	data: vuedata
});


/**

*/
let data = {
	/**
		Send POST to server to add a new temperature.
		First the inputs are validated.
		Then the request is made.
		Since the request is a promise, while it is made, the UI is updated.
	*/
	addNewTemperature: function() {
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
			console.log("[INFO] Completed POST to server with temperature " + temperature + " at location " + location)
		})

		// -- UI Update
		$("#add").unbind("click")
		$("#add").addClass("disabled")
		$("#temperatureInput").removeClass("invalid")
		$("#slideBottomText").text("ADDED")

		// -- Update Vue
		let index = controller.getIndex()
		_mainData[index].latest = temperature
		if(temperature < _mainData[index].min)
			_mainData[index].min = temperature

		if(temperature > _mainData[index].max)
			_mainData[index].max = temperature

		data.updateVueData(index)
	},
	/**
		Set the data in the actual vue object instance to that of the cached array.
	*/
	updateVueData: function(index){
		vuedata.location = _mainData[index].location
		vuedata.latest = _mainData[index].latest
		vuedata.min = _mainData[index].min
		vuedata.max = _mainData[index].max
		vuedata.records = _records
	},
	/**
		Set main data cache
	*/
	setData: function(resData){
		_mainData = resData
	},
	/**
		Set and assign records cache
	*/
	setRecords: function(resData){
		_records = resData
		vuedata.records = _records
	},
	/**
		Get current location (Used externally for requests)
	*/
	getLocation: function(){
		return vuedata.location
	}
}

export default data
