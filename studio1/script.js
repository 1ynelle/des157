(function() {
    'use strict';

    const myForm = document.querySelector('#myform');
    const madLib = document.querySelector('#madlib');
        
    myForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const noun = document.querySelector('#noun').value;
        const verb1 = document.querySelector('#verb1').value;
        const verb2 = document.querySelector('#verb2').value;
        const adj = document.querySelector('#adj').value;

        let myText;
        if (noun && verb1 && verb2 && adj) {
            myText = `To make a(n) ${noun}, you need some flour, eggs, and sugar. First, ${verb1} the ingredients together. Then add them to a(n) pan and bake until ${adj}. Finally, take out the ${noun} and let it rest for a few minutes before ${verb2}ing your amazing work.`
        } else {
            myText = "Please give me words so I can make your Mad Lib!";
        }

        madLib.innerHTML = myText;

        const formData = document.querySelectorAll('input[type=text]');
        for (let eachField of formData) {
            eachField.value = "";
        }
    });

})();