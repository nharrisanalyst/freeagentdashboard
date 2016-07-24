var controller = new ScrollMagic.Controller();


var scene1 = new ScrollMagic.Scene({
					offset:320,
					triggerElement: "#two"
					



}).addTo(controller)
.on("enter", function(e){

d3.select("#intro").transition().style("visibility","hidden");

})


var scene2 = new ScrollMagic.Scene({
					offset:320,
					triggerElement: "#three"
					



}).addTo(controller)
.on("enter", function(e){

d3.select("#two").transition().style("visibility","hidden");

})

var scene3 = new ScrollMagic.Scene({
					offset:320,
					triggerElement: "#left"
					



}).addTo(controller)
.on("enter", function(e){

d3.select("#three").transition().style("visibility","hidden");

})

var scene4 = new ScrollMagic.Scene({
					offset:320,
					triggerElement: "#right"
					



}).addTo(controller)
.on("enter", function(e){

d3.select("#left").transition().style("visibility","hidden");

})

var scene5 = new ScrollMagic.Scene({
					offset:460,
					triggerElement: "#right"
					



}).addTo(controller)
.on("enter", function(e){

d3.select("#right").transition().style("visibility","hidden");
//removing
d3.select("#intro").transition().remove();
d3.select("#two").transition().remove();
d3.select("#three").transition().remove();
d3.select("#left").transition().remove();
d3.select("#right").transition().remove();
})
