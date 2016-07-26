//setting up the chart








window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};





var check = window.mobileAndTabletcheck();


var margin = {top: 30, left:50, bottom:20, right:20};

var w = 500 - margin.left - margin.right;

var h = 700 - margin.top - margin.bottom;


if(check){
var w = 400 - margin.left - margin.right;

var h = 535 - margin.top - margin.bottom;

}

var chartSVG = d3.select("#chart").append("svg")
	.attr("width",w+margin.left+margin.right)
	.attr("height", h+margin.top+margin.bottom)

var chartWrapper = chartSVG.append("g")
							.attr("width",w)
							.attr("height",h)
							.attr("transform","translate("+margin.left+","+margin.top+")")



//tooltip for chart

var chartTool= function(d){
		$(this).popover({
		 placement: "auto top",
		container:"#chart",
		 trigger: "manual",
		 html: true,
		 content: function(){ return "Player: "+d.Player_F+" " +d.Player_L+"<br> Old Team: " +d.OTm+"</br> New Team: " +d.NTm+"<br> Contract : " +d.Terms+ " for " +d.Dollars+"M</br>WS Last Year: "+d.WS}
		 
		
		});

         $(this).popover('show');
         
        
};


var chartToolOut= function(d){

$('.popover').each(function() {
		 		$(this).remove()})





};










//setting up the chord diagram

var outerRadius = 700/2;
var innerRadius = outerRadius-100;

if(check){

 outerRadius = 500/2;
 innerRadius = outerRadius-100;


}

//the color scale
var fill = d3.scale.ordinal()
				.domain(d3.range(30))
				.range(["#ff0000","#009900","#d3d3d3","#00848e","#ff0000","#860038","#006bb6","#5190CA","#fa002c",
				"#ffcc33","#CD212B","#fec23e","#003da7","#552583","#5D76A9","#98002e","#00471b","#2b6291","#0c2340",
				"#f58426","#1b95e0","#0077c0","#005abb","#383838","#CC0000","#5a2e80","#959191","#88704c","#1B2C5B",
				"#000040"])


//init chord layout


function getDefaultLayout(){

return d3.layout.chord()
			.padding(.04)
			.sortSubgroups(d3.decending)
			.sortChords(d3.decending)};


var chord= getDefaultLayout()


var svg = d3.select("#chord")
	.append("svg")
	.attr('height',outerRadius*2 )
	.attr("width",outerRadius*2);
	
	var chordWrapper= svg.append("g")
					.attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
	
//init arc and chords

var arc = d3.svg.arc()
				.outerRadius(innerRadius+20)
				.innerRadius(innerRadius)
					
var chordLayout = d3.svg.chord()
					.radius(innerRadius);
	

//update function

function updateChord(data){
 
var chord= getDefaultLayout();
 		  chord.matrix(data); 			
 				
	 chordWrapper.selectAll(".group path")
		.data(chord.groups)
		.transition("groupUdate")
		.duration(1500)
		.attr("d",arc)
		.style("fill",function(d){ return fill(d.index)})
		.style("stroke", function(d) { return d3.rgb(fill(d.index)).darker(2); })
		
		
		

		
		chordWrapper.selectAll(".group text")
		.data(chord.groups)
		.transition("textUpdate")
		.duration(1500)
	.each(function(d){d.angle= (d.startAngle+d.endAngle)/2;})
	.attr("dy",".35em")
	.attr("transform", function(d) {
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
            + "translate(" + (innerRadius + 26) + ")"
            + (d.angle > Math.PI ? "rotate(180)" : "");
      })
      .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
      .text(function(d) { return teamArray[d.index]; })
     




var newChords =chordWrapper.selectAll(".chord path")
		.data(chord.chords)
		
		
		newChords.transition("chordUpdate")
		.duration(1500)
		.style("fill",function(d){ return fill(d.source.index)})
		.style("stroke", function(d) { return d3.rgb(fill(d.source.index)).darker(2); })
		.style("opacity",0.75)
		.attr("d",chordLayout);




}






//array of all team names for labeling

// object used for data to calculate total dollars spent and net win share in free agency
//will later be used for a d3 array where teames will be teams
teams={'ATL':{"ws":0,"dollars":0},'BOS':{"ws":0,"dollars":0},'BRK':{"ws":0,"dollars":0},'CHO':{"ws":0,"dollars":0},
'CHI':{"ws":0,"dollars":0},'CLE':{"ws":0,"dollars":0},'DAL':{"ws":0,"dollars":0},'DEN':{"ws":0,"dollars":0},
      'DET':{"ws":0,"dollars":0},'GSW':{"ws":0,"dollars":0}, 'HOU':{"ws":0,"dollars":0},'IND':{"ws":0,"dollars":0},
       'LAC':{"ws":0,"dollars":0},'LAL':{"ws":0,"dollars":0},'MEM':{"ws":0,"dollars":0},'MIA':{"ws":0,"dollars":0},
       'MIL':{"ws":0,"dollars":0},'MIN':{"ws":0,"dollars":0},'NOP':{"ws":0,"dollars":0},'NYK':{"ws":0,"dollars":0},
        'OKC':{"ws":0,"dollars":0},'ORL':{"ws":0,"dollars":0},'PHI':{"ws":0,"dollars":0},'PHO':{"ws":0,"dollars":0},'POR':{"ws":0,"dollars":0},
        'SAC':{"ws":0,"dollars":0},'SAS':{"ws":0,"dollars":0},'TOR':{"ws":0,"dollars":0},'UTA':{"ws":0,"dollars":0},
      'WAS':{"ws":0,"dollars":0}}

//getting the data


//used for making matrix and etc
var teamArray=['ATL','BOS','BRK','CHA','CHI','CLE','DAL','DEN',
      'DET','GSW', 'HOU','IND', 'LAC','LAL','MEM','MIA','MIL',
      'MIN','NOP','NYK', 'OKC','ORL','PHI','PHO','POR','SAC','SAS','TOR','UTA',
      'WAS']
      
// a teamIndex that matches and index number starting at zero to a team name ie( "ATL":0.....      
var teamIndex={};

for(var i =0; i<30; i++){
	teamIndex[teamArray[i]]=i

}

//initializing data variable so data is global once called
var data;

//making the matrix for the chord diagram
//init chord Matrix

var chordMatrix=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
var chordMatrixWS=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]

for(var i =0; i<30; i++){
 for(var j=0; j<30; j++){
				chordMatrix[i].push(0);
				chordMatrixWS[i].push(0);
};

};



//fadeout function

function fade(opacity) {
   return function(g, i) {
     svg.selectAll("g.chord path")
         .filter(function(d) {
           return d.source.index != i && d.target.index != i;
         })
       .transition("fade")
         .style("opacity", opacity);
   };
 }

// chord key

function chordKey(data) {
    return (data.source.index < data.target.index) ?
        data.source.index  + "-" + data.target.index:
        data.target.index  + "-" + data.source.index;

    //create a key that will represent the relationship
    //between these two groups *regardless*
    //of which group is called 'source' and which 'target'
}

//getting the data;


d3.csv("Data/freeAgencyData.csv", function(error, csv){
		if(error){
		alert("there was an error getting the data");
		
		}
		data=csv;
	

//filling the matrix with data from the csv	for the chord diagram
 for(var i = 0; i<data.length; i++){
  
  	chordMatrix[teamIndex[data[i]["NTm"]]][teamIndex[data[i]["OTm"]]]+=parseFloat(data[i].Dollars);
	chordMatrixWS[teamIndex[data[i]["NTm"]]][teamIndex[data[i]["OTm"]]]+=parseFloat(data[i].WS);
};		

//joining chord with matrix

chord.matrix(chordMatrix)







//making the chord diagram



					
					
var g = chordWrapper.selectAll(".group")
		.data(chord.groups, function(d) {return d.index})
		.enter()
		.append("g")
		.attr("class","group")
		
		g.append("path")
		.style("fill",function(d){ return fill(d.index)})
		.style("stroke", function(d) { return d3.rgb(fill(d.index)).darker(2); })
		.attr("d",arc)
		.on("mouseover", fade(.01))
		.on("mouseout", fade(0.75));
		
		g.append("text")
	.each(function(d){d.angle= (d.startAngle+d.endAngle)/2;})
	.attr("dy",".35em")
	.attr("transform", function(d) {
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
            + "translate(" + (innerRadius + 26) + ")"
            + (d.angle > Math.PI ? "rotate(180)" : "");
      })
      .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
      .text(function(d) { return teamArray[d.index]; })
      .attr("class", "text")
      .on("mouseover", fade(.01))
	  .on("mouseout", fade(0.75));;




chordWrapper.selectAll(".chord")
		.data(chord.chords, chordKey)
		.enter()
		.append("g")
		.attr("class","chord")
		.append("path")
		.style("fill",function(d){ return fill(d.source.index)})
		.style("stroke", function(d) { return d3.rgb(fill(d.source.index)).darker(2); })
		.style("opacity",0.75)
		.attr("d",chordLayout);		



//making the chart
//scales
var xScale=d3.scale.linear()
		.domain([0,d3.max(data,function(d){return parseFloat(d.Dollars)})])
		.range([0,w]);

var yScale = d3.scale.ordinal()
				.domain(teamArray)
				.rangePoints([10,h]);
				
				
				
//				
var xAxis=d3.svg.axis()
				.scale(xScale)
				.orient("top");
				
				
var yAxis= d3.svg.axis()
				.scale(yScale)
				.orient("left");

	
chartWrapper.append("g")
			.attr("class","x axis")
			.call(xAxis);
			
chartWrapper.append("g")
			.attr("class","y axis")
			.call(yAxis);

chartWrapper.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("cy", function(d,i){return yScale(d.NTm)})
			.attr("cx", function(d){return xScale(d.Dollars)})
			.attr("r", 2.5)
			.attr("id",function(d){ return d.Player_F+d.Player_L})
			.style("fill", function(d){ return fill(teamIndex[d.NTm])})
			.on("mouseover",chartTool)
			.on("mouseout",chartToolOut);
			
chartWrapper.append("line")
			.attr("class","line")
			.attr({
				"x1":0,
				"x2":0,
				"y1":0,
				"y2":10
			});
if(check){
chartWrapper.append("text")
			.attr("class", "chartText")
			.attr("transform", "translate(225,11)")
			.text("$Dollars (in Millions)")
			
			;


}else{
chartWrapper.append("text")
			.attr("class", "chartText")
			.attr("transform", "translate(335,11)")
			.text("$Dollars (in Millions)")
			
			;}

})



					








//functions for buttons
//Win Share
 function ws(){
 		updateChord(chordMatrixWS);
 		


				
var xScale=d3.scale.linear()
		.domain([0,d3.max(data,function(d){return parseFloat(d.WS)})])
		.range([0,w]);				
				
//				
var xAxis=d3.svg.axis()
				.scale(xScale)
				.orient("top");
				
				


	
chartWrapper.select(".x.axis")
			.transition()
			.duration(1500)
			.call(xAxis);
			


chartWrapper.selectAll("circle")
			.data(data)
            .transition()
            .duration(1500)
			.attr("cx", function(d){return xScale(d.WS)})
			
			
if(check){
chartWrapper.select(".chartText")
			.transition()
			.duration(1500)
			.attr("transform", "translate(260,11)")
			.text("Win Share")
			
			;



}else{

chartWrapper.select(".chartText")
			.transition()
			.duration(1500)
			.attr("transform", "translate(360,11)")
			.text("Win Share")
			
			;
}
 		
}

//Dollars
function dollars(){
		 updateChord(chordMatrix);
		 
 		var xScale=d3.scale.linear()
		.domain([0,d3.max(data,function(d){return parseFloat(d.Dollars)})])
		.range([0,w]);


				
				
				
//				
var xAxis=d3.svg.axis()
				.scale(xScale)
				.orient("top");
				
				


	
chartWrapper.select(".x.axis")
			.transition()
			.duration(1500)
			.call(xAxis);
			


chartWrapper.selectAll("circle")
			.data(data)
            .transition()
            .duration(1500)
			.attr("cx", function(d){return xScale(d.Dollars)})
			
			
if(check){

chartWrapper.select(".chartText")
			.transition()
			.duration(1500)
			.attr("transform", "translate(225,11)")
			.text("$Dollars (in Millions)");




}else{

chartWrapper.select(".chartText")
			.transition()
			.duration(1500)
			.attr("transform", "translate(335,11)")
			.text("$Dollars (in Millions)");
}



}

function reset(){


d3.selectAll("circle").transition().style("opacity",1).attr("r",2).style("stroke",function(d){ return fill(teamIndex[d.NTm])});


}

//search button

function search(){
console.log($('#searchR').val());

var id = "#"+$('#searchR').val();
d3.select(id).transition().attr("r",6).style({"stroke":"black",
												"opacity":1


															});
console.log(d3.select("circle:not(" + id + ")"))
d3.selectAll("circle:not(" + id + ")").transition().style("opacity",0.01);
d3.select("#chart").on("click",reset);
}




