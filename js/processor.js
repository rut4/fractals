function Processor(progressbar) {

    this.drawMandelbrot = function () {
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
                var el = document.getElementById('canvas');
                var img    = el.toDataURL("image/png");
                // document.write('<img src="'+img+'">');
                $('#preview').attr('src', img).fadeIn(500);
            }
        };

        worker.postMessage({
            pixelData: canvas.getPixelData(),
            height: canvas.getHeight(),
            width: canvas.getWidth()
        });
    }
}
