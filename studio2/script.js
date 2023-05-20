(function(){
    'use strict';
    
    const open = document.querySelectorAll('.open'); 
    const close = document.querySelectorAll('.close');
    
    const modal = document.querySelectorAll('.modal');
    const overlay = document.querySelector('.overlay');

    //Opening Overlay ----------------------------
    for (const eachBtn of open) {
        eachBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // get id of closest parent with "open" class
            const thisImg = e.target.closest('.open').id;

            // show image overlay
            document.getElementById(`ol-${thisImg}`).classList.remove('hidden');

            // show dimmed bg
            overlay.classList.remove('hidden');

            // hide clickable images
            e.target.closest('.open').classList.add('hidden');

        });
    }


    // Closing Overlay -----------------------------

    // x
    for (const eachBtn of close) {
        eachBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
        });
    }

    // clicking dim bg
    overlay.addEventListener('click', () => {
        closeModal();
    });
    
    // esc
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    
    // function for closing overlay
    function closeModal() {
        // hide image overlay
            for (const eachModal of modal) {
            eachModal.classList.add('hidden');
        }

        // show clickable images
        for (const eachImg of open) {
            eachImg.classList.remove('hidden');
        }
        
        // hide dimmed bg
        overlay.classList.add('hidden');
    }

})();