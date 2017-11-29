var g=9.8;
var l = document.getElementById('length').value;
var u =Eu= 0.78;
var theta=Etheta = 0;
var h = 0.05;
var gndCenterX= 250;
var gndCenterY= 20;


//simplified equations 1
function thetadot( theta,  u)
{
    return u;
}

//simplified equations 2
function udot(theta, u)
{
    return -(g / l) * Math.sin(theta);

}

/*---------------------------------------------*/
/* Runge kutta for the theta dot:              */
/* where thetadot = u                      */
/*                                             */
/*---------------------------------------------*/
function RKt ( u, theta)
{
     var thetanext, k1, k2, k3, k4;   
     k1=thetadot(theta,u);
     k2=thetadot(theta+ 0.5 * h , u + 0.5 * h * k1);
     k3=thetadot(theta+ 0.5 * h , u + 0.5 * h * k2);
     k4=thetadot(theta+h, u + h * k3);
     thetanext = theta + (h / 6.0) * (k1 + 2 * k2 + 2 * k3 + k4);    
     return thetanext;
}

function RKu ( u, theta)
{
        var unext, k1, k2, k3, k4;   
     k1=udot(theta,u);
     k2=udot(theta + 0.5 * h, u + 0.5 * h * k1);
     k3=udot(theta + 0.5 * h, u + 0.5 * h * k2);
     k4=udot(theta + h , u + h * k3);
     unext = u +(h / 6.0) * (k1 + 2 * k2 + 2 * k3 + k4);    
     return unext;
}
function  drawRungeKutta() {
 
    var oldtheta=theta;

    theta=RKt(u,oldtheta);
    var oldu=u;
    u=RKu(u,oldtheta);

console.log(u);
console.log(theta);

   var updatedX = gndCenterX + l*100*2*Math.sin(theta);
   var updatedY = gndCenterY + l*100*2*Math.cos(theta);

  var line = document.getElementById("runge-line");
  var circle = document.getElementById("runge-circle");
    line.setAttribute("x2",updatedX);
    line.setAttribute("y2",updatedY);
    circle.setAttribute("cx",updatedX);
    circle.setAttribute("cy",updatedY);
 

    
}
//document.querySelector("line").y2 = updatedY;
 

var start
document.getElementById('runge-kutta-form').onsubmit = function (event) {
    event.preventDefault();

    i=0;
      start=setInterval(function() { 
        console.log(i);  
        drawRungeKutta(); 
        drawEuler();
        i++;

        }, 50);
      

};
document.onload =set_length();
document.querySelector('.stop').onclick =function (event) {
    event.preventDefault();
    clearTimeout(start);
}

document.getElementById('length').oninput= set_length();
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
    var Eoldtheta=Etheta;
    Etheta=Eoldtheta + h * thetadot(Eoldtheta,Eu);
    Eu = Eu + h *udot(Eoldtheta,Eu);

console.log(Eu);
console.log(Etheta);
   var EupdatedX = gndCenterX + l*100*2*Math.sin(Eoldtheta);
   var EupdatedY = gndCenterY + l*100*2*Math.cos(Eoldtheta);
  //document.getElementById("M").style.left = updatedX+200+'px';

  var line = document.getElementById("euler-line");
  var circle = document.getElementById("euler-circle");
    line.setAttribute("x2",EupdatedX);
    line.setAttribute("y2",EupdatedY);
    circle.setAttribute("cx",EupdatedX);
    circle.setAttribute("cy",EupdatedY);
 

    
}