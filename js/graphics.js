function Graphics() {
    var canvas, pixelData, that = this;

    this.init = function (canvas) {
        return canvas = (canvas instanceof Canvas) && canvas || new Canvas;
    }

    function getCanvas() {
        return canvas || (canvas = that.init());
    }

    this.startDraw = function () {
        pixelData = getCanvas.call(that).getPixelData();
    }

    this.setPixel = function (x, y, r, g, b, a) {
        if (x < 0 || x > canvas.getWidth()
            || y < 0 || y > canvas.getHeight()) {
            throwError('Invalid coordinats');
        }
        a = a || 255;

        var data = [r, g, b, a]
        ,   index = (x + y * getCanvas.call(that).getWidth()) * 4;

        for (var i = 0; i < 4; i++) {
            pixelData[index + i] = data[i];
        }
    }

    this.endDraw = function () {
        getCanvas.call(that).setPixelData(pixelData, 0, 0);
    }

    this.getPixelData = function () {
        return pixelData;
    }

    this.setPixelData = function (data) {
       pixelData = data;
    }
}