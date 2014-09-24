function throwError(message) {
    throw new Error(message);
}

function Canvas() {
    var canvas, context, width, height, imageData;

    function getCanvas() {
        if (!canvas) {
            canvas = document.getElementById('canvas') 
                || throwError('Canvas is not available');
        }
        return canvas;
    }

    function getContext() {
        if (!context) {
            context = getCanvas().getContext('2d');
        }
        return context;
    }

    function getWidth() {
        if (!width) {
            width = getCanvas().width;
        }
        return width;
    }

    function getHeight() {
        if (!height) {
            height = getCanvas().height;
        }
        return height;
    }

    function getImageData() {
        if (!imageData) {
            imageData = getContext().createImageData(getWidth(), getHeight());
        }
        return imageData;
    }

    function setImageData(imageData, x, y) {
        getContext().putImageData(imageData, x, y);
    }

    function getPixelData() {
        return getImageData().data;
    }

    function setPixelData(pixelData, x, y) {
        var imageData = getImageData();
        imageData.data = pixelData;
        setImageData(imageData, x, y);
    }

    this.setPixel = function (x, y, r, g, b, a) {
        a = a || 255;
        var data = [r, g, b, a]
        ,   pixelData = getPixelData()
        ,   index = (x + y * getWidth()) * 4;

        for (var i = 0; i < 4; i++) {
            pixelData[index + i] = data[i];
        }

        setPixelData(pixelData, 0, 0);
    }
}

var canvas = new Canvas;

for (var i = 0; i < 100; i++) {
    canvas.setPixel(i, i, 255, 0, 0);
}

