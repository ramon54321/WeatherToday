/**
	Interface for controlling the index/location of the main view.
*/
let index = 0
let callback = null

/**
	Fired whenever the index is changed.
*/
function onIndexChange() {
	console.log("[DEBUG] Index changed to " + index)

	// -- Deal with css changes
	$(".bubble").removeClass("active")
	$("#bubble_" + index).addClass("active")

	// -- Deal with callback to vue
	if(callback == null){
		console.log("[ERROR] No callback assigned to onIndexChange in 'controller'");
	} else {
		callback(index)
	}
}

/**
	The controller is used as an interface to manage the current location.

	The only exposed methods are those inside the controller variable. The controller will manage user interface changes that need to occur when the index changes.

	The callback will be called when the index changes.
*/
let controller = {
	setCallback: function(_callback){
		callback = _callback
	},
	setIndex: function(_index) {
		if(_index > 4 || _index < 0){
			return
		}
		index = _index
		onIndexChange()
	},
	nextIndex: function() {
		if(index == 4){
			index = 0
		} else {
			index += 1
		}
		onIndexChange()
	},
	previousIndex: function() {
		if(index == 0){
			index = 4
		} else {
			index -= 1
		}
		onIndexChange()
	},
	getIndex: function() {
		return index
	}
}

export default controller
