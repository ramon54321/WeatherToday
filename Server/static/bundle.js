!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var a=i(n(1)),o=i(n(2));function i(e){return e&&e.__esModule?e:{default:e}}var r=[],l={location:"",latest:"",min:"",max:"",records:[{time:"33:41",temperature:23},{time:"43:41",temperature:24},{time:"53:41",temperature:25},{time:"63:41",temperature:26},{time:"73:41",temperature:27}]};new Vue({el:"#app",data:l});function u(e){l.location=r[e].location,l.latest=r[e].latest,l.min=r[e].min,l.max=r[e].max}a.default.setCallback(u),$("#arrow_left").click(a.default.previousIndex),$("#arrow_right").click(a.default.nextIndex),$("#add").click(function(){var e=l.location,t=$("#temperatureInput").val();if(null!=e&&void 0!=e){if(null==t||void 0==t||""==t)return console.log("[WARNING] The temperature is null, undefined or empty -> Not adding observation"),void $("#temperatureInput").addClass("invalid");if(t<-50||t>60)return console.log("[WARNING] The temperature is out of a reasonable range (-50 -> 60) -> Not adding observation"),void $("#temperatureInput").addClass("invalid");fetch("api/temperature",{method:"POST",body:JSON.stringify({location:e,temperature:t}),headers:new Headers({"Content-Type":"application/json"})}).then(function(e){return e.json()}).then(function(n){console.log("[INFO] Completed POST to server with temperature "+t+" at location "+e)}),console.log("disableing"),$("#add").unbind("click"),$("#add").addClass("disabled"),$("#temperatureInput").removeClass("invalid"),$("#slideBottomText").text("ADDED");var n=a.default.getIndex();r[n].latest=t,t<r[n].min&&(r[n].min=t),t>r[n].max&&(r[n].max=t),u(n)}else console.log("[WARNING] The location is null or undefined -> Not adding observation")}),$("#viewList").click(function(){o.default.fadeOut("#viewList",800)}),$("#blockListButton").click(function(){o.default.fadeIn("#viewList",800)}),$(document).ready(function(){o.default.fadeIn("#viewLoading",800),fetch("api/temperature").then(function(e){return e.json()}).then(function(e){r=e,o.default.fadeOut("#viewLoading",800),o.default.fadeIn("#viewMain",1200),a.default.setIndex(0)})})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=0,o=null;function i(){console.log("[DEBUG] Index changed to "+a),$(".bubble").removeClass("active"),$("#bubble_"+a).addClass("active"),null==o?console.log("[ERROR] No callback assigned to onIndexChange in 'controller'"):o(a)}var r={setCallback:function(e){o=e},setIndex:function(e){e>4||e<0||(a=e,i())},nextIndex:function(){4==a?a=0:a+=1,i()},previousIndex:function(){0==a?a=4:a-=1,i()},getIndex:function(){return a}};t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={fadeIn:function(e,t){$(e).removeClass("hidden"),$(e).addClass("shown"),$(e).css("opacity",0),$(e).animate({opacity:"1"},t)},fadeOut:function(e,t){$(e).css("opacity",1),$(e).animate({opacity:"0"},t,"swing",function(){$(e).removeClass("shown"),$(e).addClass("hidden")})}};t.default=a}]);