var pixelData = []
,   width, height, maxN;

function process(order) {
    maxN = order;

    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            addToPixelData(i, j, [255, 255, 255, 255]);
        }
    }

    sierpinski(0, 0, width, height, order);

    postMessage({process: 1});

    postMessage({
        pixelData: pixelData
    });
}

function sierpinski(x1, y1, x2, y2, n) {
    if (!n) {
        return;
    }

    var newX1 = Math.round(2 * x1 / 3 + x2 / 3),
        newX2 = Math.round(x1 / 3 + 2 * x2 / 3),
        newY1 = Math.round(2 * y1 / 3 + y2 / 3),
        newY2 = Math.round(y1 / 3 + 2 * y2 / 3);

    drawRectangle(newX1, newY1, newX2, newY2);

    postMessage({process: 1 - (n / maxN)});

    sierpinski(x1, y1, newX1, newY1, n-1);
    sierpinski(newX1, y1, newX2, newY1, n-1);
    sierpinski(newX2, y1, x2, newY1, n-1);
    sierpinski(x1, newY1, newX1, newY2, n-1);
    sierpinski(newX2, newY1, x2, newY2, n-1);
    sierpinski(x1, newY2, newX1, y2, n-1);
    sierpinski(newX1, newY2, newX2, y2, n-1);
    sierpinski(newX2, newY2, x2, y2, n-1);
}

function drawRectangle(x1, y1, x2, y2) {
    for (var i = x1; i <= x2; i++) {
        addToPixelData(i, y1, [0, 0, 0, 255]);
        addToPixelData(i, y2, [0, 0, 0, 255]);
    }
    for (var i = y1; i <= y2; i++) {
        addToPixelData(x1, i, [0, 0, 0, 255]);
        addToPixelData(x2, i, [0, 0, 0, 255]);
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
