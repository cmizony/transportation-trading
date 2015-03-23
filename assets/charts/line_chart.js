function getLineChart () {
 
	var data = [];
	var width = 800;
	var height = 500;
	var yAxisProperty = "";
 

	var createDate = function (d) {
		var month = parseInt(d.month)-1;
		var year = parseInt(d.year);
		var parseDate = d3.time.format("%m/%d/%Y").parse;

		return parseDate(month+"/1/"+year);
	};

	function my (container) {
 
		setDimensions();
		setupXAxis();
		setupYAxis();
		setupLayout();
		addXAxisLabel();
		addYAxisLabel();
		addLineChartData();
		applyStyle();

		var axisLabelMargin, margin;

		function setDimensions() 
		{
			axisLabelMargin = 15;
			margin = {
				top: 20,
				right: 50,
				bottom: 40,
				left: 30
			};
		}

		var xScale, xAxis ;

		function setupXAxis() 
		{
			xScale = d3.time.scale()
				.range([axisLabelMargin, width - margin.left - margin.right])
				.domain(d3.extent(data, function(d) { return createDate(d); }));

			xAxis = d3.svg.axis()
				.scale(xScale)
				.orient('bottom');
		}

		var yScale, yAxis;

		function setupYAxis() 
		{
			yScale = d3.scale.linear()
				.domain([0, d3.max(data, function(d) { return parseFloat(d[yAxisProperty]) })])
				.range([height - axisLabelMargin - margin.top - margin.bottom, 0]);

			yAxis = d3.svg.axis()
				.scale(yScale)
				.tickFormat(d3.format("d"))
				.orient('left');
		}

		var g;

		function setupLayout() 
		{
			container.select("svg").remove();

			g = container.append('svg')
				.attr('class', 'svg-chart')
				.attr('width', width)
				.attr('height', height)
				.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
		}

		function addXAxisLabel() 
		{
			g.append('g')
				.attr('class', 'x axis ')
				.attr('transform', 'translate(0,' + (height - axisLabelMargin - margin.top - margin.bottom) + ')')
				.call(xAxis)
				.selectAll("text")  
				.style("text-anchor", "end")
				.attr("dx", "-.8em")
				.attr("dy", ".15em")
				.attr("transform", function(d) {
					return "rotate(-65)" 
				});
		}

		function addYAxisLabel() 
		{
			g.append('g')
				.attr('class', 'y axis')
				.attr('transform', 'translate(' + axisLabelMargin + ', 0)')
				.call(yAxis)
				.append('text')
				.attr('class', 'axis-label')
				.attr('transform', 'rotate(-90)')
				.attr('y', -margin.left)
				.attr('x', -(height - margin.top - margin.bottom - axisLabelMargin) / 2)
				.style('text-anchor', 'middle')
				.text("Indexed value (Billion $)");
		}

		function addLineChartData() 
		{
			var line = d3.svg.line()
				.x(function(d) { return xScale(createDate(d)); })
				.y(function(d) { return yScale(parseFloat(d[yAxisProperty])); });

			var transportations = ["truck","pipeline","air","ship","rail"];

			for (var i = 0; i < transportations.length; i++) {
				g.append("path")
					.datum(data.filter(function(d){
						return d.transportation == transportations[i];
					}))
					.attr("class", "line line-"+transportations[i])
					.attr("d", line);
			}

		}

		function applyStyle ()
		{
			g.selectAll('.axis line, path').style({
				'stroke': 'Black',
				'fill': 'none',
				'stroke-width': '1px',
				'shape-rendering':'crispEdges'
			});

			g.selectAll('.y.axis').style({
				'fill': 'black'
			});

			g.selectAll('.x.axis text').style({
				'font-family': 'sans-serif',
				'font-size': '12px'
			});

			g.selectAll('.line').style({
				'stroke-width': '1.5px'
			});
			
			g.selectAll('.line-truck').style({'stroke': 'red'});
			g.selectAll('.line-pipeline').style({'stroke': 'lightgray'});
			g.selectAll('.line-rail').style({'stroke': 'gold'});
			g.selectAll('.line-air').style({'stroke': 'green'});
			g.selectAll('.line-ship').style({'stroke': 'steelblue'});

		}
 
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
			return yAxisProperty;
		}
		yAxisProperty = value;
		return my;
	};
	return my;
}
