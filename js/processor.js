function Processor(progressbar) {

    this.drawMandelbrot = function (options, callback) {
        var canvas = new Canvas;

        var worker = new Worker('js/processor/mandelbrot.js')
        ,   time = new Date;

        worker.onmessage = function (ev) {
            if (process = ev.data.process) {
                progressbar.go(process * 100);
            } else {
                progressbar.go(100);
                var pd = canvas.getPixelData();
                for (var i = 0; i < pd.length; i++) {
                    pd[i] = ev.data.pixelData[i];
                }
                canvas.setPixelData(pd, 0, 0);
                console.log(new Date() - time);
                callback();
            }
        };

        worker.postMessage({
            pixelData: canvas.getPixelData(),
            height: canvas.getHeight(),
            width: canvas.getWidth(),
            iterations: options.iterations
        });
    }
}
