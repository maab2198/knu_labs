
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
function matrix(cy) {
  var arr=cy.nodes();
  var list_n=[]
  var ranks=[];
  arr.forEach(function(node,i, arr ) {
    list_n.push([]);
    arr.forEach(function(n,j, arr ) {
      var out_edges=cy.getElementById(n.id()).outgoers('edge').length;
    if (cy.getElementById(n.id()).edgesTo(cy.getElementById(node.id())).length&&out_edges)
    {
      list_n[i].push(1/out_edges);
      }
      else list_n[i].push(0);


      });

     ranks.push(1/n);

    
  });
  iterator(list_n,ranks);
}

function iterator(list, ranks) {
        res = [];
           console.log(list);
           console.log(ranks);
        var iteration=0;
        for(i=0; i < n ; i+=1){
            res.push(0);
           for(j=0; j < n ; j+=1){
                res[i] += list[i][j] * ranks[j];
              }
        iteration += 1;
        console.log(res);
}
      }
 /* var a_n = (cy.nodes("#a").neighborhood('node')).length;
  var b_n = (cy.nodes("#b").neighborhood('node')).length;
  var c_n = (cy.nodes("#c").neighborhood('node')).length;
  var d_n = (cy.nodes("#d").neighborhood('node')).length;
  console.log(list_n);
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

i=0;
for (; i < n; i++) 
{ 
    cy.add({
      group: "nodes",
        data: { id: r[i].toString() }
           });
}



for (; i+1 < r.length; i=i+2) 
{    ster=r[i].toString().split(' ');
    
    cy.add({ 
      group: "edges",
      data: {
            id: "edges"+i,
            source: r[i].toString(),
            target: r[i+1].toString()  }
          });
}


cy.layout({
    name: 'circle'
}).run();
matrix(cy);

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
        var textToArray = reader.result.split(/[^0-9a-zA-Z\x2d]/).filter(function(n){ return n!="" ;});
      
       
      n=parseInt(textToArray[0]);
      eps=parseInt(textToArray[1]);
      textToArray.splice(0, 2);
      document.getElementById("fileContents").innerText=reader.result;
        
    graph_run2(textToArray);
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