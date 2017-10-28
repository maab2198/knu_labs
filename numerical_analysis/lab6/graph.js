
/*
window.onload = graph_run(); 

function graph_run() {
var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [
    { data: { id: 'a' } },
    { data: { id: 'b' } },
    {
      data: {
        id: 'ab',
        source: 'a',
        target: 'b'
      }
    }]
});


}
*/

function graph_run2(r) {

var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [],
  style: [
    {
        selector: 'node',
        style: {
            shape: 'hexagon',
            'background-color': 'red',
            label: 'data(id)'
        }
    }]
});
var i = 2;


for (; i <= 5; i++) 
{ var h=r[i].toString();
    cy.add({
      group: "nodes",
        data: { id: h }
           });
}

console.log(r);

for (; i < r.length; i++) 
{    ster=r[i].toString().split(' ');
    var s0=ster[0];
    var t0=ster[1];
var k=r[3].toString();
console.log(k);
console.log(s0);
console.log(typeof(s0)==typeof(k));
console.log(ster[0]==r[3].toString());
console.log(s0===k);
console.log(Object.getPrototypeOf(s0)==Object.getPrototypeOf(k));
    cy.add({ 
      group: "edges",
      data: {
            id: "edges"+i,
            source: t0,
            target: s0  }
          });
}


cy.layout({
    name: 'circle'
}).run();

}

/*document.getElementById('file').addEventListener('change', handleFileSelect, false);
*/
var eps=0;
var n=0;
var s=document.getElementById('file');
s.addEventListener('change', handleFileSelect, false);

function handleFileSelect (evt){
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
        var textToArray = reader.result.split(/(\W)\b/).filter(function(n){ return n != "\n"&& n!=" " ;}).filter(Boolean);
      n=textToArray[0];
      eps=textToArray[1];
      console.log(textToArray);
        document.getElementById("fileContents").innerText=reader.result;
        
       // graph_run2(textToArray);
    }
    reader.onerror = function (evt) {
        document.getElementById("fileContents").innerText = "error reading file";
    }
      

      
  }

/*
function handleFileSelect (evt){
    var file = evt.target.files[0];

      var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
        document.getElementById("fileContents").innerText = event.target.result;
    }
    reader.onerror = function (evt) {
        document.getElementById("fileContents").innerText = "error reading file";
    }
      

      
  }


*/