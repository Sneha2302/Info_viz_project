var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    //.tickFormat(formatPercent);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Number of incidents:</strong> <span style='color:red'>" + d.value + "</span>";
  })

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.csv("Final_data.csv", function(error,d) {
  // c=0
  s = [0,0,0,0,0,0,0]
  incident_type =['Assault','Unknown','Gang Wars','Robbery','Felon','Accident', 'Suicide']
  d.incident_type = +d.incident_type
  // d.total = +d.no_of_killed
  for (i = 0;i < d.length; ++i){
    //console.log(d[i]) 
  if (d[i]['event']=='Assault'){
    s[0] = s[0] + 1
  }
  else if(d[i]['event']=='Unknown'){
    s[1] = s[1] + 1
  }
  else if(d[i]['event']=='Gang Wars'){
    s[2] = s[2] + 1
  }
  else if(d[i]['event']=='Robbery'){
    s[3] = s[3] + 1
  }
  else if(d[i]['event']=='Felon'){
    s[4] = s[4] + 1
  }
  else if(d[i]['event']=='Accident'){
    s[5] = s[5] + 1
  }
  else if(d[i]['event']=='Suicide'){
    s[6] = s[6] + 1
  }
  else{
    s[7]= s[7] + 1
  }
  }
  // for (i = 1, t = 0; i < columns.length; ++i) 
  //   t += d[columns[i]] = +d[columns[i]];
  // d.total = t;
  console.log(d[1])
  //var data =[{'incident_type':'','value':''}]
  //for(i=0;i<s.length;i++){
  //  data[i]['incident_type']=incident_type[i]
  //  data[i]['value']=s[i]
  //}
  var data = [{'incident_type':'Assault','value':s[0]},{'incident_type':'Unknown','value':s[1]},{'incident_type':'Gang Wars','value':s[2]},
  {'incident_type':'Robbery','value':s[3]},{'incident_type':'Felon','value':s[4]},{'incident_type':'Accident','value':s[5]},{'incident_type':'Suicide','value':s[6]}];
  
  console.log(data[1])
  x.domain(incident_type);
  y.domain([0, 150000]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("No of incidents");

  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.incident_type); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

  //console.log(typeof(data))
}
)