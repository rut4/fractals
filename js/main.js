$('#preview').hide();
$('#download').hide();

var nanobar = new Nanobar({
    id: 'nanobar'
});

$('#draw').on('click', function () {
    var options = {
        width: $('#width').val(),
        height: $('#height').val(),
        iterations: parseInt($('#iterations').val())
    };

    $('#canvas').attr('width', options.width);
    $('#canvas').attr('height', options.height);

    var processor = new Processor(nanobar);
    processor.drawMandelbrot(options, function () {
        var el = document.getElementById('canvas');
        var img = el.toDataURL("image/png");
        $('#download').attr('href', img).fadeIn(500);
        $('#preview').attr('src', img).fadeIn(500);
    });
});
