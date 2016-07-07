var xmlhttp = new XMLHttpRequest(),json;
  var xAxisArray=[];

xmlhttp.onreadystatechange = function() {
  if ( xmlhttp.readyState === 4 && xmlhttp.status === 200 ) {
    json = JSON.parse(xmlhttp.responseText);
      var  dataLen= json.dataSet.length;
      for(var j=0;j<=dataLen-1;j++){
        xAxisArray.push(json.dataSet[j].xdata);

    }
      createChart(json);
  }
};
xmlhttp.open("GET", "projectData.json", true);
xmlhttp.send();
var createChart = function(JSON)
{
  this.json=JSON;
  var Caption = JSON.caption;
  console.log(Caption);
  var subCaption=JSON.subCaption;
  console.log(subCaption);
  var  titleOptionLen= json.yAxisName.length;
  var  dataLen= json.dataSet.length;
  console.log(json.yAxisName.length);
var yAxisValue2 = [];
  for(var i=0;i<=titleOptionLen-1;i++){
    var yAxisValue1=[];
    var yAxisTitle=json.yAxisName[i].yAxis;
    console.log(yAxisTitle);
    for(var j=0;j<=dataLen-1;j++){
      var yAxisValue=(json.dataSet[j].ydata[i]);
      console.log(yAxisValue);
      yAxisValue1.push(yAxisValue);
      console.log(yAxisValue1);
    }
    yAxisValue2.push(yAxisValue1);
    // console.log(yAxisValue2[1]);
    // console.log(json);
    var Max=Math.max.apply(null, yAxisValue1);
    var Min= Math.min.apply(null, yAxisValue1);
    var noOfticks=Math.round(Max/5);
    console.log("jhhjjn");
    findTick(Max,Min);
  }
var xAxisTitle=JSON.xAxisName;
console.log(xAxisTitle);
var xAxisValue =xAxisArray;
console.log(xAxisValue);
console.log(yAxisValue2);
};



    function findTick(Max,Min){
      console.log(Min);
      console.log(Max);
          var temp;
          var rangeArray=[];
          var difference;
      		var steps;
          var stepsDown = 0;

        var resMax = Max;
      		while(resMax > 99){
      			resMax /= 10;
      			++stepsDown;
      		}

      		var resMin = Math.floor(Min / (Math.pow(10, stepsDown)));
          console.log(resMin)
          console.log(resMin);

      		difference = resMax - resMin;

      		if(difference <= 1){
      			steps = 0.2;
      		} else if(difference <= 3){
      			steps = 0.5;
      		} else if(difference <= 6){
      			steps = 1;
      		} else if(difference <= 12){
      			steps = 2;
      		} else if(difference <= 20){
      			steps = 4;
      		} else if(difference <= 30){
      			steps = 5;
      		} else if(difference <= 40){
      			steps = 7;
      		} else {
      			steps = 10;
      		}

      		computedMin = Math.floor(resMin / steps) * steps;
      		computedMax = Math.ceil(resMax / steps) * steps;

      		// Step up; Multiplying the value to min-max that was divided before

      		steps *= Math.pow(10, stepsDown);
      		computedMin *= Math.pow(10, stepsDown);
      		computedMax *= Math.pow(10, stepsDown);

      		temp = computedMin;

      		while(temp <= computedMax){
      			rangeArray.push(temp);
      			temp += steps;
      		}
          console.log(rangeArray);
      		return rangeArray;

      	} // End getYRange
