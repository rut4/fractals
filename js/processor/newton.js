var pixelData = []
,   width, height, max = 1e+6, min = 1e-6;

function process(iterations) {
    
    var midX = width / 2,
        midY = height / 2;

    for (var j = -midY; j < midY; j ++) {
        for (var i = -midX; i < midX; i++) {
            var n = 0,
                z = {
                real: i * 0.005,
                imaginary: j * 0.005
            };

            var d = {};
            d.real = z.real;
            d.imaginary = z.imaginary;

            while ((Math.pow(z.real, 2) + Math.pow(z.imaginary, 2) < max) &&
                (Math.pow(d.real, 2) + Math.pow(d.imaginary, 2) > min) && n < iterations) {
                var t = {};
                t.real = z.real;
                t.imaginary = z.imaginary;

                /** z^3 - 1 **/
                var p = Math.pow(Math.pow(t.real, 2) + Math.pow(t.imaginary, 2), 2);
                z.real = (2/3) * t.real + (Math.pow(t.real, 2) - Math.pow(t.imaginary, 2)) / (3 * p);
                z.imaginary = (2/3) * t.imaginary * (1 - t.real / p);
                d.real = Math.abs(t.real - z.real);
                d.imaginary = Math.abs(t.imaginary - z.imaginary);
                n++;
            }
            addToPixelData(i + midX, j + midY, complexHeatMap(n, iterations));
        }
        postMessage({process: (j + midY + 1) / width});
    }

    postMessage({
        pixelData: pixelData
    });
}

function complexMod(z) {
    return Math.sqrt(Math.pow(z.real, 2) + Math.pow(z.imaginary, 2));
}

function complexHeatMap(value, max) {
    var val = value / max;
    var heatArr = [255, 255, 255, 255];
    var elem = 0;
    if (val >= 2/3) {
        elem = 2;
    } else if (val >= 1/3) {
        elem = 1;
    }
    heatArr[elem] = 255 * (1 - val);
    heatArr[(elem + 1) % 3] *= (1 - val) / 2;
    return heatArr;
}


function addToPixelData(x, y, data) {
    var index = (x + y * width) * 4;

    for (var i = 0; i < 4; i++) {
        pixelData[index + i] = data[i];
    }
}

onmessage = function (event) {
    pixelData = event.data.pixelData;
    width = event.data.width;
    height = event.data.height;
    process(
        +event.data.iterations
    );
};

