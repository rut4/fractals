function Graphics() {
    var canvas, pixelData;

    this.init = function (canvas) {
        return canvas = (canvas instanceof Canvas) && canvas || new Canvas;
    }

    function getCanvas() {
        return canvas || (canvas = this.init());
    }

    this.startDraw = function () {
        pixelData = getCanvas.call(this).getPixelData();
    }

    this.setPixel = function (x, y, r, g, b, a) {
        if (x < 0 || x > canvas.getWidth()
            || y < 0 || y > canvas.getHeight()) {
            throwError('Invalid coordinats');
        }
        a = a || 255;

        var data = [r, g, b, a]
        ,   index = (x + y * getCanvas.call(this).getWidth()) * 4;

        for (var i = 0; i < 4; i++) {
            pixelData[index + i] = data[i];
        }
    }

    this.endDraw = function () {
        getCanvas.call(this).setPixelData(pixelData, 0, 0);
    }
}