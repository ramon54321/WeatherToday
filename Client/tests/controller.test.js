import test from "ava"
import { fixture } from "ava-browser-fixture";
import controller, { controller_test } from "../src/controller"

test.beforeEach('Setup fixture', fixture("../Server/static/index.html"))

test("Switch index", test => {
	let indexInitial = controller.getIndex()
	controller.nextIndex()
	let indexAfter = controller.getIndex()

	if(indexAfter == indexInitial + 1)
		test.pass()
})

test("Setting callback", test => {
	let callbackInitial = controller_test.getCallback()
	controller.setCallback(function() {
		console.log("[TEST] Inside callback")
	})
	let callbackAfter= controller_test.getCallback()

	if(callbackAfter != callbackInitial && callbackAfter != null)
		test.pass()
})
