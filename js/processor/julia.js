var pixelData = []
,   width, height;

function process(c, iterations, xMin, yMin, xMax, yMax) {
    var r = calculateR(c);
    if (!(xMin && yMin && xMax && yMax)) {
        xMin = -r;
        yMin = -r;
        xMax = r;
        yMax = r;
    }
    xStep = Math.abs(xMax - xMin) / width;
    yStep = Math.abs(yMax - yMin) / height;

    xyIdx = [];
    var maxIdx = 0;
    for (var i = 0; i < width; i++) {
        xyIdx[i] = [];
        for (var j = 0; j < height; j++) {
            var x = xMin + i * xStep
            ,   y = yMin + j * yStep
            ,   z = {
                real: x,
                imaginary: y
            }
            ,   zIter = sqPolyIterations(z, c, iterations, r);

            var idx = zIter.length - 1;
            if (maxIdx < idx) {
                maxIdx = idx;
            }
            xyIdx[i][j] = idx;
        }
        postMessage({process: (i + 1) / width});
    }
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            var idx = xyIdx[i][j]
            ,   x = xMin + i * xStep
            ,   y = yMin + j * yStep
            ,   z = {
                real: x,
                imaginary: y
            };

            addToPixelData(width - i - 1, j, complexHeatMap(idx, 0, maxIdx, z, r));
        }
    }
    postMessage({
        pixelData: pixelData
    });
}

function sqPolyIterations(z0, c, n, r) {
    r = r || 0;
    var res = [];
    res.push(z0);
    for (var i = 0; i < n; i++) {
        var last = res[res.length - 1];
        if (r > 0 && complexMod(last) > r) {
            break;
        }
        res.push({
            real: Math.pow(last.real, 2) - Math.pow(last.imaginary, 2) + parseFloat(c.real),
            imaginary: 2 * last.real * last.imaginary + parseFloat(c.imaginary)
        });
    }
    return res;
}

function calculateR(c) {
    return (1 + Math.sqrt(1 + 4 * complexMod(c))) / 2;
}

function complexHeatMap(value, min, max, z, r) {
    var val = (value - min) / (max - min);

    return [
        255 * (1 - val),
        255 * (1 - val) / 2,
        255 * (1 - val) / 3,
        255
    ];
}

function complexMod(z) {
    return Math.sqrt(Math.pow(z.real, 2) + Math.pow(z.imaginary, 2));
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
        event.data.c,
        +event.data.iterations,
        +event.data.xMin,
        +event.data.yMin,
        +event.data.xMax,
        +event.data.yMax
    );
};

