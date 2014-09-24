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

    this.getWidth = function() {
        if (!width) {
            width = getCanvas().width;
        }
        return width;
    }

    this.getHeight = function() {
        if (!height) {
            height = getCanvas().height;
        }
        return height;
    }

    function getImageData() {
        if (!imageData) {
            imageData = getContext().createImageData(this.getWidth(), this.getHeight());
        }
        return imageData;
    }

    function setImageData(imageData, x, y) {
        getContext().putImageData(imageData, x, y);
    }

    this.getPixelData = function() {
        return getImageData.call(this).data;
    }

    this.setPixelData = function(pixelData, x, y) {
        var imageData = getImageData();
        imageData.data = pixelData;
        setImageData(imageData, x, y);
    }
}
