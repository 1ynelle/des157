(function(){
    'use strict';
    
    const collection = document.querySelectorAll('main .open');
    const open = document.querySelectorAll('section .open'); 
    const close = document.querySelectorAll('.close');
    
    const modal = document.querySelectorAll('.modal');
    const overlay = document.querySelector('.overlay');

    const myImages =  [
        'img1.jpg',
        'img2.jpg',
        'img3.jpg',
        'img4.jpg',
        'img5.jpg'];

    let currentImage = 0;

    // usertest tasks
    alert("Welcome! Please test the following:\n1. Hover over the images on the home page before clicking on them\n2. Click on the images inside the pages.\n3. Test the navigation links inside the pages.");

    // applied to each image on the home page
    for (const eachImg of collection) {
        eachImg.addEventListener('mouseover', function() {
            const title = eachImg.getAttribute("data-title");
            const place = eachImg.getAttribute("data-place");

            document.querySelector('h1').innerHTML = title;

            // start auto slideshow on hover 
            const next = setInterval(nextPhoto, 700);

            function nextPhoto() {
                currentImage++;

                if (currentImage > myImages.length-1) {
                    currentImage = 0;
                }

                eachImg.getElementsByTagName('img')[0].src = `images/${place}/${myImages[currentImage]}`;
            }

            eachImg.addEventListener('mouseout', function() {
                clearInterval(next);
            });
            
        });

        // stop auto slideshow
        eachImg.addEventListener('mouseout', function() {
            document.querySelector('h1').innerHTML = "China 2019";
        });
    }




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