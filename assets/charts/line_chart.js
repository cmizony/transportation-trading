function getLineChart () {
 
	var data = [];
	var width = 800;
	var height = 500;
	var yAxis = "";
 
	function my (container) {
 
		// Remove existing SVG
		container.select("svg").remove();
 
		// Create new SVG
		var svg = container.append("svg")
			.attr("width", width)
			.attr("height", height);
			
		 // TODO Code Chart
		console.log(data); 
 
		return my;
	};
 
	my.data = function (value) {
		if (!arguments.length) {
			return data;
		}
		data = value;
		return my;
	};
 
	my.width = function(value) {
		if (!arguments.length) {
			return width;
		}
		width = value;
		return my;
	};
 
	my.height = function(value) {
		if (!arguments.length) {
			return height;
		}
		height = value;
		return my;
	};
	
	my.yAxis = function(value) {
		if (!arguments.length) {
			return yAxis;
		}
		yAxis = value;
		return my;
	};
	return my;
}
