/*responsividade navbar*/
document.addEventListener("DOMContentLoaded", function() {
    var header = document.querySelector(".header");
    var mainMenu = document.querySelector(".main-menu");
    var menuItems = document.querySelectorAll(".main-menu .nav-link");
    var menuToggle = document.querySelector(".mobile-menu");

    menuToggle.addEventListener("click", function() {
      mainMenu.classList.toggle("active");
    });

    window.addEventListener("scroll", function() {
      if (window.scrollY > 50) {
        header.classList.add("fixed");
      } else {
        header.classList.remove("fixed");
      }
    });

    menuItems.forEach(function(item) {
      item.addEventListener("click", function(event) {
        var href = this.getAttribute("href");
        
        // Verifica se é um link interno (começa com #)
        if (href.startsWith("#")) {
          event.preventDefault();
          var targetId = href.substring(1);
          var targetSection = document.getElementById(targetId);

          mainMenu.classList.remove("active");

          window.scrollTo({
            top: targetSection.offsetTop - header.offsetHeight,
            behavior: "smooth"
          });
        }
      });
    });
});


/* Click Contato*/
const mobileContact = document.getElementById('mobile-contact'); 
const footer = document.getElementById('footer');

mobileContact.addEventListener('click', () => { 
  const footerTop = footer.offsetTop;
  window.scrollTo({
    top: footerTop,
    behavior: 'smooth'
  });
});


/*Formulário */  
document.addEventListener("DOMContentLoaded", function() {
  const formulario = document.getElementById("job-application-form");

  formulario.addEventListener("submit", function(event) {
      event.preventDefault(); 
      const formData = new FormData(formulario);

      fetch('/send-email', {
          method: 'POST',
          body: formData
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro ao enviar o formulário');
          }
          return response.json();
      })
      .then(data => {
         
          Swal.fire({
              title: 'Sucesso!',
              text: 'Seu currículo foi enviado com sucesso!',
              icon: 'success',
              confirmButtonText: 'OK'
          });
          formulario.reset(); 
      })
      .catch(error => {
          
          Swal.fire({
              title: 'Erro!',
              text: 'Verifique novamente o preenchimento dos campos: ' + error.message,
              icon: 'error',
              confirmButtonText: 'OK'
          });
      });
  });
});
