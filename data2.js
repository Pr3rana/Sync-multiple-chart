
;(function(window){
	"use strict";
	var parsing= function(){
		var xmlhttp = new XMLHttpRequest(),json;
		//ajax call
		xmlhttp.onreadystatechange = function() {
    	if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
	        json = JSON.parse(xmlhttp.responseText);
	       
	        if(json.chartType === "line"){
	        var getData  = new requiredData();
	        	getData.prepareXData(json);
	        
	       
	       	 	getData.prepareYData(json,getData.xAxisArray);
	       	 
	       	
	       	 	 getData.prepareMin(getData.yAxisArray);
	       	
	       	
	       	 	 getData.prepareMax(getData.yAxisArray);
	       	
	    
	       		getData.prepareRange(getData.yAxisArray);
	       	 	
	       		getData.xAxisTickPos(getData.yAxisArray);

	       		getData.yAxisTickPos(getData.yAxisArray,getData.mappedData);
	       	
	       		getData.anchorPos(getData.yAxisArray,getData.mappedData);
	       	var mappedData = getData.mappedData;
	       		
	       	var dataSet = getData.yAxisArray;
	       
			var render = new chartRender();
				render.appendSvg(dataSet);
				render.appendXAxis(dataSet);
				render.appendYAxis(dataSet);
				render.appendXTick(mappedData);
				render.appendYTick(mappedData);
				render.appendXLabel(mappedData,dataSet);
				render.plotInnerRect(mappedData,dataSet);
				render.plotLink(mappedData);
				render.appendAnchor(mappedData);
				render.plotOuterRect(dataSet);
				render.appendCaption(dataSet);
				render.appendText(mappedData,dataSet);
				render.appendXLabel(mappedData,dataSet);
			var eventCall = new eventHandlerLine();
				eventCall.addEvent(dataSet,mappedData);
				eventCall.addEvent(dataSet,mappedData);
	        }
	        else if(json.chartType === "column"){
	        	var getData  = new requiredData();
	        	getData.prepareXData(json);
	        
	       
	       	 	getData.prepareYData(json,getData.xAxisArray);
	       	 
	       	
	       	 	 getData.prepareMin(getData.yAxisArray);
	       	
	       	
	       	 	 getData.prepareMax(getData.yAxisArray);
	       	
	    
	       		getData.prepareRange(getData.yAxisArray);
	       	 	
	       		getData.xAxisTickPos(getData.yAxisArray);

	       		getData.yAxisTickPos(getData.yAxisArray,getData.mappedData);
	       		
	       		getData.anchorPos(getData.yAxisArray,getData.mappedData);
	       		var mappedData = getData.mappedData;
	       		
	       		var dataSet = getData.yAxisArray;
	       
				var render = new chartRender();
					render.appendSvg(dataSet);
					render.appendXAxis(dataSet);
					render.appendYAxis(dataSet);
					// render.appendXTick(mappedData);
					render.appendYTick(mappedData);
					render.plotInnerRect(mappedData,dataSet);
					render.appendXLabel(mappedData,dataSet);
					// render.appendAnchor(mappedData);
					render.plotOuterRect(dataSet);
					render.appendCaption(dataSet);
					render.plotColumn(mappedData,dataSet);
					render.appendText(mappedData,dataSet);
				var eventCall = new eventHandlerColumn();
					eventCall.addEvent(dataSet,mappedData);

	        }
	        else{
	        	alert("wrong chart type")
	        }

		    }
		};
		xmlhttp.open("GET", "projectData.json", true);
		xmlhttp.send();
	};
		
		var requiredData = function(){}
			
			requiredData.prototype.prepareXData=function(json){
				this.xAxisArray = [];
			var dataLen = json.dataSet.length;
			  	for (var j = 0; j <= dataLen - 1; j++) {
            		this.xAxisArray.push(json.dataSet[j].xdata);
        		}
			}
	
		
		


			requiredData.prototype.prepareYData = function(json,xAxisArray){
				
			this.yAxisArray = [];
			var titleOptionLen = json.yAxisName.length;
        	var dataLen = json.dataSet.length;
        	this.flag1 = 0;

	        for (var i = 0; i <= titleOptionLen - 1; i++)
	        {
	            this.yAxisValue1 = [];
	            for (var j = 0; j <= dataLen - 1; j++)
	            {
	                var yAxisValue = (json.dataSet[j].ydata[i]);
	                this.yAxisValue1.push(yAxisValue);
	                
	            }
	            
	            var ydata = {};

	            ydata["ydata"]=this.yAxisValue1;
	            this.yAxisArray[i] = (ydata);
	            this.yAxisArray[i].seriesName = json.yAxisName[i].yAxis;
	            this.yAxisArray[i].xdata = xAxisArray;
	            this.yAxisArray[i].width = json.width;
	            this.yAxisArray[i].height = json.height;
	            this.flag1++;
			}
			 this.yAxisArray.caption = json.caption;
	         this.yAxisArray.subCaption = json.subCaption;
		}

	

		requiredData.prototype.prepareMin=function(dataSet)
		{	
			for (var i =0; i <= dataSet.length - 1; i++)
			{
			var val = dataSet[i].ydata;
			
			this.calculateMin=Math.min.apply(null, val);
			dataSet[i].ydataMin= this.calculateMin;
			}
		}
	
	

	
		requiredData.prototype.prepareMax=function(dataSet)
		{
			for (var i =0; i <= dataSet.length - 1; i++)
			{
			var val = dataSet[i].ydata;
			
			this.calculateMax=Math.max.apply(null, val);
			dataSet[i].ydataMax= this.calculateMax;
			}
		}





	
           
        requiredData.prototype.prepareRange=function(dataSet)
            {
		 	var temp;
            	for (var i = 0; i <= dataSet.length - 1; i++) 
            	{
            		 this.rangeArray = [];
	            	var difference;
		            var steps;
		            var stepsDown = 0;
		            var Max = dataSet[i].ydataMax;
		            var Min = dataSet[i].ydataMin;

		            var resMax = Max;
		            while (resMax > 99) {
		                resMax /= 10;
		                ++stepsDown;
		            }

		            var resMin = Math.floor(Min / (Math.pow(10, stepsDown)));
		            difference = resMax - resMin;

		            if(difference <= 0.3){
		            	steps = .05;
		            }
		            else if (difference <= 1) {
		                steps = 0.2;
		            } 
		            else if (difference <= 3) {
		                steps = 0.5;
		            } 
		            else if (difference <= 6) {
		                steps = 1;
		            } 
		            else if (difference <= 12) {
		                steps = 2;
		            }
		             else if (difference <= 20) {
		                steps = 4;
		            }
		             else if (difference <= 30) {
		                steps = 5;
		            }
		             else if (difference <= 40) {
		                steps = 7;
		            } 
		            else {
		                steps = 10;
		            }

		            var computedMin = Math.floor(resMin / steps) * steps;
		            var computedMax = Math.ceil(resMax / steps) * steps;

		            steps *= Math.pow(10, stepsDown);
		            computedMin *= Math.pow(10, stepsDown);
		            computedMax *= Math.pow(10, stepsDown);
		            temp = computedMin;
		            while (temp <= computedMax) {
		                this.rangeArray.push(temp);
		                dataSet[i].range = this.rangeArray;
		                temp += steps;
		            }
		           
            	}
           }
        


   

   		requiredData.prototype.xAxisTickPos= function(dataSet){
   			this.mappedData = [];
			var xTick = {};
			var xTicksPos={};

   			for (var i = 0; i <=dataSet.length - 1; i++)  {
   				var xData = dataSet[i].xdata;
	   			var xPos =[];
	   			var yPos=[];
	   			var width = dataSet[i].width -(dataSet[i].width*30) /100;
                var height = dataSet[i].height -(dataSet[i].width*30)/100;
   				for (var j = 0; j <xData.length; j++) {
   					
   					var xCo_ordinate1 = (width / (xData.length) * (j)) + (width*20)/100; //for xticks
                	var yCo_ordinate1 = height+(height*10)/100; //for xticks
   					xPos.push(xCo_ordinate1);
   					yPos.push(yCo_ordinate1);
				}
				xTick.xPos= xPos;
				xTick.yPos = yPos;
				xTicksPos.xTicks = xTick;
   				this.mappedData.push(xTicksPos);
   			}	

   			
   		}
 

   	
   		requiredData.prototype.yAxisTickPos = function(dataSet,mappedData){

	   			var rangeFinder = function(min, max, num) {
	                return ((num - min) / (max - min));
	            }
            
             var yTickPos = {};
            
            //plotting of yticks
            for (var i = 0; i <= dataSet.length - 1; i++)
            {
            	var rangeArray = dataSet[i].range;
            	var width = dataSet[i].width -(dataSet[i].width*30) /100;
                var height = dataSet[i].height -(dataSet[i].width*30)/100;
            	var yPos = [];
            	var xPos = [];
            	for (var j = 0; j < rangeArray.length; j++)
            	{
            		
                var rangeCalculator = rangeFinder(Math.min.apply(null, rangeArray), Math.max.apply(null, rangeArray), rangeArray[j]);
                var xCo_ordinate1 = (width*20)/100; //for yTicks
                var yCo_ordinate1 = Math.round(((height)+(height*10)/100) - (height * rangeCalculator)); //for y ticks
            		xPos.push(xCo_ordinate1);
            		yPos.push(yCo_ordinate1);
            	}	
            	var yTick ={}; 
            		yTick.xTickPos = xPos;
            		yTick.yTickPos = yPos;
            		yTickPos[i]=yTick;
            		mappedData[i].yTicks= yTickPos ;
                	//plotting of yticks
            }

   		}
 

var tooltipData =[];
 requiredData.prototype.anchorPos = function(dataSet,mappedData){

 		 var rangeFinder = function(min, max, num) {
                return ((num - min) / (max - min));
            }

             var anchorPos = {};

              for (var i = 0; i <= dataSet.length - 1; i++)
            {
            	var rangeArray = dataSet[i].range;
            	tooltipData[i] = {};
            	var width = dataSet[i].width -(dataSet[i].width*30) /100;
                var height = dataSet[i].height -(dataSet[i].width*30)/100;
            	var xAxisArray = dataSet[i].xdata;
            	var yDataArray = dataSet[i].ydata;
            	var cXPos = [];
            	var cYPos = [];
            	for (var j = 0; j <=yDataArray.length - 1; j++)
            	{
            		var yVal = yDataArray[j];
            		if(yVal === ""){
            		var cx = "";
            		var	cy = "";
            		cXPos.push(cx);
            		tooltipData[i][Math.floor(cx)] = yVal;
            		cYPos.push(cy);
            		}
            		else{

                	var cx = ((width) / (xAxisArray.length) * (j) + (width*20)/100); //for x co-ordinate
			                //for anchors y co-ordinate
			        var rangeCalculator = rangeFinder(Math.min.apply(null, rangeArray), Math.max.apply(null, rangeArray), yVal);
			        
			        var cy = Math.round((height + (height*10)/100 - ((height) * rangeCalculator)));
            		
            		
            		tooltipData[i][Math.floor(cx)] = yVal;
            		cXPos.push(Math.floor(cx));


            		cYPos.push(Math.floor(cy));
            		}
            	}	
            		var  anchors = {};
            		anchors.xTickPos = cXPos;
            		anchors.yTickPos = cYPos;
            		anchorPos[i] = anchors;
            		mappedData[i].anchorPos= anchorPos;
            		mappedData[i].yData = tooltipData;
            		
                	//plotting of yticks
            }
 		}

	

	var drawChart = function(){}
		
		drawChart.prototype.svgPlot = function(width,height){
			
 				this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
 				this.svg.setAttributeNS(null, "class", "graph");
 				this.svg.setAttributeNS(null, "width",width);
 				this.svg.setAttributeNS(null, "height",height);
 				return this.svg;

		}
	
		drawChart.prototype.linePlotByClass = function(x1,y1,x2,y2,Class){

			this.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
				this.line.setAttributeNS(null, "class", Class);
 				this.line.setAttributeNS(null, "x1",x1);
 				this.line.setAttributeNS(null, "y1",y1);
 				this.line.setAttributeNS(null, "x2",x2);
 				this.line.setAttributeNS(null, "y2",y2);
 				return this.line;

		}

		drawChart.prototype.linePlotById  = function(x1,y1,x2,y2,id){

			this.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
				this.line.setAttributeNS(null, "id", id);
 				this.line.setAttributeNS(null, "x1",x1);
 				this.line.setAttributeNS(null, "y1",y1);
 				this.line.setAttributeNS(null, "x2",x2);
 				this.line.setAttributeNS(null, "y2",y2);
 				return this.line;

		} 
	
		drawChart.prototype.plotCircle = function(cx,cy,r){

			this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
				this.circle.setAttributeNS(null, "class", "anchor");
				this.circle.setAttributeNS(null, "cx",cx);
				this.circle.setAttributeNS(null, "cy",cy);
				this.circle.setAttributeNS(null, "r",r);
				return this.circle;
		}

		drawChart.prototype.plotRect = function(width,height,x,y,Class){
			this.rect =  document.createElementNS("http://www.w3.org/2000/svg", "rect");
				this.rect.setAttributeNS(null, "class", Class);
				this.rect.setAttributeNS(null, "width",width);
				this.rect.setAttributeNS(null, "height",height);
				this.rect.setAttributeNS(null, "x",x);
	 			this.rect.setAttributeNS(null, "y",y);
	 			return this.rect;
		}
		drawChart.prototype.appendText = function(x,y,text){
			this.textNode = document.createElementNS("http://www.w3.org/2000/svg", "text");
			this.text =  document.createTextNode(text);
				this.textNode.setAttributeNS(null,"x",x);
				this.textNode.setAttributeNS(null,"y",y);
				this.nodeValue = this.textNode.appendChild(this.text);
				return this.textNode;
		}

	


	var chartRender = function(){};
	
		
		chartRender.prototype.appendSvg = function(dataSet){
			
			var div = document.getElementById("main");
			
			for (var i = 0; i < dataSet.length; i++) {
				var width = dataSet[i].width
				var height = dataSet[i].height
				var drawSvg = new drawChart();
				var svg = drawSvg.svgPlot(width,height);	
			 	    div.appendChild(svg);
					
				}
			}
		chartRender.prototype.appendCaption = function(dataSet){
			 var div = document.getElementById("top");
	        var h2 = document.createElement("h2");
	        var h3 = document.createElement("h3");
	        div.setAttributeNS(null, "class", "heading");

	        var caption = document.createTextNode(dataSet.caption);
	        var subCaption = document.createTextNode(dataSet.subCaption);
	        h2.appendChild(caption);
	        h3.appendChild(subCaption);

	        div.appendChild(h2);
	        div.appendChild(h3);
		}
		

		chartRender.prototype.appendXAxis = function(dataSet){
			
			var div = document.getElementById("main");
			for (var i = 0; i < dataSet.length; i++) {
				var svg = document.getElementsByClassName("graph")[i];
				var width = dataSet[i].width -(dataSet[i].width*30) /100;
                var height = dataSet[i].height -(dataSet[i].width*30)/100;
               
                var x1= (width*20)/100;
                var x2 = width + (width*20)/100;
                var y1= (height*10)/100;
                var y2 = height + (height*10)/100;
              
				
				var drawLine = new drawChart();
				var xLine = drawLine.linePlotByClass(x1,y2,x2,y2,"yAxis");	
				
			 	    svg.appendChild(xLine);
			 	    
			}

		}
		

		chartRender.prototype.appendXTick = function(mappedData){

			for (var i = 0; i < mappedData.length; i++) {
					var svg = document.getElementsByClassName("graph")[i];
					var xTicksXPos =  mappedData[i].xTicks.xPos;
					var xTicksYPos =  mappedData[i].xTicks.yPos;

					
				for (var j = 0; j < xTicksXPos.length; j++) {
					var x1 = xTicksXPos[j];
					var x2 = xTicksXPos[j];
					var y1 = xTicksYPos[j];
					var y2 = y1 + 10;
					
					var drawTicks = new drawChart();
					var xTicks = drawTicks.linePlotByClass(x1,y1,x1,y2,"xTicks");
			 	    svg.appendChild(xTicks);
				}
			}

		}

		chartRender.prototype.appendYTick = function(mappedData){

			for (var i = 0; i < mappedData.length; i++) {
					var svg = document.getElementsByClassName("graph")[i];
					var yTicksXPos =  mappedData[i].yTicks[i].xTickPos;
					var yTicksYPos =  mappedData[i].yTicks[i].yTickPos;

					
				for (var j = 0; j < yTicksXPos.length; j++) {
					
					var x1 = yTicksXPos[j] - 10;
					var x2 = yTicksXPos[j];
					var y1 = yTicksYPos[j];
					var y2 = yTicksYPos[j];
					
					var drawTicks = new drawChart();
					var yTicks = drawTicks.linePlotByClass(x1,y1,x2,y2,"yTicks");
			 	    svg.appendChild(yTicks);
				}
			}

		}
		chartRender.prototype.appendAnchor = function(mappedData){

			var tooltipData = [];
			for (var i = 0; i < mappedData.length; i++) {
					tooltipData[i] = {};
					var svg = document.getElementsByClassName("graph")[i];
					var anchorXPos =  mappedData[i].anchorPos[i].xTickPos;
					var anchorYPos =  mappedData[i].anchorPos[i].yTickPos;
					var yData = mappedData[i].yData;
					

				for (var j = 0; j < anchorXPos.length; j++) {
					
					
					var x1 = anchorXPos[j];
					var y1 = anchorYPos[j];
					if(x1==="" || y1 ===""){
						continue;
					}
					
					
					var drawAnchors = new drawChart();
					var anchors = drawAnchors.plotCircle(x1,y1,4);
			 	    svg.appendChild(anchors);
			 	    tooltipData[i][x1] = [anchors,yData[j] ];
			 	  
			 	   
				}
			}
		}
		chartRender.prototype.plotLink = function(mappedData){

			for (var i = 0; i < mappedData.length; i++) {
				var svg = document.getElementsByClassName("graph")[i];
				var anchorXPos =  mappedData[i].anchorPos[i].xTickPos;
				var anchorYPos =  mappedData[i].anchorPos[i].yTickPos;
					var flag = 0;
				for (var j = 0; j < anchorXPos.length; j++) {
					
					var x1 = anchorXPos[j];
					var y1 = anchorYPos[j];
					if(x1==="" || y1 ===""){
						continue;
					}
					if(x1!=="" || y1 !==""){
						
						flag++;
					}
					
					var tempX = x1;
                	var tempY = y1;
					
                	if (flag >= 2) {
						var drawLine = new drawChart();
						var link = drawLine.linePlotByClass(px,py,tempX,tempY,"link");
				 	    svg.appendChild(link);
				 	    
                	}
				 	    var px = tempX;
	                	var py = tempY;

				}
			}
		}
		chartRender.prototype.plotColumn = function(mappedData,dataSet){

			for (var i = 0; i < mappedData.length; i++) {
				var svg = document.getElementsByClassName("graph")[i];
				var anchorXPos =  mappedData[i].anchorPos[i].xTickPos;
				var anchorYPos =  mappedData[i].anchorPos[i].yTickPos;
				var h1 = dataSet[i].height -(dataSet[i].width*30)/100;
				var width = (dataSet[i].width -(dataSet[i].width*30) /100)/(2*mappedData.length + 1);
	           var flag = 0;
				for (var j = 0; j < anchorXPos.length; j++) {
					
					var x1 = anchorXPos[j];
					var y1 = anchorYPos[j];
					 var height =  h1 + (h1*10)/100 - y1;
					
					if(x1==="" || y1 ===""){
						continue;
					}
					// if(x1!=="" || y1 !==""){
						
					// }
					
					var tempX = x1;
                	var tempY = y1;
					
                	
						var drawLine = new drawChart();
						var link = drawLine.plotRect(18,height,tempX,tempY,"column");
				 	    svg.appendChild(link);
				 	    
              

				}
			}
		}



		chartRender.prototype.plotInnerRect = function(mappedData,dataSet){
			
			for (var i = 0; i < mappedData.length; i++) {
					var svg = document.getElementsByClassName("graph")[i];
					var yTicksXPos =  mappedData[i].yTicks[i].xTickPos;
					var yTicksYPos =  mappedData[i].yTicks[i].yTickPos;
					var rangeArray = dataSet[i].range;
	            	var width = dataSet[i].width -(dataSet[i].width*30) /100;
	                var height = dataSet[i].height -(dataSet[i].height*30)/100;
					var innerRectHeight = Math.round(height / (rangeArray.length-1) );
					
				for (var j = 0; j < yTicksXPos.length; j++) {
					if(j<=yTicksXPos.length-2){
						var x1 = yTicksXPos[j];
						var y1 = (height+(height*20)/100) - yTicksYPos[j] ;
						var drawRect = new drawChart();
						var innerRect = drawRect.plotRect(width, innerRectHeight,x1,y1,"innerRect");
				 	    svg.appendChild(innerRect);
					}


				}
			}
		}
		chartRender.prototype.plotOuterRect = function(dataSet){
			for (var i = 0; i < dataSet.length; i++) {
				var svg = document.getElementsByClassName("graph")[i];
				var width = dataSet[i].width -(dataSet[i].width*30) /100;
	            var height = dataSet[i].height -(dataSet[i].width*30)/100;
	            var x1= (width*20)/100;
				var y1= (height*10)/100;
				var drawRect = new drawChart();
				var outerRect = drawRect.plotRect(width, height,x1,y1,"outerRect");
				svg.appendChild(outerRect);
			}
		}
		chartRender.prototype.appendText = function(mappedData,dataSet){
			for (var i = 0; i < dataSet.length; i++) {
					var svg = document.getElementsByClassName("graph")[i];
					var yTicksXPos =  mappedData[i].yTicks[i].xTickPos;
					var yTicksYPos =  mappedData[i].yTicks[i].yTickPos;
					var rangeArray = dataSet[i].range; 
					
				for (var j = 0; j < yTicksXPos.length; j++) {
					
					var x1 = yTicksXPos[j] - 40;
					
					var y1 = yTicksYPos[j];
					
					var text = rangeArray[j];
					
					var appendText = new drawChart();
					var data = appendText.appendText(x1,y1,text);
			 	    svg.appendChild(data);
				}
			}
		}

	chartRender.prototype.appendYAxis = function(dataSet){
			
			
			for (var i = 0; i < dataSet.length; i++) {
				var svg = document.getElementsByClassName("graph")[i];
				var width = dataSet[i].width -(dataSet[i].width*30) /100;
                var height = dataSet[i].height -(dataSet[i].width*30)/100;
                var x1= (width*20)/100;
                var x2 = width + (width*20)/100;
                var y1= (height*10)/100;
                var y2 = height + (height*10)/100;
               
				
				var drawLine = new drawChart();
				
				var yLine = drawLine.linePlotByClass(x1,y1,x1,y2,"xAxis");
			 	    
			 	    svg.appendChild(yLine);
			}

		}
	var eventHandlerLine = function(){};
	eventHandlerLine.prototype.addEvent = function(dataSet,mappedData){
		
	 		for (var i = 0; i <= dataSet.length - 1; i++) {
 			
 				(function(i) {
		 			var outerRect = document.getElementsByClassName("outerRect")[i];
		           
		            outerRect.addEventListener("mousemove", function (event){mousemoveHandler(event,dataSet,mappedData,i)});    
		            
		            outerRect.addEventListener("mouseout", function(event){mouseOutHandler(event,dataSet,mappedData,i)});
		               
		            document.addEventListener("draw", function(event){drawHandler(event,dataSet,mappedData,i)});

		        })(i);
        }

	}
	eventHandlerLine.prototype.addEvent = function(dataSet,mappedData){
		
	 		for (var i = 0; i <= dataSet.length - 1; i++) {
 			
 				(function(i) {
		 			var outerRect = document.getElementsByClassName("outerRect")[i];
		           
		            outerRect.addEventListener("mousemove", function (event){mousemoveHandler(event,dataSet,mappedData,i)});    
		            
		            outerRect.addEventListener("mouseout", function(event){mouseOutHandler(event,dataSet,mappedData,i)});
		               
		            document.addEventListener("draw", function(event){drawLine(event,dataSet,mappedData,i),
        														drawToolTip(event,dataSet,mappedData,i)});

		        })(i);
        }

	}

	var mousemoveHandler = function(event,dataSet,mappedData,i){
		
	       
	    var svg = document.getElementsByClassName("graph")[i];
	    var offset = svg.getBoundingClientRect().left;
        var event1 = new CustomEvent("draw", {
            detail: {"xPos":event.clientX - offset,"target":event.currentTarget}
        })
        document.dispatchEvent(event1);
	        
	}

	var mouseOutHandler = function(event,dataSet,mappedData,i){
	    
		
        var event2 = new CustomEvent("draw", {
            detail: {"xPos":-1}
        })
        document.dispatchEvent(event2);
	        
	}
	var line = [];
	var drawLine =function(event,dataSet,mappedData,i){
	
		
		var svgArray = document.getElementsByClassName("graph");
		var currentSvg = svgArray[i];
		
		var width = dataSet[i].width -(dataSet[i].width*30) /100;
        var height = dataSet[i].height -(dataSet[i].width*30)/100;
        var x1= event.detail.xPos;
        var x2 =x1;
        var y1= (height*10)/100;
        var y2 = height + (height*10)/100;
      
   		if (line[i] === undefined) {
   			 line[i] = document.createElementNS("http://www.w3.org/2000/svg", "line");
	        currentSvg.appendChild(line[i]);
	       }
    	
	    	line[i].setAttributeNS(null, "x1", x1 );
			line[i].setAttributeNS(null, "x2", x2);
			line[i].setAttributeNS(null, "y1",y1);
			line[i].setAttributeNS(null, "y2",y2);
			line[i].setAttributeNS(null, "class", "hairLine");

	};
	var tooltip = [];
	var drawToolTip = function(event,dataSet,mappedData,svgIndex){
	 
	 
		var svgArray = document.getElementsByClassName("graph");
		var currentSvg = svgArray[svgIndex];
		var ydata = mappedData[svgIndex].yData[svgIndex];
		// var cx = mappedData[svgIndex].anchorPos[svgIndex].xTickPos;

	  	var offsetTop = currentSvg.getBoundingClientRect().top;
	  	var offsetLeft = currentSvg.getBoundingClientRect().left;
	    if (tooltip[svgIndex] === undefined) {
	        tooltip[svgIndex] = document.createElement("div");
	        document.body.appendChild(tooltip[svgIndex]);

	    
    	} 
	    else {
	        document.body.removeChild(tooltip[svgIndex]);
	        tooltip[svgIndex] = document.createElement("div");
	        document.body.appendChild(tooltip[svgIndex]);
	  
	    }
	   
	     
		    if (mappedData[svgIndex].yData[svgIndex][event.detail.xPos]) {
		        var style = "position:absolute;top:" + offsetTop + "px;left:";
		        style += offsetLeft + "px;";
		        tooltip[svgIndex].setAttribute("style", style);
		        var anchorAraay = currentSvg.getElementsByClassName("anchor");
		        for (var i = 0; i < anchorAraay.length; i++) {
		        	var anchor = anchorAraay[i];
		        	var xpos = anchor.getAttributeNS(null,"cx");
		        	if(xpos == event.detail.xPos){
		        		anchor.style.stroke = "red";
		        		anchor.style.strokeWidth = 3;
		        		tool(mappedData,svgIndex);
		        	}
		        	else{
		        		
		        		anchor.style.stroke = "royalblue";
		        		anchor.style.strokeWidth = 1.8;
		        	}
		        }
		        function tool(mappedData,svgIndex) {
		        	// body...
		        tooltip[svgIndex].setAttribute("class", "tooltip");
		        var text  = document.createTextNode(mappedData[svgIndex].yData[svgIndex][event.detail.xPos]);
		       
		        tooltip[svgIndex].appendChild(text);
		        currentSvg.appendChild(anchor);
		        }

		    
		}

	}
	var eventHandlerColumn = function(){}
	eventHandlerColumn.prototype.addEvent = function(dataSet,mappedData){
		
	 		var columnArray = document.getElementsByClassName("column");
	 		for (var i = 0; i <= columnArray.length - 1; i++) {
 			
 				(function(i) {
		 			var currentColumn = columnArray[i];
		 			
		            currentColumn.addEventListener("mousemove", function (event){mousemoveHandler1(event,dataSet,mappedData,i)});    
		            
		            currentColumn.addEventListener("mouseleave", function(event){mouseOutHandler1(event,dataSet,mappedData,i)});
		               
		            document.addEventListener("draw", function(event){showToolTip(event,dataSet,mappedData)});


		        })(i);
        }

	};

	var mousemoveHandler1 = function(event,dataSet,mappedData,i){
		var columnArray = document.getElementsByClassName("column");
		var currentColumn = columnArray[i];
		var svg = currentColumn.parentNode;
		var offsetLeft = svg.getBoundingClientRect().left;
 		var offsetTop = svg.getBoundingClientRect().top;
        var event1 = new CustomEvent("draw", {
            detail: {"xPos":event.clientX - offsetLeft, "yPos":event.clientY-offsetTop}
        })
        document.dispatchEvent(event1);
	        
	};

	var mouseOutHandler1 = function(event,dataSet,mappedData,i){
	    var columnArray = document.getElementsByClassName("column");
		var currentColumn = columnArray[i];
		var svg = currentColumn.parentNode;
		var offsetLeft = svg.getBoundingClientRect().left;
 		var offsetTop = svg.getBoundingClientRect().top;
        var event2 = new CustomEvent("draw", {
            detail:{"xPos":-1, "yPos":-1}

        })
        
       	document.dispatchEvent(event2);
	        
	};

	
	var tooltip1 = [];
	function showToolTip(event,dataSet,mappedData){
		var columnArray = document.getElementsByClassName("column");
		for (var i = 0; i < columnArray.length; i++) {
			
		
		var currentColumn = columnArray[i];
		var svgArray = Array.from(document.getElementsByClassName("graph"));
		
		var svg = currentColumn.parentNode; 
		var svgIndex = svgArray.indexOf(currentColumn.parentNode);
		
		var offsetLeft = svg.getBoundingClientRect().left;
 		var offsetTop = svg.getBoundingClientRect().top;
		

		var width = Number(currentColumn.getAttributeNS(null, "width"));
		var height = Number(currentColumn.getAttributeNS(null,"height"));
		var x1 = Number(currentColumn.getAttributeNS(null,"x"));
		var y1 = Number(currentColumn.getAttributeNS(null,"y"));
		// console.log(width,height,x1,y1,"check");
		// console.log(event.detail.xPos,event.detail.yPos,"event");
	    if (tooltip1[i] === undefined) {
	        tooltip1[i] = document.createElement("div");
	        document.body.appendChild(tooltip1[i]);
	    
    	} 
	    else {
	        document.body.removeChild(tooltip1[i]);
	        tooltip1[i] = document.createElement("div");
	        document.body.appendChild(tooltip1[i]);
	    }
		    if (event.detail.xPos > x1 && event.detail.xPos < x1 + width ) {
		        
		        var style = "position:absolute;top:" +offsetTop+ "px;left:";
		        style += offsetLeft + "px;";
		        tooltip1[i].setAttribute("style", style);
		        console.log(currentColumn,"currentColumn");
		        currentColumn.style.fill=("#BC4445");
		       
		        tooltip1[i].setAttribute("class", "tooltip");
		       
		        var text  = document.createTextNode(mappedData[svgIndex].yData[svgIndex][x1]);
		        tooltip1[i].appendChild(text);
					
		       
		       
		}
		else {
			currentColumn.style.fill=("#1E7ACD");
		}
	}
}
	// var removeToolTip = function(event,i){
	// 	var columnArray = document.getElementsByClassName("column");
	// 	var currentColumn = columnArray[i];
	// 	var width = currentColumn.getAttributeNS(null, "width");
	// 	var height = currentColumn.getAttributeNS(null,"height");
	// 	var x1 = currentColumn.getAttributeNS(null,"x");
	// 	var y1 = currentColumn.getAttributeNS(null,"y");
	// 	console.log("remove");
	// 	console.log(event.detail.xPos<x1 || event.detail.xPos >x1+width || event.detail.yPos <y1 || event.detail.yPos > y1+height,"check");
	// 	if (event.detail.xPos<x1 || event.detail.xPos >x1+width || event.detail.yPos <y1 || event.detail.yPos > y1+height) {
	// 	currentColumn.style.fill=("#1E7ACD");
	// 	}
	// }
	chartRender.prototype.noOfChart = function(){
		var w = window.innerWidth;
		var svgArray = document.getElementsByClassName("graph");
		
		for(var i=0;i<svgArray.length;i++){
	 		var chartWidth = parseInt(svgArray[i].getAttributeNS(null,"width"));
	 		
		}
		var noOfChartInRow = Math.floor(w /(chartWidth));
		
		
		return noOfChartInRow;
	}


	chartRender.prototype.appendXLabel = function(mappedData,dataSet){
		var w = window.innerWidth;
		
		var svgArray = document.getElementsByClassName("graph");
		var noOfChartInRow = this.noOfChart();
		
		if(svgArray.length%noOfChartInRow == 0){
			
			xLabelsAtBottom(dataSet,mappedData,noOfChartInRow);
		}
		else{

			xLabelsOnTop(dataSet,mappedData,noOfChartInRow);
		}
	}

	function xLabelsAtBottom(dataSet,mappedData,noOfChartInRow){
		var w = window.innerWidth;
		
		for (var i = 0; i < dataSet.length; i++) {
					var svg = document.getElementsByClassName("graph")[i];
					var width = svg.getAttributeNS(null,"width");
					var width1 = dataSet[i].width -(dataSet[i].width*30) /100;
					var height = svg.getAttributeNS(null,"height");
					
					var noOfChartInRow = Math.floor(w/width);
					var xTicksXPos =  mappedData[i].xTicks.xPos;
					var xTicksYPos =  mappedData[i].xTicks.yPos;
					var XrangeArray = dataSet[i].xdata; 
					var seriesName = dataSet[i].seriesName;
				for (var j = 0; j < xTicksXPos.length; j++) {
					
					var x1 = xTicksXPos[j];
					var x2= (width1*20)/100;
					var y1 = xTicksYPos[j] +20;
					var y2= (height*.2)/100;
					var text = XrangeArray[j];
					
					var appendTitle = new drawChart();
					var titleRect = appendTitle.plotRect(width1,(height*6)/100,x2,y2,"titleRect");
					var title = appendTitle.appendText(x2+width1/3,y2+(height*10)/200,seriesName);
					svg.appendChild(titleRect);
					svg.appendChild(title);
					if(i==dataSet.length-1){
						var appendText = new drawChart();
						var data = appendText.appendText(x1,y1,text);
						
				 	    svg.appendChild(data);
				 	  
			 		}
				}
		}
	}


	function xLabelsOnTop(dataSet,mappedData,noOfChartInRow){
		var w = window.innerWidth;
		
		for (var i = 0; i < dataSet.length; i++) {
		
					var svg = document.getElementsByClassName("graph")[i];
					var width = svg.getAttributeNS(null,"width");
					var width1 = dataSet[i].width -(dataSet[i].width*30) /100;
					var height = svg.getAttributeNS(null,"height");
					var height1 = dataSet[i].height -(dataSet[i].width*30)/100;
					var xTicksXPos = mappedData[i].xTicks.xPos ;
					var xTicksYPos =  mappedData[i].xTicks.yPos;
					var XrangeArray = dataSet[i].xdata; 
					var seriesName = dataSet[i].seriesName;
					
				for (var j = 0; j < xTicksXPos.length; j++) {
					var x1 = xTicksXPos[j];
					var x2= (width1*20)/100;
					var y1= (height*5)/100;
					var y2 = height1 + (height1*15)/100;
					
					var text = XrangeArray[j];
					var appendTitle = new drawChart();
					var titleRect = appendTitle.plotRect(width1,(height1*10)/100,x2,y2,"titleRect");
					var title = appendTitle.appendText(x2+width1/3,y2+(height1*10)/200,seriesName);
					svg.appendChild(titleRect);
					 svg.appendChild(title);
					if(i<noOfChartInRow){
					var appendText = new drawChart();
					var data = appendText.appendText(x1,y1,text);
			 	    svg.appendChild(data);
					}
					
				}
			}
	}





	parsing();
	

})(window);