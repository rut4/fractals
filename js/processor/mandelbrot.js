var pixelData = []
,   width, height;

function process(iterations, xMin, yMin, xMax, yMax) {
    var dx = Math.abs(xMax - xMin) / width
    ,   dy = Math.abs(yMax - yMin) / height
    ,   c = {
        real: xMin,
        imaginary: yMin
    };

    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            var z = {
                real: 0,
                imaginary: 0
            }
            ,   inset = true
            ,   color;

            for (var k = 0; k < iterations; k++) {
                var newZ = {
                    real: (z.real * z.real) - (z.imaginary * z.imaginary) + c.real,
                    imaginary: 2 * z.real * z.imaginary + c.imaginary
                };
                z = newZ;
                if(complexMod(z) > 2) {
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
            c.real += dx;
        }
        c.imaginary += dy;
        c.real = xMin;
        postMessage({process: (i + 1) / height});
    }
    postMessage({pixelData: pixelData});
}

function complexMod(z) {
    return Math.sqrt(Math.pow(z.real, 2) + Math.pow(z.imaginary, 2));
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
    process(
        +ev.data.iterations,
        +ev.data.xMin,
        +ev.data.yMin,
        +ev.data.xMax,
        +ev.data.yMax
    );
};
