const buttons = document.querySelectorAll('button.copy');

async function copyCodeToClipboard(event) {
    const code = event.target.dataset && event.target.dataset.code;

    if (typeof code === 'string') {
        const type = 'text/plain';
        const clipboardItem = new ClipboardItem({ [type]: new Blob([code], { type }) });

        await navigator.clipboard.write([clipboardItem]);
    }
}

for (const button of buttons) {
    button.addEventListener('click', copyCodeToClipboard);
}
