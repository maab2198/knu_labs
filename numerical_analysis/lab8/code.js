var g=9.8;
var l = document.getElementById('length').value;
var u =Eu= 30*3.14/180;
var theta=Etheta = 0;
var h = 0.01;
var gndCenterX= 250;
var gndCenterY= 50;
var start;

function udot(theta)
{
    return theta;
}

function thetadot(u)
{
    return -(g / l) * Math.sin(u);

}

function RKt ( u, theta)
{
     var thetanext, k1, k2, k3, k4;
     var unext, ku1, ku2, ku3, ku4;

     ku1=udot(theta);   
     k1=thetadot(u);

     ku2=udot(theta + 0.5 * h * k1);
     k2=thetadot(u + 0.5 * h * ku1);

     ku3=udot(theta + 0.5 * h * k2);
     k3=thetadot(u + 0.5 * h * ku2);

     ku4=udot(theta + h * k3);
     k4=thetadot( u + h * ku3);

     thetanext = theta + (h / 6.0) * (k1 + 2 * k2 + 2 * k3 + k4);
     unext = u +(h / 6.0) * (ku1 + 2 * ku2 + 2 * ku3 + ku4);

     return [unext,thetanext];
}


function  drawRungeKutta() {
    [u,theta]=RKt(u,theta+h);
    if (i%100==0) {  
      console.log(i); 
    console.log(u)  ;
    console.log(theta)  ;
}
    var updatedX = gndCenterX + l*100*2*Math.sin(theta);
    var updatedY = gndCenterY + l*100*2*Math.cos(theta);

    var line = document.getElementById("runge-line");
    var circle = document.getElementById("runge-circle");

    line.setAttribute("x2",updatedX);
    line.setAttribute("y2",updatedY);
    circle.setAttribute("cx",updatedX);
    circle.setAttribute("cy",updatedY);
} 

function set_length() {

  var line = document.getElementById("runge-line");
  var circle = document.getElementById("runge-circle");
    line.setAttribute("y1",50);
    line.setAttribute("y2",document.getElementById('length').value*200);
    circle.setAttribute("cy",document.getElementById('length').value*200);

    line = document.getElementById("euler-line");
    circle = document.getElementById("euler-circle");
    line.setAttribute("y1",50);
    line.setAttribute("y2",document.getElementById('length').value*200);
    circle.setAttribute("cy",document.getElementById('length').value*200);
};



function  drawEuler() {

    var k =0, ku =0;
     Etheta+=h;  
     ku=udot(Etheta);   
     k=thetadot(Eu);
     Etheta = Etheta + (h) * (k);
     Eu = Eu +(h) * Etheta;
if (i%100==0) {    
console.log(Eu)  ; 
console.log(Etheta)  ;
}
    var EupdatedX = gndCenterX + l*100*2*Math.sin(Etheta);
    var EupdatedY = gndCenterY + l*100*2*Math.cos(Etheta);

    var line = document.getElementById("euler-line");
    var circle = document.getElementById("euler-circle");
    
    line.setAttribute("x2",EupdatedX);
    line.setAttribute("y2",EupdatedY);
    circle.setAttribute("cx",EupdatedX);
    circle.setAttribute("cy",EupdatedY);   
}

i=0;
document.getElementById('runge-kutta-form').onsubmit = function (event) {
    event.preventDefault();

    
    start=setInterval(function() { 
         
        drawRungeKutta(); 
        drawEuler();
        i++;
      }, 0);
};

document.onload =set_length();
document.querySelector('.stop').onclick =function (event) {
    event.preventDefault();
    clearTimeout(start);
}

document.getElementById('length').oninput= set_length();

