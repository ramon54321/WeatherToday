import $ from "jquery"
/**
	Interface for fading and changing views.
*/
let view = {
	fadeIn: function(element, duration) {
		$(element).removeClass("hidden")
		$(element).addClass("shown")
		$(element).css("opacity", 0)
		$(element).animate({opacity: "1"}, duration);
	},
	fadeOut: function(element, duration) {
		$(element).css("opacity", 1)
		$(element).animate({opacity: "0"}, duration, "swing", function () {
			$(element).removeClass("shown")
			$(element).addClass("hidden")
		});
	}
}

export default view
