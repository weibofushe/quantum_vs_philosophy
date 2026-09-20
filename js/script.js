(function () {
    var title = document.querySelector('.title');
    if (!title) return;

    title.style.visibility = 'visible';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var text = title.textContent.trim();
    title.setAttribute('aria-label', text);
    title.textContent = '';

    var wrap = document.createElement('span');
    wrap.setAttribute('aria-hidden', 'true');

    var chars = text.split('').map(function (c) {
        var span = document.createElement('span');
        span.className = 'ch';
        span.textContent = c;
        wrap.appendChild(span);
        return span;
    });

    var caret = document.createElement('span');
    caret.className = 'caret';
    wrap.insertBefore(caret, chars[0]);
    title.appendChild(wrap);

    function type(i) {
        if (i >= chars.length) {
            caret.classList.add('done');
            return;
        }
        chars[i].classList.add('on');
        wrap.insertBefore(caret, chars[i + 1] || null);
        setTimeout(function () { type(i + 1); }, 45 + (i % 3) * 22);
    }

    setTimeout(function () { type(0); }, 400);
})();
