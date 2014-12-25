function Processor(progressbar) {
    this.drawFractal = function (name, options, callback) {
        var canvas = new Canvas;
        var worker = new Worker('js/processor/' + name + '.js');

        worker.onmessage = function (event) {
            if (dump = event.data.dump) {
                console.log(dump);
            } else if (process = event.data.process) {
                progressbar.go(process * 100);
            } else if (event.data.pixelData) {
                var pd = canvas.getPixelData();
                for (var i = 0; i < pd.length; i++) {
                    pd[i] = event.data.pixelData[i];
                }
                canvas.setPixelData(pd, 0, 0);
                callback();
            }
        };

        options.pixelData = canvas.getPixelData();
        worker.postMessage(options);
    }
}
