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
        var h2 = document.createElement("h2");
        var h3 = document.createElement("h3");
        div.setAttributeNS(null, "class", "heading");

        var caption = document.createTextNode(JSON.caption);
        var subCaption = document.createTextNode(JSON.subCaption);
        h2.appendChild(caption);
        h3.appendChild(subCaption);

        div.appendChild(h2);
        div.appendChild(h3); //plotting caption and subCaption


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

            dataOFChart(Max, Min, xAxisArray, yAxisValue2[i], yAxisTitle, i,json);
        }
        hairLineMove(json);
        var xAxisValue = xAxisArray;


        function dataOFChart(Max, Min, xAxisArray, yAxisValue2, yAxisTitle, svgIndex,json) {




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
            plotChart(rangeArray, xAxisArray, yAxisValue2, yAxisTitle, svgIndex,json);
        }
        // End getYRange

        //1st stage of chart plotting
        function plotChart(rangeArray, xAxisArray, yAxisValue2, yAxisTitle, svgIndex,json) {
                
                var div = document.getElementById("main");
            
            
            // if (json.width=="" || json.height==="") {
            //         var svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            //         var outerRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            //         outerRect.setAttributeNS(null, "class", "outerRect");
            //         outerRect.setAttributeNS(null, "width", 500);
            //         outerRect.setAttributeNS(null, "height", 500);
            //         outerRect.setAttributeNS(null, "x", 90);
            //         outerRect.setAttributeNS(null, "y", 40);
            //         outerRect.setAttributeNS(null, "stroke", "black");
            //         outerRect.setAttributeNS(null, "opacity", .5);
            //         outerRect.setAttributeNS(null, "stroke-width", .5);

            //         svg1.setAttributeNS(null, "class", "graph");
            //          svg1.setAttributeNS(null, "width", json.width + (json.width*30)/100);
            //           svg1.setAttributeNS(null, "height", json.height + (json.height*20)/100);
            //         var xLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
                   
            //         xLine.setAttributeNS(null, "stroke", "black");
            //         xLine.setAttributeNS(null, "x1", 90);
            //         xLine.setAttributeNS(null, "y1", 540);
            //         xLine.setAttributeNS(null, "x2", 590);
            //         xLine.setAttributeNS(null, "y2", 540);
            //         outerRect.appendChild(xLine);
            //         var yLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
            //         yLine.setAttributeNS(null, "stroke", "black");
            //         yLine.setAttributeNS(null, "x1", 90);
            //         yLine.setAttributeNS(null, "x2", 90);
            //         yLine.setAttributeNS(null, "y1", 40);
            //         yLine.setAttributeNS(null, "y2", 540);
            //         outerRect.appendChild(yLine);
            //         svg1.appendChild(outerRect);
            //         div.appendChild(svg1);
            //         plotxTick(xAxisArray, svg1, rangeArray, yAxisValue2, yAxisTitle, div, svgIndex);
            // } 
            // else {
                var width=json.width;
                var height=json.height;
                var x1= (width*20)/100;
                console.log(x1,"x1");
                var y1= (height*10)/100;

                    var svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    var outerRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                    outerRect.setAttributeNS(null, "class", "outerRect");
                    outerRect.setAttributeNS(null, "width", width);
                    outerRect.setAttributeNS(null, "height", height);
                    outerRect.setAttributeNS(null, "x", x1);
                    outerRect.setAttributeNS(null, "y", y1);
                    outerRect.setAttributeNS(null, "stroke", "black");
                    outerRect.setAttributeNS(null, "opacity", .5);
                    outerRect.setAttributeNS(null, "stroke-width", .5);

                    svg1.setAttributeNS(null, "class", "graph");
                    svg1.setAttributeNS(null, "width", json.width + (json.width*30)/100);
                    svg1.setAttributeNS(null, "height", json.height + (json.height*30)/100);
                    var xLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
                   
                    xLine.setAttributeNS(null, "stroke", "black");
                    xLine.setAttributeNS(null, "x1", x1);
                    xLine.setAttributeNS(null, "y1", height+y1);
                    xLine.setAttributeNS(null, "x2", width+x1);
                    xLine.setAttributeNS(null, "y2", height+y1);
                    outerRect.appendChild(xLine);
                    var yLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    yLine.setAttributeNS(null, "stroke", "black");
                    yLine.setAttributeNS(null, "x1", x1);
                    yLine.setAttributeNS(null, "x2", x1);
                    yLine.setAttributeNS(null, "y1", y1);
                    yLine.setAttributeNS(null, "y2", height+y1);
                    outerRect.appendChild(yLine);
                    svg1.appendChild(outerRect);
                    div.appendChild(svg1);
                    plotxTick(xAxisArray, svg1, rangeArray, yAxisValue2, yAxisTitle, div, svgIndex,json);
            
        }

        function plotxTick(xAxisArray, svg1, rangeArray, yAxisValue2, yAxisTitle, div, svgIndex,json) {

            for (var i = 0; i <= xAxisArray.length - 1; i++) {
                
                var xCo_ordinate = (json.width / (xAxisArray.length) * (i)) + (json.width*20)/100; //for xticks
                var yCo_ordinate = json.height+(json.height*10)/100; //for xticks

                var xTickValue = document.createElementNS("http://www.w3.org/2000/svg", "text");
                xTickValue.setAttributeNS(null, "x", xCo_ordinate);
                xTickValue.setAttributeNS(null, "y", json.height+(json.height*30)/100);
                xTickValue.setAttributeNS(null, "transform", "rotate(270 " + xCo_ordinate +  "," + ((json.height*130)/100) + ")");
                var x1 = document.createTextNode(xAxisArray[i]);

                var xTick = document.createElementNS("http://www.w3.org/2000/svg", "line");
                xTick.setAttributeNS(null, "stroke", "black");
                xTick.setAttributeNS(null, "stroke-width", .5);
                xTick.setAttributeNS(null, "opacity", .8);

                xTick.setAttributeNS(null, "x1", xCo_ordinate);
                xTick.setAttributeNS(null, "y1", yCo_ordinate);
                xTick.setAttributeNS(null, "x2", xCo_ordinate);
                xTick.setAttributeNS(null, "y2",yCo_ordinate+10);

                if (flag1 === titleOptionLen) {

                    xTickValue.appendChild(x1);
                    svg1.appendChild(xTickValue);
                    var xAxisName = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    xAxisName.setAttributeNS(null, "class", "labels");
                    xAxisName.setAttributeNS(null, "x",(json.width)/2);
                    xAxisName.setAttributeNS(null, "y", json.height+(json.height*35)/100);
                    var x2 = document.createTextNode(xAxisTitle);
                    xAxisName.appendChild(x2);
                    svg1.appendChild(xAxisName);
                }

                svg1.appendChild(xTick);
                div.appendChild(svg1);
            }



            plotYTick(rangeArray, svg1, yAxisValue2, xAxisArray, yAxisTitle, div, svgIndex,json);
        };

        //plotting of xticks


        //plotting of y ticks
        function plotYTick(rangeArray, svg1, yAxisValue2, xAxisArray, yAxisTitle, div, svgIndex,json) {


            var rangeFinder = function(min, max, num) {
                return ((num - min) / (max - min));
            }

              
            //plotting of yticks
            for (var j = 0; j <= rangeArray.length - 1; j++) {
                var rangeCalculator = rangeFinder(Math.min.apply(null, rangeArray), Math.max.apply(null, rangeArray), rangeArray[j]);
                var xCo_ordinate1 = (json.width*20)/100; //for yTicks
                var yCo_ordinate1 = ((json.height)+(json.height*10)/100) - (json.height * rangeCalculator); //for y ticks

                //plotting of yticks
                 var height = Math.round(json.height / (rangeArray.length-1) );
                console.log(yCo_ordinate1);
                var yCo_ordinateForInnerRect =(json.height * rangeCalculator);

                var yTickValue = document.createElementNS("http://www.w3.org/2000/svg", "text");
                yTickValue.setAttributeNS(null, "x", xCo_ordinate1 - (json.width*10)/100 );
                yTickValue.setAttributeNS(null, "y", yCo_ordinate1);
                


                if(j<=rangeArray.length-2){
                    var innerRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                    innerRect.setAttributeNS(null,"class","innerRect");
                    innerRect.setAttributeNS(null,"width",json.width);
                    innerRect.setAttributeNS(null,"height",height);
                    innerRect.setAttributeNS(null,"x",(json.width*20)/100);
                    innerRect.setAttributeNS(null,"y",(yCo_ordinateForInnerRect+(json.height*10)/100) );
                        if(j%2===0){
                            innerRect.setAttributeNS(null,"stroke","black");
                            innerRect.setAttributeNS(null,"fill","white");
                            innerRect.setAttributeNS(null,"stroke-width",3);
                            innerRect.setAttributeNS(null,"opacity", .08);
                        
                        }
                        else{
                            innerRect.setAttributeNS(null,"stroke","black");
                            innerRect.setAttributeNS(null,"stroke-width",3);
                            innerRect.setAttributeNS(null,"opacity", .05);
                        }

                         // outerRect.appendChild(innerRect);
                         svg1.appendChild(innerRect);
                         div.appendChild(svg1);
                         
                }


                var yTick = document.createElementNS("http://www.w3.org/2000/svg", "line");
                yTick.setAttributeNS(null, "class", "divLine");
                yTick.setAttributeNS(null, "x1", ((json.height*20)/100)-10 );
                yTick.setAttributeNS(null, "y1", yCo_ordinate1);
                yTick.setAttributeNS(null, "x2",(json.height*20)/100 );
                yTick.setAttributeNS(null, "y2", yCo_ordinate1);
                var y1 = document.createTextNode(rangeArray[j]);
                yTickValue.appendChild(y1);
                svg1.appendChild(yTick);
                svg1.appendChild(yTickValue);
                div.appendChild(svg1);
            }
            var yAxisName = document.createElementNS("http://www.w3.org/2000/svg", "text");
            yAxisName.setAttributeNS(null, "class", "labels");
            var y2 = document.createTextNode(yAxisTitle);
            yAxisName.setAttributeNS(null, "x", 12);
            yAxisName.setAttributeNS(null, "y", (json.width*80)/100);
            yAxisName.setAttributeNS(null, "transform", "rotate(270 12," + ((json.width*80)/100) + ")");
            yAxisName.appendChild(y2);
            // svg1.appendChild(rect);
            svg1.appendChild(yAxisName);
            plotAnchor(svg1, div, yAxisValue2, xAxisArray, rangeArray, svgIndex,json);
        }



        //plotting of anchors
        function plotAnchor(svg1, div, yAxisValue2, xAxisArray, rangeArray, svgIndex,json) {

            // console.log(yAxisValue2,"yaxis");
            var rangeFinder = function(min, max, num) {
                return ((num - min) / (max - min));
            }

            var flag = 0;

            hairLineData[svgIndex] = {};

            for (var i = 0; i < yAxisValue2.length; i++) {
                var yVal = yAxisValue2[i];

                if (yVal === "") {
                    continue;
                }

                var cx = ((json.width) / (xAxisArray.length) * (i) + (json.width*20)/100); //for x co-ordinate

                var rangeCalculator = rangeFinder(Math.min.apply(null, rangeArray), Math.max.apply(null, rangeArray), yAxisValue2[i]);
                //for anchors y co-ordinate
                var cy = (json.height + (json.height*10)/100 - ((json.height) * rangeCalculator));
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
                anchor.setAttributeNS(null, "r", 5.5);
                anchor.setAttributeNS(null, "class", "anchor");
                anchor.setAttributeNS(null, "data-value", yAxisValue2[i]);
                title.appendChild(x);
                anchor.appendChild(title);
                svg1.appendChild(anchor);
                div.appendChild(svg1);
                var px = tempX;
                var py = tempY;

                hairLineData[svgIndex][Math.floor(cx)] = [anchor, yAxisValue2[i]];
                console.log(hairLineData[svgIndex][Math.floor(cx)], "check");
            }

        }
        console.log(hairLineData, "index");
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

function hairLineMove(json) {
    for (var i = 0; i <= document.getElementsByClassName("graph").length - 1; i++) {

        (function(i) {
            var currentSvg = document.getElementsByClassName("graph")[i];
            
            var offset = currentSvg.getBoundingClientRect().left;
            console.log(offset,"offset");
            currentSvg.addEventListener("mousemove", function(event) {
               
                var anchors = currentSvg.getElementsByClassName("anchor");
                
                var event = new CustomEvent("draw", {
                    detail: event.clientX - offset
                });
                document.dispatchEvent(event);
            });
            currentSvg.addEventListener("mouseout", function(e) {
                var event = new CustomEvent("draw", {
                    detail: -1
                });
                document.dispatchEvent(event);
            });
            document.addEventListener("draw", function(event) {
                drawLine(currentSvg, event, i,json);
                drawToolTip(event.detail, currentSvg, i,json);
            });


        })(i);

    }
};

var hairLine = [];


function drawLine(svg, event, i, json) {


    var width=json.width;
    var height=json.height;
    var x1= (width*20)/100;
    console.log(x1,"x1");
    var y1= (height*10)/100;

    if (hairLine[i] === undefined) {
        hairLine[i] = document.createElementNS("http://www.w3.org/2000/svg", "line");
        svg.appendChild(hairLine[i]);
    }

    if(event.detail <= x1 || event.detail >= json.width + x1){
         svg.removeChild(hairLine[i]);
         hairLine[i] = undefined;
    } else {
        hairLine[i].setAttributeNS(null, "x1", event.detail );
        hairLine[i].setAttributeNS(null, "x2", event.detail );
        hairLine[i].setAttributeNS(null, "y1", (json.height*10)/100);
        hairLine[i].setAttributeNS(null, "y2",json.width + (json.height*10)/100);
        hairLine[i].setAttributeNS(null, "class", "hairLine");
    }



    // document.dispatchEvent(event);
};

function drawToolTip(mousePos, svg, svgIndex ,json) {


    var width=json.width;
    var height=json.height;
    var x1= (width*20)/100;
    console.log(x1,"x1");
    var y1= (height*10)/100;
 var offsetLeft = svg.getBoundingClientRect().left;
 var offsetTop = svg.getBoundingClientRect().top;
console.log(offsetTop,svg,"offsetTop");
    if (tooltipData[svgIndex] === undefined) {
        
            tooltipData[svgIndex] = document.createElement("div");
            document.body.appendChild(tooltipData[svgIndex]);
        
    } else {
        document.body.removeChild(tooltipData[svgIndex]);
        tooltipData[svgIndex] = document.createElement("div");
        document.body.appendChild(tooltipData[svgIndex]);
    }


    for (var k = Math.floor(mousePos) - 1; k < Math.floor(mousePos) + 1; ++k) {
        console.log(hairLineData[svgIndex][k], "hello");
        if (hairLineData[svgIndex][k]) {
            var style = "position:absolute;top:" + (offsetTop) + "px;left:";
            style += (mousePos+offsetLeft) + "px;";
            tooltipData[svgIndex].setAttribute("style", style);
            tooltipData[svgIndex].setAttribute("class", "tooltip");
            tooltipData[svgIndex].innerHTML = hairLineData[svgIndex][k][1];
            console.log(hairLineData[svgIndex],k, "hey")
        }
    }
}