var pixelData = []
,   width, height, maxN;

function process(order) {


    maxN = order;

    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            addToPixelData(i, j, [255, 255, 255, 255]);
        }
    }

    dragon(
        Math.round(3 / 8 * width),
        Math.round(3 / 8 * height),
        Math.round(5 / 8 * width),
        Math.round(5 / 8 * height),
        order
    );

    postMessage({process: 1});

    postMessage({
        pixelData: pixelData
    });
}

function dragon(x1, y1, x2, y2, n) {
    if (!n) {
        drawLine(x1, y1, x2, y2);
        return;
    }

    postMessage({process: 1 - (n / maxN)});

    var xb = Math.round((x1 + x2) / 2 + (y2 - y1) / 2),
        yb = Math.round((y1 + y2) / 2 - (x2 - x1) / 2);

    dragon(x1, y1, xb, yb, n - 1);
    dragon(x2, y2, xb, yb, n - 1);
}

function drawLine(x1, y1, x2, y2) {
    if (x2 < x1) {
        var t = x2;
        x2 = x1;
        x1 = t;
    }
    if (y2 < y1) {
        var t = y2;
        y2 = y1;
        y1 = t;
    }

    var dx = Math.abs(x2 - x1),
        dy = Math.abs(y2 - y1)
        error = 0,
        dError = dy,
        y = y1;

    for (var x = x1; x <= x2; x++) {
        addToPixelData(x, y, [0, 0, 0, 255]);
        error += dError;
        if (2 * error >= dError) {
            y++;
            error -= dx;
        }
    }
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
        +event.data.order
    );
};
