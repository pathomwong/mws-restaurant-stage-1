if (navigator.serviceWorker) {
    navigator.serviceWorker.register('serviceworker.js')
    .then((reg) => {
        console.log('[serviceWorker]::register::', reg);
    }).catch((err) => {
        console.log('[serviceWorker]::register failed::', err);
    });
}
