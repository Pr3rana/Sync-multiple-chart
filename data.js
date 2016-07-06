var xmlhttp = new XMLHttpRequest(),json;
  var xAxisArray=[];
  var yAxis1Array=[];
  var yAxis2Array=[];
  var yAxis3Array=[];
xmlhttp.onreadystatechange = function() {
  if ( xmlhttp.readyState === 4 && xmlhttp.status === 200 ) {
    json = JSON.parse(xmlhttp.responseText);
      // var  dataLen= json.dataSet.length;
      // for(var j=0;j<=dataLen-1;j++){
      //   xAxisArray.push(json.dataSet[j].xdata);
      //   yAxis1Array.push(json.dataSet[j].ydata[0]);
      //   yAxis2Array.push(json.dataSet[j].ydata[1]);
      //   yAxis3Array.push(json.dataSet[j].ydata[2]);
      // }
      createChart(json);
  }
};
xmlhttp.open("GET", "projectData.json", true);
xmlhttp.send();
var createChart = function(JSON)
{
  this.json=JSON;
  var  titleOptionLen= JSON.yAxisName.length;
  var  dataLen= json.dataSet.length;
  console.log(JSON.yAxisName.length);
  for(var i=0;i<=titleOptionLen-1;i++){
    for(var j=0;j<=dataLen-1;j++){
  var Caption = JSON.caption;
  console.log(Caption);
  var subCaption=JSON.subCaption;
  console.log(subCaption);
  var xAxisTitle=JSON.xAxisName;
  var xAxisValue =xAxisArray;
  var yAxisValue =(json.dataSet[j].ydata[i]);
  console.log(yAxisValue);
}var yAxisTitle=JSON.yAxisName[i].yAxis;
  var Max=Math.max.apply(null, yAxis1Array);
  var Min= Math.min.apply(null, yAxis1Array);
  var noOfticks=Math.round(Max/5);
  console.log(Max);
  console.log(noOfticks);

}
};
