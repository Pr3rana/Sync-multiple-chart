var hairLineData = [];
var tooltipData = [];

var xmlhttp = new XMLHttpRequest(),
    json;
var xAxisArray = [];

//ajax call
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        json = JSON.parse(xmlhttp.responseText);
        var dataLen = json.dataSet.length;
        for (var j = 0; j <= dataLen - 1; j++) {
            xAxisArray.push(json.dataSet[j].xdata);

        }
        createChart(json);
    }
};
xmlhttp.open("GET", "projectData.json", true);
xmlhttp.send();

var createChart = function(JSON) //createChart
    {
        this.json = JSON;

        //plotting caption and subCaption
        var div = document.getElementById("top");
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttributeNS(null, "class", "graph1");
        var text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text1.setAttributeNS(null, "x", 68);
        text1.setAttributeNS(null, "y", 30);
        var text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text2.setAttributeNS(null, "x", 30);
        text2.setAttributeNS(null, "y", 55);
        var caption = document.createTextNode(JSON.caption);
        var subCaption = document.createTextNode(JSON.subCaption);
        text1.appendChild(caption);
        text2.appendChild(subCaption);
        svg.appendChild(text1);
        svg.appendChild(text2);
        div.appendChild(svg); //plotting caption and subCaption

        titleOptionLen = json.yAxisName.length;
        var dataLen = json.dataSet.length;

        var yAxisValue2 = [];

        flag1 = 0;

        for (var i = 0; i <= titleOptionLen - 1; i++) {
            var yAxisValue1 = [];
            var yAxisTitle = json.yAxisName[i].yAxis;

            for (var j = 0; j <= dataLen - 1; j++) {
                var yAxisValue = (json.dataSet[j].ydata[i]);
                // if(yAxisValue==="")
                // {
                //  continue;
                // }
                yAxisValue1.push(yAxisValue);



            }
            yAxisValue2.push(yAxisValue1);

            var Max = Math.max.apply(null, yAxisValue1);
            var Min = Math.min.apply(null, yAxisValue1);


            xAxisTitle = JSON.xAxisName;

            flag1++;

            dataOFChart(Max, Min, xAxisArray, yAxisValue2[i], yAxisTitle, i);
        }
        hairLineMove();
        var xAxisValue = xAxisArray;


        function dataOFChart(Max, Min, xAxisArray, yAxisValue2, yAxisTitle, svgIndex) {




            var temp;
            var rangeArray = [];
            var difference;
            var steps;
            var stepsDown = 0;


            var resMax = Max;
            while (resMax > 99) {
                resMax /= 10;
                ++stepsDown;
            }

            var resMin = Math.floor(Min / (Math.pow(10, stepsDown)));




            difference = resMax - resMin;

            if (difference <= 1) {
                steps = 0.2;
            } else if (difference <= 3) {
                steps = 0.5;
            } else if (difference <= 6) {
                steps = 1;
            } else if (difference <= 12) {
                steps = 2;
            } else if (difference <= 20) {
                steps = 4;
            } else if (difference <= 30) {
                steps = 5;
            } else if (difference <= 40) {
                steps = 7;
            } else {
                steps = 10;
            }

            computedMin = Math.floor(resMin / steps) * steps;
            computedMax = Math.ceil(resMax / steps) * steps;

            steps *= Math.pow(10, stepsDown);
            computedMin *= Math.pow(10, stepsDown);
            computedMax *= Math.pow(10, stepsDown);
            temp = computedMin;
            while (temp <= computedMax) {
                rangeArray.push(temp);
                temp += steps;
            }

            // return rangeArray;
            plotChart(rangeArray, xAxisArray, yAxisValue2, yAxisTitle, svgIndex);
        }
        // End getYRange

        //1st stage of chart plotting
        function plotChart(rangeArray, xAxisArray, yAxisValue2, yAxisTitle, svgIndex) {
            var div = document.getElementById("main");

            var svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");

            svg1.setAttributeNS(null, "class", "graph");
            var xLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
            svg1.setAttributeNS(null, "class", "graph");
            xLine.setAttributeNS(null, "stroke", "black");
            xLine.setAttributeNS(null, "x1", 90);
            xLine.setAttributeNS(null, "y1", 540);
            xLine.setAttributeNS(null, "x2", 590);
            xLine.setAttributeNS(null, "y2", 540);
            svg1.appendChild(xLine);
            var yLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
            yLine.setAttributeNS(null, "stroke", "black");
            yLine.setAttributeNS(null, "x1", 90);
            yLine.setAttributeNS(null, "x2", 90);
            yLine.setAttributeNS(null, "y1", 40);
            yLine.setAttributeNS(null, "y2", 540);
            svg1.appendChild(yLine);
            div.appendChild(svg1);
            plotxTick(xAxisArray, svg1, rangeArray, yAxisValue2, yAxisTitle, div, svgIndex);

        }

        function plotxTick(xAxisArray, svg1, rangeArray, yAxisValue2, yAxisTitle, div, svgIndex) {

            for (var i = 0; i <= xAxisArray.length - 1; i++) {
                var xCo_ordinate = (500 / (xAxisArray.length) * (i)) + 90; //for xticks
                var yCo_ordinate = 560; //for xticks

                var xTickValue = document.createElementNS("http://www.w3.org/2000/svg", "text");
                xTickValue.setAttributeNS(null, "x", -330);
                xTickValue.setAttributeNS(null, "y", xCo_ordinate - 265);
                xTickValue.setAttributeNS(null, "transform", "rotate(270 270,0)");
                var x1 = document.createTextNode(xAxisArray[i]);

                var xTick = document.createElementNS("http://www.w3.org/2000/svg", "line");
                xTick.setAttributeNS(null, "stroke", "red");
                xTick.setAttributeNS(null, "x1", xCo_ordinate);
                xTick.setAttributeNS(null, "y1", 540);
                xTick.setAttributeNS(null, "x2", xCo_ordinate);
                xTick.setAttributeNS(null, "y2", 550);

                if (flag1 === titleOptionLen) {

                    xTickValue.appendChild(x1);
                    svg1.appendChild(xTickValue);
                    var xAxisName = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    xAxisName.setAttributeNS(null, "x", 350);
                    xAxisName.setAttributeNS(null, "y", yCo_ordinate + 70);
                    xAxisName.setAttributeNS(null, "class", "labels");
                    var x2 = document.createTextNode(xAxisTitle);
                    xAxisName.appendChild(x2);
                    // svg1.appendChild(rect);
                    svg1.appendChild(xAxisName);
                }

                svg1.appendChild(xTick);
                div.appendChild(svg1);
            }



            plotYTick(rangeArray, svg1, yAxisValue2, xAxisArray, yAxisTitle, div, svgIndex);
        };

        //plotting of xticks


        //plotting of y ticks
        function plotYTick(rangeArray, svg1, yAxisValue2, xAxisArray, yAxisTitle, div, svgIndex) {


            var rangeEstimateGenerator = function(min, max, num) {
                return ((num - min) / (max - min));
            }


            //plotting of yticks
            for (var j = 0; j <= rangeArray.length - 1; j++) {
                var rangeEstimator = rangeEstimateGenerator(Math.min.apply(null, rangeArray), Math.max.apply(null, rangeArray), rangeArray[j]);
                var xCo_ordinate1 = 50; //for yTicks
                var yCo_ordinate1 = 540 - (500 * rangeEstimator); //for y ticks


                //plotting of yticks

                var yTickValue = document.createElementNS("http://www.w3.org/2000/svg", "text");

                yTickValue.setAttributeNS(null, "x", xCo_ordinate1);
                yTickValue.setAttributeNS(null, "y", yCo_ordinate1);
                var yTick = document.createElementNS("http://www.w3.org/2000/svg", "line");
                yTick.setAttributeNS(null, "class", "divLine");
                yTick.setAttributeNS(null, "x1", 85);
                yTick.setAttributeNS(null, "y1", yCo_ordinate1);
                yTick.setAttributeNS(null, "x2", 590);
                yTick.setAttributeNS(null, "y2", yCo_ordinate1);
                var y1 = document.createTextNode(rangeArray[j]);

                yTickValue.appendChild(y1);
                svg1.appendChild(yTick);
                svg1.appendChild(yTickValue);
                div.appendChild(svg1);
            }
            var yAxisName = document.createElementNS("http://www.w3.org/2000/svg", "text");

            yAxisName.setAttributeNS(null, "x", 0);
            yAxisName.setAttributeNS(null, "y", yCo_ordinate1 + 20);
            yAxisName.setAttributeNS(null, "class", "labels");
            var y2 = document.createTextNode(yAxisTitle);
            yAxisName.setAttributeNS(null, "x", -70);
            yAxisName.setAttributeNS(null, "y", xCo_ordinate1 - 300);
            yAxisName.setAttributeNS(null, "transform", "rotate(270 270,0)");
            yAxisName.appendChild(y2);
            // svg1.appendChild(rect);
            svg1.appendChild(yAxisName);
            plotAnchor(svg1, div, yAxisValue2, xAxisArray, rangeArray, svgIndex);
        }



        //plotting of anchors
        function plotAnchor(svg1, div, yAxisValue2, xAxisArray, rangeArray, svgIndex) {

            // console.log(yAxisValue2,"yaxis");
            var rangeEstimateGenerator = function(min, max, num) {
                    return ((num - min) / (max - min));
                }
                // hairLineData= [];
            var flag = 0;

            hairLineData[svgIndex] = {};
            for (var i = 0; i < yAxisValue2.length; i++) {
                var yVal = yAxisValue2[i];

                if (yVal === "") {
                    continue;
                }

                var cx = (500 / (xAxisArray.length) * (i)) + 90; //for x co-ordinate

                var rangeEstimator = rangeEstimateGenerator(Math.min.apply(null, rangeArray), Math.max.apply(null, rangeArray), yAxisValue2[i]);
                //for anchors y co-ordinate
                var cy = (540 - (500 * rangeEstimator));
                if (cx != undefined && cy != undefined) {
                    flag++;
                }




                var tempX = cx;
                var tempY = cy;


                if (flag >= 2) {
                    plotLne(px, py, tempX, tempY, svg1, div, svgIndex);
                }


                var anchor = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
                var x = document.createTextNode(yAxisValue2[i]);
                anchor.setAttributeNS(null, "cx", cx);
                anchor.setAttributeNS(null, "cy", cy);
                anchor.setAttributeNS(null, "r", 4);
                anchor.setAttributeNS(null, "class", "anchor");
                anchor.setAttributeNS(null, "data-value", yAxisValue2[i]);
                title.appendChild(x);
                anchor.appendChild(title);
                svg1.appendChild(anchor);
                div.appendChild(svg1);
                var px = tempX;
                var py = tempY;

                hairLineData[svgIndex][Math.floor(cx)] = [anchor,yAxisValue2[i] ];
            }

        }
    };
// plotting of line beetween anchor points
function plotLne(px, py, tempX, tempY, svg1, div, svgIndex) {
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttributeNS(null, "class", "line");
    line.setAttributeNS(null, "x1", px);
    line.setAttributeNS(null, "y1", py);
    line.setAttributeNS(null, "x2", tempX);
    line.setAttributeNS(null, "y2", tempY);
    svg1.appendChild(line);
    div.appendChild(svg1);
}
// plotting of line beetween anchor points

function hairLineMove() {
    for (var i = 0; i <= document.getElementsByClassName("graph").length - 1; i++) {

        (function(i) {
            var currentSvg = document.getElementsByClassName("graph")[i];


            // // for(var j=0; j<=anchors.length-1;j++){

            // //   var reqAnchor= anchors[j];
            // //   // // console.log(reqAnchor.parentNode);
            // //   //   // console.log(reqAnchor,"reqAnchor");
            // //   //   // console.log(hairLineData,"hairLinesss");

            //   reqAnchor.addEventListener("mousemove",function(e){

            //       var event = new CustomEvent("match",{
            //         detail:{ "mousePos":e.clientX,"anchorsData":hairLineData} 
            //       });

            //    document.dispatchEvent(event);   
            //   });

            currentSvg.addEventListener("mousemove", function(event) {
                // console.log("mouseenter fired");
                var anchors = currentSvg.getElementsByClassName("anchor");
                // console.log(anchors,"anchor")
                var event = new CustomEvent("draw", {
                    detail: event.clientX
                });
                document.dispatchEvent(event);
            });
            currentSvg.addEventListener("mouseout", function(e) {
                var event = new CustomEvent("draw", {
                    detail: -1000
                });
                document.dispatchEvent(event);
            });
            document.addEventListener("draw", function(event) {
                drawLine(currentSvg, event, i);
                drawToolTip(event.detail, currentSvg, i);
            });


        })(i);

    }
};

var hairLine = [];


function drawLine(svg, event, i) {

    if (hairLine[i] === undefined) {
        hairLine[i] = document.createElementNS("http://www.w3.org/2000/svg", "line");
        svg.appendChild(hairLine[i]);
    }


    hairLine[i].setAttributeNS(null, "x1", event.detail - 105);
    hairLine[i].setAttributeNS(null, "x2", event.detail - 105);
    hairLine[i].setAttributeNS(null, "y1", 40);
    hairLine[i].setAttributeNS(null, "y2", 540);
    hairLine[i].setAttributeNS(null, "stroke", "red");

    // document.dispatchEvent(event);
};
  var cumulativeOffset = function(element) {
      var top = 0, left = 0;
      do {
          top += element.offsetTop  || 0;
          left += element.offsetLeft || 0;
          element = element.offsetParent;
      } while(element);

      return {
          top: top,
          left: left
      };
  };


function drawToolTip(mousePos, svg, svgIndex) {

        // // console.log(event.detail.mousePos-100,"mousePos");       
        /*if ((event.detail.mousePos - 106) === Math.round(event.detail.anchorsData[j].cx1)) {

            var toolTip = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            toolTip.setAttributeNS(null, "stroke", "black");
            toolTip.setAttributeNS(null, "height", 50);
            toolTip.setAttributeNS(null, "width", 50);
            toolTip.setAttributeNS(null, "x", (Math.round(event.detail.anchorsData[j].cx1)));
            toolTip.setAttributeNS(null, "y", 200);
            svg.appendChild(toolTip);
        }*/

        if(tooltipData[svgIndex] === undefined){
          tooltipData[svgIndex] = document.createElement("div");
          document.body.appendChild(tooltipData[svgIndex]);
        }


        
        console.log(svgIndex, "hey", (cumulativeOffset(svg).top))


        for(var k = Math.floor(mousePos) - 5; k < Math.floor(mousePos) + 5; ++k){
          if(hairLineData[svgIndex][k - 106]){
            var style = "position:absolute;top:" + (svgIndex * 700 +380) + "px;left:";
            style += (mousePos + 20) + "px;";
            tooltipData[svgIndex].setAttribute("style", style);
            tooltipData[svgIndex].setAttribute("class", "tooltip");
            tooltipData[svgIndex].innerHTML = hairLineData[svgIndex][k - 106][1]; 
            console.log(hairLineData[svgIndex], k - 106, "hey")
          }  
        }
    }