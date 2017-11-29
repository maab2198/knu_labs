var drawRungeKutta = function(){
    var fn_x = document.getElementById('runge-kutta-eq-x').value;
    var fn_y = document.getElementById('runge-kutta-eq-y').value;
    var x = 30*3.14/180;
    var y = math.eval(document.getElementById('runge-kutta-start-point-y').value);
    var t = 0;   
    var interval = 2*3.14*0.102;

    var rungeKuttaPlotOptions = {

        target: "#runge-kutta",

        data: []
    }

    for(var i=0; i<50; i++){
        var t_old = t;
        var x_old = x;
        var y_old = y;
        t += interval;
        x += interval * math.eval(fn_x, {x:x_old, y:y_old});
        y += interval * math.eval(fn_y, {x:x_old, y:y_old});

        rungeKuttaPlotOptions.data.push({
            points: [
                [t_old,x_old],
                [t,x]
            ],
            fnType: 'points',

        });

    }

    try {
        console.log(rungeKuttaPlotOptions);
    }
    catch (err) {
      console.log(err);
      //alert(err);
    }
}
function solve(t, x, v):
    kx1 = 0
    kv1 = calcODEFunc( t, x, v )

    kx2 = v + h*kv1/2
    kv2 = calcODEFunc( t + h/2, x + h*kx1/2, v + h*kv1/2 )

    kx3 = v + h*kv2/2
    kv3 = calcODEFunc( t + h/2, x + h*kx2/2, v + h*kv2/2 )

    kx4 = v + h*kv3
    kv4 = calcODEFunc( t + h, x + h*kx3, v + h*kv3 )

    dx = h*(kx1 + 2*kx2 + 2*kx3 + kx4)/6
    dv = h*(kv1 + 2*kv2 + 2*kv3 + kv4)/6

    return x+dx, v+dv
document.getElementById('runge-kutta-form').onsubmit = function (event) {
    event.preventDefault();
    drawRungeKutta();
};