!function(e){var n={};function t(o){if(n[o])return n[o].exports;var a=n[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";var o=i(t(1)),a=i(t(2));function i(e){return e&&e.__esModule?e:{default:e}}var l=[],r={location:"",latest:"",min:"",max:""};new Vue({el:"#app",data:r});function u(e){r.location=l[e].location,r.latest=l[e].latest,r.min=l[e].min,r.max=l[e].max}o.default.setCallback(u),$("#arrow_left").click(o.default.previousIndex),$("#arrow_right").click(o.default.nextIndex),$("#add").click(function(){var e=r.location,n=$("#temperatureInput").val();if(null!=e&&void 0!=e){if(null==n||void 0==n||""==n)return console.log("[WARNING] The temperature is null, undefined or empty -> Not adding observation"),void $("#temperatureInput").addClass("invalid");if(n<-50||n>60)return console.log("[WARNING] The temperature is out of a reasonable range (-50 -> 60) -> Not adding observation"),void $("#temperatureInput").addClass("invalid");fetch("api/temperature",{method:"POST",body:JSON.stringify({location:e,temperature:n}),headers:new Headers({"Content-Type":"application/json"})}).then(function(e){return e.json()}).then(function(t){console.log("[INFO] Completed POST to server with temperature "+n+" at location "+e)}),console.log("disableing"),$("#add").unbind("click"),$("#add").addClass("disabled"),$("#temperatureInput").removeClass("invalid"),$("#slideBottomText").text("ADDED");var t=o.default.getIndex();l[t].latest=n,n<l[t].min&&(l[t].min=n),n>l[t].max&&(l[t].max=n),u(t)}else console.log("[WARNING] The location is null or undefined -> Not adding observation")}),$(document).ready(function(){a.default.fadeIn("#viewLoading",800),fetch("api/temperature").then(function(e){return e.json()}).then(function(e){l=e,a.default.fadeOut("#viewLoading",800),a.default.fadeIn("#viewMain",1200),o.default.setIndex(0)})})},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=0,a=null;function i(){console.log("[DEBUG] Index changed to "+o),$(".bubble").removeClass("active"),$("#bubble_"+o).addClass("active"),null==a?console.log("[ERROR] No callback assigned to onIndexChange in 'controller'"):a(o)}var l={setCallback:function(e){a=e},setIndex:function(e){e>4||e<0||(o=e,i())},nextIndex:function(){4==o?o=0:o+=1,i()},previousIndex:function(){0==o?o=4:o-=1,i()},getIndex:function(){return o}};n.default=l},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o={fadeIn:function(e,n){$(e).removeClass("hidden"),$(e).addClass("shown"),$(e).css("opacity",0),$(e).animate({opacity:"1"},n)},fadeOut:function(e,n){$(e).css("opacity",1),$(e).animate({opacity:"0"},n,"swing",function(){$(e).removeClass("shown"),$(e).addClass("hidden")})}};n.default=o}]);