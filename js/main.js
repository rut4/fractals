function start() {
    var time = new Date;
    var canvas = new Canvas;
    var graphics = new Graphics;

    var dx = 2.6 / canvas.getWidth();
    var dy = 2.4 / canvas.getHeight();

    var x = -2.05
    ,   y = -1.2
    ,   iter = 255
    ,   color;

    graphics.startDraw();

    for (var i = 0; i < canvas.getHeight(); i++) {
        for (var j = 0; j < canvas.getWidth(); j++) {
            var z = 0
            ,   zi = 0
            ,   inset = true;

            for (var k = 0; k < iter; k++) {
                var newz = (z * z) - (zi * zi) + x
                ,   newzi = 2 * z * zi + y;

                z = newz;
                zi = newzi;
                if(((z * z) + (zi * zi)) > 4) {
                    inset = false;
                    color = k * 10;
                    break;
                }
            }
            if (inset) {
                graphics.setPixel.call(graphics, j, i, 0, 0, 0);
            } else {
                color = color / iter * 255;
                graphics.setPixel.call(graphics, j, i, color, color / 2, color / 2);
            }
            x += dx;
        }
        y += dy;
        x = -2.05;
    }
    graphics.endDraw();
    console.log((new Date) - time);
}

start();