var xmlhttp = new XMLHttpRequest(),json;
  var xAxisArray=[];
  // var yAxis1Array=[];
  // var yAxis2Array=[];
  // var yAxis3Array=[];
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
    console.log(yAxisValue2[i],"value");
    var Max=Math.max.apply(null, yAxisValue1);
    var Min= Math.min.apply(null, yAxisValue1);
    var noOfticks=Math.round(Max/5);

    console.log(i,"i");
    dataOFChart(Max,Min,xAxisArray,yAxisValue2[i]);
  }
    var xAxisTitle=JSON.xAxisName;
    console.log(xAxisTitle);
    var xAxisValue =xAxisArray;
    console.log(xAxisValue);
    console.log(yAxisValue2);

    function dataOFChart(Max,Min,xAxisArray,yAxisValue2){

      console.log(yAxisValue2,"yaxis");
      console.log(Min,"min");
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
          console.log(rangeArray,xAxisArray,yAxisValue2,"rangeArray");
      		// return rangeArray;
          plotChart(rangeArray,xAxisArray,yAxisValue2);
      	}
         // End getYRange
         function plotChart(rangeArray,xAxisArray,yAxisValue2){
             var div =document.getElementById("main");
             console.log(div);
             var svg1 = document.createElementNS("http://www.w3.org/2000/svg","svg");
             svg1.setAttributeNS(null,"class","graph");
             var xLine=document.createElementNS("http://www.w3.org/2000/svg","line");
             var yLine=document.createElementNS("http://www.w3.org/2000/svg","line");
             yLine.setAttributeNS(null,"stroke","black");
             yLine.setAttributeNS(null,"x1",40);
             yLine.setAttributeNS(null,"x2",40);
             yLine.setAttributeNS(null,"y1",40);
             yLine.setAttributeNS(null,"y2",540);
             svg1.appendChild(xLine);
             svg1.setAttributeNS(null,"class","graph");
             xLine.setAttributeNS(null,"stroke","black");
             xLine.setAttributeNS(null,"x1",40);
             xLine.setAttributeNS(null,"y1",540);
             xLine.setAttributeNS(null,"x2",540);
             xLine.setAttributeNS(null,"y2",540);
             svg1.appendChild(yLine);
             div.appendChild(svg1);
             plotxTick(xAxisArray,svg1,rangeArray,yAxisValue2);

           }
           function plotxTick(xAxisArray,svg1,rangeArray,yAxisValue2){
             var div =document.getElementById("main");
             for(var i=0;i<=xAxisArray.length-1;i++){
                 var xCo_ordinate= (500/(xAxisArray.length)*(i))+40;//for xticks
                 var yCo_ordinate=560; //for xticks
                 console.log(xCo_ordinate);
                 console.log(yCo_ordinate);

                 var xTickValue=document.createElementNS("http://www.w3.org/2000/svg","text");
                 xTickValue.setAttributeNS(null,"x",xCo_ordinate);
                 xTickValue.setAttributeNS(null,"y",yCo_ordinate);
                 var x1=document.createTextNode(xAxisArray[i]);
                 console.log(xAxisArray);
                 var xTick=document.createElementNS("http://www.w3.org/2000/svg","line");
                  xTick.setAttributeNS(null,"stroke","red");
                 xTick.setAttributeNS(null,"x1",xCo_ordinate);
                 xTick.setAttributeNS(null,"y1",535);
                 xTick.setAttributeNS(null,"x2",xCo_ordinate);
                 xTick.setAttributeNS(null,"y2",550);
                 xTickValue.appendChild(x1);

                 svg1.appendChild(xTickValue);
                 svg1.appendChild(xTick);
                div.appendChild(svg1);
      }
        plotYTick(rangeArray,svg1,yAxisValue2,xAxisArray);
    };

    //plotting of xticks
      function plotYTick(rangeArray,svg1,yAxisValue2,xAxisArray){
        console.log("yplot");

        // return function(num){
        //   rangeEstimateGenerator
        // }

      var rangeEstimateGenerator = function(min, max,num){
        return ((num - min) / (max - min));
      }

        //plotting of yticks
        for(var j=0;j<=rangeArray.length-1;j++){
          var rangeEstimator = rangeEstimateGenerator(Math.min.apply(null,rangeArray), Math.max.apply(null,rangeArray),rangeArray[j]);
          var xCo_ordinate1=0; //for yTicks
          var yCo_ordinate1=540-(500 * rangeEstimator);//for y ticks

          console.log(rangeArray[j]);
          console.log(yCo_ordinate1, "kjhjkhkjhk") ;
            //plotting of yticks
            var div =document.getElementById("main");
            var yTickValue=document.createElementNS("http://www.w3.org/2000/svg","text");
            yTickValue.setAttributeNS(null,"x",xCo_ordinate1);
            yTickValue.setAttributeNS(null,"y",yCo_ordinate1);
            var yTick=document.createElementNS("http://www.w3.org/2000/svg","line");
            yTick.setAttributeNS(null,"stroke","blue");
            yTick.setAttributeNS(null,"x1",40);
            yTick.setAttributeNS(null,"y1",yCo_ordinate1);
            yTick.setAttributeNS(null,"x2",500);
            yTick.setAttributeNS(null,"y2",yCo_ordinate1);
            var y1=document.createTextNode(rangeArray[j]);
            yTickValue.appendChild(y1);
            console.log("jhkjhkj");
            svg1.appendChild(yTick);
            svg1.appendChild(yTickValue);
            div.appendChild(svg1);
          }
          plotAnchor(svg1,div,yAxisValue2,xAxisArray);
        }
            //plotting of yticks
            function plotAnchor(svg1,div,yAxisValue2,xAxisArray){

              var rangeEstimateGenerator = function(min, max,num){
                return ((num - min) / (max - min));
              }
               for (var i = 0; i < yAxisValue2.length; i++) {
                var yVal=yAxisValue2[i];
                console.log(yAxisValue2[i],"actualdata");
                 var cx=(500/(xAxisArray.length)*(i))+40;//for x


                   //plotting of yticks

                     var rangeEstimator = rangeEstimateGenerator(Math.min.apply(null,yAxisValue2), Math.max.apply(null,yAxisValue2),yAxisValue2[i]);
                      //for yTicks
                     var cy=(540-(500 *rangeEstimator));
                    //  var min=Math.min.apply(null,yAxisValue2);
                    //  var max=Math.max.apply(null,yAxisValue2);
                    //  var cy = ((yVal-min)/(max-min))*yVal*700;
                 //for xticks
                 console.log(cy,"cy");
                console.log(cx,"cx");
                 var anchor=document.createElementNS("http://www.w3.org/2000/svg","circle");
                    anchor.setAttributeNS(null,"stroke","red");
                    anchor.setAttributeNS(null,"cx",cx);
                    anchor.setAttributeNS(null,"cy",cy);
                    anchor.setAttributeNS(null,"r",4);
                svg1.appendChild(anchor);
                div.appendChild(svg1);
              }
              plotLne(cx,cy,svg1,div);
              }
};

  function plotLne(px,py,svg1,div){
    var polyline =document.createElementNS("http://www.w3.org/2000/svg","polyline");
       anchor.setAttributeNS(null,"stroke","red");
       anchor.setAttributeNS(null,"cx",cx);
       anchor.setAttributeNS(null,"cy",cy);
       anchor.setAttributeNS(null,"r",4);
   svg1.appendChild(anchor);
   div.appendChild(svg1);
  }
