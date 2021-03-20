window.onload = function(ev) {
    document.querySelectorAll('.sidebar-section')
            .forEach(el => {
                el.addEventListener('click', evt => {
                    evt.target.classList.toggle('open');
                    evt.target.classList.toggle('closed');
                });
                el.classList.toggle('open');
                el.classList.toggle('closed');
            });
};
