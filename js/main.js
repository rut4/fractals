$('#preview').hide();

var nanobar = new Nanobar({
    id: 'nanobar'
});

$('#draw').on('click', function () {
    $('#canvas').attr('width', $('#size').val());
    $('#canvas').attr('height', $('#size').val());
    var processor = new Processor(nanobar);
    processor.drawMandelbrot();
});
