(function(){
    let links = Array.from(document.head.children)
        .filter(element => element instanceof HTMLLinkElement && element.rel === 'alternate');
    
    let atom = links.find(elem => elem.getAttribute('type') === 'application/atom+xml');

    if (atom) {
        window.open(atom.getAttribute('href'));
        return;
    }

    let rss = links.find(elem => elem.getAttribute('type') === 'application/rss+xml');

    if (rss) {
        window.open(rss.getAttribute('href'));
        return;
    }

    alert('RSS feed not found');
})();
