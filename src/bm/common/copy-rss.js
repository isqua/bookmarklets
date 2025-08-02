(async function() {
    function copy(text) {
        return navigator.clipboard.writeText(text).catch(e => console.error(e))
    }

    let links = Array.from(document.head.children)
        .filter(element => element instanceof HTMLLinkElement && element.rel === 'alternate');
    
    let atom = links.find(elem => elem.getAttribute('type') === 'application/atom+xml');

    if (atom) {
        await copy(atom.getAttribute('href'));
        return;
    }

    let rss = links.find(elem => elem.getAttribute('type') === 'application/rss+xml');

    if (rss) {
        await copy(rss.getAttribute('href'));
        return;
    }

    alert('RSS feed not found');
})();
