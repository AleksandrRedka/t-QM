const parralax = document.getElementById('parallax-js')
const parallaxInstance = new Parallax(parralax)


$('#copy-code-js').on('click',function(){
    const str = $('#promo-code').text();

    const area = document.createElement('textarea');

    document.body.appendChild(area);
    area.value = str;
    area.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful?'copied':'not copied';
        alert('Promo code '+msg);
    } catch(err) {
        alert('Code not copied. Try later please.');
    }
    document.body.removeChild(area);
});
