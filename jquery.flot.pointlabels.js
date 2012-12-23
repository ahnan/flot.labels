(function ($) {
  var options = {
		series: { 
			points: {
				pointlabel: false,
        drawlabel: drawbubbleDefault
			}
		}
	};

	function drawbubbleDefault(ctx,series,axes,x,y,v,r,c,overlay,data){
		if (series.points.show && series.points.pointlabel) {drawbubbleLabel(ctx,series,axes,x,y,v,data); }
	}
  
	// based on a patch from Nikola Milikic
	function drawbubbleLabel(ctx,series,axes,x,y,v,data){	
		var xtext,ytext,vsize,f;
		f = axes.xaxis.font;
    if(f){
		ctx.font = f.style + " " + f.variant + " " + f.weight + " " + f.size + "px '" + f.family + "'";}
		vsize = ctx.measureText(v); 
		xtext = x - vsize.width/2;
		ytext = y + 2/2;
		//ctx.fillText(v,xtext,ytext);
    ctx.fillText(data[1].toFixed(2), x, y);
	}

    function init(plot) {
		var  data = null, canvas = null, target = null, axes = null, offset = null,hl = null;
		plot.hooks.processOptions.push(processOptions);
		function processOptions(plot,options){
		if (true || options.series.bubbles.active){	
				plot.hooks.draw.push(draw);
				//plot.hooks.bindEvents.push(bindEvents);
				//plot.hooks.drawOverlay.push(drawOverlay);
			}
		}

		function draw(plot, ctx){
			var series;
			canvas = plot.getCanvas();
			target = $(canvas).parent();
			axes = plot.getAxes();
			offset = plot.getPlotOffset();
			data = plot.getData();
			for (var i = 0; i < data.length; i++){
				series = data[i];
				if (true || series.bubbles.show) {
					for (var j = 0; j < series.data.length; j++) {
						drawbubble(ctx, series, series.data[j], series.color);
					}
				}
			}
		}
    function drawbubble(ctx,series,data,c,overlay){
			var x,y,r,v;
			x = offset.left + axes.xaxis.p2c(data[0]);
			y = offset.top + axes.yaxis.p2c(data[1]);
			v = data[2];
			r = parseInt(axes.yaxis.scale * data[2] / 2);
			series.points.drawlabel(ctx,series,axes,x,y,v,r,c,overlay,data);
		}

  }
	$.plot.plugins.push({
		init: init,
		options: options,
		name: 'pointlabels',
		version: '0.2'
    });

})(jQuery);