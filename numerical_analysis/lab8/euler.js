var drawEuler = function(){
    var fn = document.getElementById('euler-eq').value;
    var y = math.eval(document.getElementById('euler-start-point').value);
    var x = 0;
    var upper_limit = math.eval(document.getElementById('euler-upper-limit').value);
    var intervals_count = math.eval(document.getElementById('euler-intervals-count').value);
    var interval = (upper_limit - x) / intervals_count;

    var eulerPlotOptions = {
        title: "Euler",
        target: "#euler",
        width: 700,
        height: 500,
        data: []
    }

    for(var i=0; i<intervals_count; i++){
        var x_old = x;
        var y_old = y;
        x += interval;
        y += interval * math.eval(fn, {x:x_old, y:y_old});

        eulerPlotOptions.data.push({
            points: [
                [x_old,y_old],
                [x,y]
            ],
            fnType: 'points',
            sampler: 'builtIn',
            graphType: 'polyline',
            color: 'blue',
            closed: true
        });
    }

    try {
        functionPlot(eulerPlotOptions);
    }
    catch (err) {
      console.log(err);
      //alert(err);
    }
}

document.getElementById('euler-form').click = function (event) {
    event.preventDefault();
    drawEuler();
};