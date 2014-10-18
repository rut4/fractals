function Processor(progressbar) {

    this.drawMandelbrot = function (options, callback) {
        var canvas = new Canvas;

        var worker = new Worker('js/processor/mandelbrot.js');

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

    this.drawJulia = function (options, callback) {
        var canvas = new Canvas;
        var worker = new Worker('js/processor/julia.js');

        worker.onmessage = function (event) {
            if (process = event.data.process) {
                progressbar.go(process * 100);
            } else {
                progressbar.go(100);
                var pd = canvas.getPixelData();
                for (var i = 0; i < pd.length; i++) {
                    pd[i] = event.data.pixelData[i];
                }
                canvas.setPixelData(pd, 0, 0);
                callback();
            }
        };

        worker.postMessage({
            pixelData: canvas.getPixelData(),
            height: canvas.getHeight(),
            width: canvas.getWidth(),
            iterations: options.iterations,
            c: options.c
        });
    }
}
