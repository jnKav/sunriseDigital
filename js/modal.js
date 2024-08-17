document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("openModalBtn");
    const span = document.getElementsByClassName('close')[0];
    const form = document.getElementById('devis-form');
    const formMessage = document.getElementById('devis__msg');
    
    btn.onclick = () => {
        modal.style.display = 'block';
    };

    span.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    form.onsubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('mail.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                formMessage.fadeIn().removeClass("alert-danger").addClass("alert-success");
                formMessage.textContent = 'Merci! Votre message a été envoyé.';
                form.reset();
                // Masquer le modal après 3 secondes.
                setTimeout(()=> {
                    formMessage.fadeOut();
                    modal.style.display ='none';
                },2000);
            } else {
                formMessage.fadeIn().removeClass("alert-success").addClass("alert-danger");
                formMessage.textContent = 'Oops! Un problème s\'est produit, nous n\'avons pas pu envoyer votre message. Veuillez réessayer.';
                setTimeout(function () {
                    formMessage.fadeOut();
                }, 2000);
            }
        })
        .catch(error => {
            formMessage.fadeIn().removeClass("alert-success").addClass("alert-danger");
            formMessage.textContent = 'Il y a eu un problème avec votre soumission, veuillez réessayer.';
            console.error('Error:', error);
        });
    };
   
});
    