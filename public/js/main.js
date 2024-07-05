document.addEventListener("DOMContentLoaded", function() {
  const formulario = document.getElementById("job-application-form");

  formulario.addEventListener("submit", function(event) {
      event.preventDefault(); // Evita que o formulário seja enviado normalmente

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
          // Exibe um alerta usando SweetAlert2 após o envio do formulário
          Swal.fire({
              title: 'Sucesso!',
              text: 'Seu currículo foi enviado com sucesso!',
              icon: 'success',
              confirmButtonText: 'OK'
          });
          formulario.reset(); // Limpa o formulário após o envio
      })
      .catch(error => {
          // Exibe um alerta em caso de erro na requisição fetch
          Swal.fire({
              title: 'Erro!',
              text: 'Verifique novamente o preenchimento dos campos: ' + error.message,
              icon: 'error',
              confirmButtonText: 'OK'
          });
      });
  });
});
