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
var yAxisTitle1=[];
  for(var i=0;i<=titleOptionLen-1;i++){
      var yAxisTitle=json.yAxisName[i].yAxis;
      yAxisTitle1.push(yAxisTitle);
        console.log(yAxisTitle1);

}
      var  dataLen= json.dataSet.length;
      var yAxisValue1=[];
      var yAxisValue2 = [];
      for(var j=0;j<=(json.dataSet[j].ydata.length)-1;j++){
        var yAxisValue1 = new Array();
        for(var k=0;k<=dataLen-1;k++){
          yAxisValue1.push(json.dataSet[k].ydata[j]);
      console.log(yAxisValue1);

      }
       Max=Math.max.apply(null, yAxisValue1);
       Min= Math.min.apply(null, yAxisValue1);
      noOfticks=Math.round(Max/5);
      console.log(Max,"max");
      yAxisValue2.push(yAxisValue1);
    }
      var  titleOptionLen= json.yAxisName.length;
      for(var i=0;i<=titleOptionLen-1;i++){
        dataOFChart(Max,Min,xAxisArray,yAxisValue2)
      }
      console.log(yAxisValue2);
      console.log(i);


    var xAxisTitle=JSON.xAxisName;
    console.log(xAxisTitle);
    console.log(xAxisArray);
    console.log(yAxisValue2);
};
    function dataOFChart(Max,Min,xAxisArray,yAxisValue2){
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
          console.log(rangeArray,xAxisArray,"rangeArray");
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
             yLine.setAttributeNS(null,"x1",0);
             yLine.setAttributeNS(null,"x2",0);
             yLine.setAttributeNS(null,"y1",0);
             yLine.setAttributeNS(null,"y2",370);
             svg1.appendChild(xLine);
             svg1.setAttributeNS(null,"class","graph");
             xLine.setAttributeNS(null,"stroke","black");
             xLine.setAttributeNS(null,"x1",0);
             xLine.setAttributeNS(null,"y1",370);
             xLine.setAttributeNS(null,"x2",500);
             xLine.setAttributeNS(null,"y2",370);
             svg1.appendChild(yLine);
             div.appendChild(svg1);
             plotTick(xAxisArray,svg1);
           }
           function plotTick(xAxisArray,svg1){
             var div =document.getElementById("main");
             for(var i=0;i<=xAxisArray.length-1;i++){
                 var xCo_ordinate= (600/(xAxisArray.length)*(i));//for xticks
                 var yCo_ordinate=400; //for xticks
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
                 xTick.setAttributeNS(null,"y1",360);
                 xTick.setAttributeNS(null,"x2",xCo_ordinate);
                 xTick.setAttributeNS(null,"y2",380);
                 xTickValue.appendChild(x1);

                 svg1.appendChild(xTickValue);
                 svg1.appendChild(xTick);
                div.appendChild(svg1);
      }
    }
      //plotting of xticks
      // var rangeEstimateGenerator = function(min, max){
      //     return function(num){
      //         return (num - min) / (max - min);
      //     }
      // }
      // var rangeEstimator = rangeEstimateGenerator(Math.min.apply(null,rangeArray), Math.max.apply(null,rangeArray));

        //plotting of yticks
        // for(var j=0;j<=rangeArray.length-1;j++){
        //   var xCo_ordinate1=50; //for yTicks
        //   var yCo_ordinate1=600-(600 * rangeEstimator(rangeArray[j]));//for y ticks
        //   console.log(rangeArray[j]);
        //   console.log(yCo_ordinate1, "kjhjkhkjhk") ;
        //     var g4=document.createElementNS("http://www.w3.org/2000/svg","g");
        //     //plotting of yticks
        //     var svg4 = document.createElementNS("http://www.w3.org/2000/svg","svg");
        //     svg4.setAttributeNS(null,"class","graph");
        //     var yTickValue=document.createElementNS("http://www.w3.org/2000/svg","text");
        //     yTickValue.setAttributeNS(null,"x",xCo_ordinate1-25);
        //     yTickValue.setAttributeNS(null,"y",yCo_ordinate1+5);
        //     var yTick=document.createElementNS("http://www.w3.org/2000/svg","line");
        //     yTick.setAttributeNS(null,"stroke","red");
        //     yTick.setAttributeNS(null,"x1",45);
        //     yTick.setAttributeNS(null,"y1",yCo_ordinate1);
        //     yTick.setAttributeNS(null,"x2",55);
        //     yTick.setAttributeNS(null,"y2",yCo_ordinate1);
        //     var y1=document.createTextNode(rangeArray[j]);
        //     yTickValue.appendChild(y1);
        //     console.log("jhkjhkj");
        //     svg4.appendChild(yTick);
        //     svg4.appendChild(yTickValue);
        //     div.appendChild(svg4);
        //   }
            //plotting of yticks

        //  console.log(x1);
              //  for (var i = 0; i < yAxisValue2.length-1; i++) {
              //    for(var j=0; j<yAxisValue2[i].length-1;j++){
              //    console.log(yAxisValue2);
              //   var yVal=yAxisValue2[i][j];
              //    var cx= (600/(xAxisArray.length)*(i));//for x
              //    var cy=(600*((yAxisValue2[i][j]-Math.min.apply(null,yAxisValue2[i]))/(Math.max.apply(null,yAxisValue2[i])-Math.min.apply(null,yAxisValue2[i]))))*yAxisValue2[i][j];//for xticks
              //    console.log(cx);
              //
              //    var g5=document.createElementNS("http://www.w3.org/2000/svg","g"); //plotting of xticks
              //    g5.setAttributeNS(null,"class","labels x-labels");
              //    g5.setAttribute(null,"class","grid-x-grid");
              //    g5.setAttribute(null,"id","xGrid");
              //    var anchor=document.createElementNS("http://www.w3.org/2000/svg","circle");
              //       anchor.setAttributeNS(null,"stroke","red");
              //       anchor.setAttributeNS(null,"cs",100);
              //       anchor.setAttributeNS(null,"cy",100);
              //       anchor.setAttributeNS(null,"r",8);
              //    g5.appendChild(anchor);
              //   svg.appendChild(anchor);
              //   div.appendChild(svg);
              // };
