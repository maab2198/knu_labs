
var cy = cytoscape({
});
var list_n=[]
var ranks=[];
var clicks = 0;
function matrix(cy) {
  var arr=cy.nodes();

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

}

function go (play,next){
  var arr=cy.nodes();
  var nw,old,size;


  while (true) { 
   


clicks++
old=ranks;
   nw=iterator(list_n,old);

       document.querySelector(".iter").innerHTML=clicks.toString();
 console.log(nw);

   ranks=nw;
   var sum=ranks.reduce(function(a, b) {
  return a + b;
});
    arr.forEach(function(node,i, arr ) {
      cy.getElementById(node.id()).data('weight',(ranks[i].toExponential(2)).toString());
      size=(150*ranks[i])/sum;
      cy.getElementById(node.id()).style('height',size+'%');
      cy.getElementById(node.id()).style('width',size+'%');
    });

  

if (stop_cond(old, ranks)) 
{
  disabled();
  return;
} 
if (next) return;

}



}


function iterator(list, ranks) {
         res = [];
         
        for(i=0; i < n ; i++){
            res.push(0);
           for(j=0; j < n ; j++){
                res[i] += list[i][j] * ranks[j];
              }  
            }
  return res;
}

function stop_cond(pr, cr){

        var step_diff = []
        for (i=0;i<cr.length; i++) {
            step_diff.push(Math.abs(cr[i] - pr[i]));//Math.abs()
          }
        diff = 0;
        for (i=0;i<cr.length; i++){
            if (step_diff[i] > eps)
                diff += 1;
            }

        if (diff==0) return true;
        return false;
      }


function build_graph(r) {

cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [],
  style: [
    {
        selector: 'node',
        style: {
           
            'content': 'data(id)',
        
        'text-valign': 'center',
        'color': 'white',
        'text-outline-width': 2,
        'background-color': '#999',
        'text-outline-color': '#999',
        'height': '50%',
         'width': '50%'
        }},{
      selector:'edge',
      style: {
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': ' #ffdc00',
        'width':'3px'
       
      }
    },
    {
      selector:'.show-weight',
      style: {
  'content': 'data(weight)',
        
        'text-valign': 'center',
        'color': 'white',
        'text-outline-width': 2,
        'background-color': '#0074d9',
        'text-outline-color': '#0074d9',
        'height': '50%',
        'width': '70%'
      }
    }]
});

i=0;
for (; i < n; i++) 
{ 
    cy.add({
      group: "nodes",
        data: { 
          id: r[i].toString(),
          weight: w.toString()
           }
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


}

/*document.getElementById('file').addEventListener('change', handleFileSelect, false);
*/
var eps=0;
var n=0;
var w=0;
var s=document.getElementById('file');
s.addEventListener('change', handleFileSelect, false);

function handleFileSelect (evt){
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) { 
    var textToArray = reader.result.split(/[^0-9a-zA-Z\x2d]/).filter(function(n){ return n!="" ;});
      
       
      n=parseInt(textToArray[0]);
      w=1/n;
      eps=Math.pow(10,parseInt(textToArray[1]));
      textToArray.splice(0, 2);
      document.querySelector(".fileContents output").innerText=reader.result;

    document.querySelector(".fileContents").classList.add("show");
    build_graph(textToArray);


    }
    reader.onerror = function (evt) {
        document.querySelector(".fileContents output").innerText = "error reading file";
    }
      

      
  }

/*formLink.addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector(".fileContents").classList.add("show");
  });
*/

function disabled () {
document.querySelector("#finish").disabled=true;
document.querySelector("#play").disabled=true;
document.querySelector("#next").disabled=true;
}

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27 && document.querySelector(".fileContents").contains("show"))
    {
      event.preventDefault();
      document.querySelector(".fileContents").remove("show");
    }
  });

document.querySelector(".close").addEventListener("click", function(event) {
    {
      event.preventDefault();
document.querySelector(".fileContents").remove("show");
    }
  });

document.querySelector("#finish").addEventListener("click", function(event) {
  document.querySelector(".iter").classList.add("show");
      matrix(cy);
      clicks += 1;
      go(false,false);
      console.log(list_n)
    });

document.querySelector("#play").addEventListener("click", function(event) {
  document.querySelector(".iter").classList.add("show");
      matrix(cy);      
      var intr = setInterval(function() {
        clicks += 1;
      go(true,true);
      if (document.querySelector("#play").disabled)
         clearInterval(intr);
       }, 2000)
    });


document.querySelector("#next").addEventListener("click", function(event) {
  document.querySelector(".iter").classList.add("show");
      matrix(cy);
      clicks += 1;
      go(false,true);
    });

document.querySelector(".show-ranks").addEventListener("click", function(event) {
  cy.nodes().toggleClass('show-weight');
  document.querySelector(".show-ranks").classList.toggle("show-ranks-minus");

    });


