var xmlhttp = new XMLHttpRequest(),json;

xmlhttp.onreadystatechange = function() {
  if ( xmlhttp.readyState === 4 && xmlhttp.status === 200 ) {
    json = JSON.parse(xmlhttp.responseText);
    console.log(json);
    createChart(json);
  }
};
xmlhttp.open("GET", "projectData.json", true);
xmlhttp.send();
function createChart(json) {
var titleLen=json.yAxisName.length;
}
