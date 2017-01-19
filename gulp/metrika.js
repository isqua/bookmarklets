var map = require('vinyl-map');

function getCounterCode(counter) {
    if (counter) {
        return '<script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter' + counter + ' = new Ya.Metrika({ id:' + counter + ', clickmap:true, trackLinks:true, accurateTrackBounce:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script><noscript><div><img src="https://mc.yandex.ru/watch/' + counter + '" style="position:absolute; left:-9999px;" alt="" /></div></noscript>'
    }

    return '';
}

module.exports = function(counter) {
    return map(function(html) {
        return html.toString().replace('</body>', getCounterCode(counter) + '</body>');
    });
};
