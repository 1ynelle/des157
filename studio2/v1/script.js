(function(){
    'use strict';
    
    const open = document.querySelectorAll('.open');
    const close = document.querySelectorAll('.close');
    const overlay = document.querySelector('#overlay');

    for (const eachBtn of open) {
        eachBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // const thisImg = e.target.id;
            // document.getElementsByClassName(`${thisImg}`).id = 'active-img';
            e.target.id = 'active-img';

            overlay.classList.add('active');
            close.classList.add('active');
        });
    }

    for (const eachBtn of close) {
        eachBtn.addEventListener('click', function(e) {
            e.preventDefault();

            for (const eachImg of open) {
                eachImg.removeAttribute('id');
            }
            overlay.classList.remove('active');
            close.classList.remove('active');
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            for (const eachImg of open) {
                eachImg.removeAttribute('id');
            }
            overlay.classList.remove('active');
            close.classList.remove('active');
        }
    });

    overlay.addEventListener('click', () => {
        for (const eachImg of open) {
            eachImg.removeAttribute('id');
        }
        overlay.classList.remove('active');
        close.classList.remove('active');
    });

})();