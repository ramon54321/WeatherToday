!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=0,o=null;function i(){console.log("[DEBUG] Index changed to "+a),$(".bubble").removeClass("active"),$("#bubble_"+a).addClass("active"),null==o?console.log("[ERROR] No callback assigned to onIndexChange in 'controller'"):o(a)}var u={setCallback:function(e){o=e},setIndex:function(e){e>4||e<0||(a=e,i())},nextIndex:function(){4==a?a=0:a+=1,i()},previousIndex:function(){0==a?a=4:a-=1,i()},getIndex:function(){return a}};t.default=u},function(e,t,n){"use strict";var a=u(n(0)),o=u(n(2)),i=u(n(3));function u(e){return e&&e.__esModule?e:{default:e}}a.default.setCallback(i.default.updateVueData),$("#arrow_left").click(a.default.previousIndex),$("#arrow_right").click(a.default.nextIndex),$("#add").click(i.default.addNewTemperature),$("#blockListButton").click(function(){var e=$("#blockListButton").text();fetch("api/temperature/"+i.default.getLocation()).then(function(e){return e.json()}).then(function(t){i.default.setRecords(t),$("#blockListButton").text(e),o.default.fadeOut("#viewMain",400),o.default.fadeIn("#viewList",400)}),$("#blockListButton").text("loading")}),$("#viewList").click(function(){o.default.fadeOut("#viewList",400),o.default.fadeIn("#viewMain",400)}),$(document).ready(function(){o.default.fadeIn("#viewLoading",400),fetch("api/temperature").then(function(e){return e.json()}).then(function(e){i.default.setData(e),o.default.fadeOut("#viewLoading",400),o.default.fadeIn("#viewMain",400),a.default.setIndex(0)})})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={fadeIn:function(e,t){$(e).removeClass("hidden"),$(e).addClass("shown"),$(e).css("opacity",0),$(e).animate({opacity:"1"},t)},fadeOut:function(e,t){$(e).css("opacity",1),$(e).animate({opacity:"0"},t,"swing",function(){$(e).removeClass("shown"),$(e).addClass("hidden")})}};t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,o=n(0),i=(a=o)&&a.__esModule?a:{default:a};var u=[],r=[],d={location:"",latest:"",min:"",max:"",records:[{time:"33:41",temperature:23},{time:"43:41",temperature:24},{time:"53:41",temperature:25},{time:"63:41",temperature:26},{time:"73:41",temperature:27}]},l=(new Vue({el:"#app",data:d}),{addNewTemperature:function(){var e=d.location,t=$("#temperatureInput").val();if(null!=e&&void 0!=e){if(null==t||void 0==t||""==t)return console.log("[WARNING] The temperature is null, undefined or empty -> Not adding observation"),void $("#temperatureInput").addClass("invalid");if(t<-50||t>60)return console.log("[WARNING] The temperature is out of a reasonable range (-50 -> 60) -> Not adding observation"),void $("#temperatureInput").addClass("invalid");fetch("api/temperature",{method:"POST",body:JSON.stringify({location:e,temperature:t}),headers:new Headers({"Content-Type":"application/json"})}).then(function(n){console.log("[INFO] Completed POST to server with temperature "+t+" at location "+e)}),$("#add").unbind("click"),$("#add").addClass("disabled"),$("#temperatureInput").removeClass("invalid"),$("#slideBottomText").text("ADDED");var n=i.default.getIndex();u[n].latest=t,t<u[n].min&&(u[n].min=t),t>u[n].max&&(u[n].max=t),l.updateVueData(n)}else console.log("[WARNING] The location is null or undefined -> Not adding observation")},updateVueData:function(e){d.location=u[e].location,d.latest=u[e].latest,d.min=u[e].min,d.max=u[e].max,d.records=r},setData:function(e){u=e},setRecords:function(e){r=e,d.records=r},getLocation:function(){return d.location}});t.default=l}]);