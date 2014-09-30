var pixelData = []
,   width, height;

function process(iterations) {
    var dx = 2.6 / width;
    var dy = 2.4 / height;

    var x = -2.05
    ,   y = -1.2
    ,   color;

    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            var real = 0
            ,   imaginary = 0
            ,   inset = true;

            for (var k = 0; k < iterations; k++) {
                var newReal = (real * real) - (imaginary * imaginary) + x
                ,   newImaginary = 2 * real * imaginary + y;

                real = newReal;
                imaginary = newImaginary;
                if(((real * real) + (imaginary * imaginary)) > 4) {
                    inset = false;
                    color = k * 10;
                    break;
                }
            }
            if (inset) {
                addToPixelData(j, i, 0, 0, 0);
            } else {
                color = color / iterations * 255 | 0;
                addToPixelData(j, i, color, color / 2, color / 2);
            }
            x += dx;
        }
        y += dy;
        x = -2.05;
        postMessage({process: (y + 1.2) / 2.4, iter: iterations});
    }
    postMessage({pixelData: pixelData});
}

function addToPixelData(x, y, r, g, b, a) {
    a = a || 255;

    var data = [r, g, b, a]
    ,   index = (x + y * width) * 4;

    for (var i = 0; i < 4; i++) {
        pixelData[index + i] = data[i];
    }
}

onmessage = function (ev) {
    pixelData = ev.data.pixelData;
    width = ev.data.width;
    height = ev.data.height;
    process(ev.data.iterations);
};
