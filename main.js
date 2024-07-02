document.addEventListener("DOMContentLoaded", function() {
    const textoEmpresa = document.getElementById("textoEmpresa");
    const textoMissao = document.getElementById("textoMissao");
    const empresaItem = document.getElementById("empresaItem");
    const missaoItem = document.getElementById("missaoItem");
    

    textoEmpresa.style.opacity = 1;
    textoMissao.style.opacity = 0;
    
    let currentText = 1;
    let intervaloID = null; 
    

    function alternarTextos() {
      if (currentText === 1) {
        textoEmpresa.style.opacity = 0;
        textoMissao.style.opacity = 1;
        currentText = 2;
      } else {
        textoEmpresa.style.opacity = 1;
        textoMissao.style.opacity = 0;
        currentText = 1;
      }
    }
    
   
    intervaloID = setInterval(alternarTextos, 5000);
    
  empresaItem.addEventListener("mouseover", () => {
    textoEmpresa.style.opacity = 1;
    textoMissao.style.opacity = 0;
  });

  
  missaoItem.addEventListener("mouseover", () => {
    textoEmpresa.style.opacity = 0;
    textoMissao.style.opacity = 1;
  });

  
  empresaItem.addEventListener("click", () => {
    clearInterval(intervalID); 
    textoEmpresa.style.opacity = 1;
    textoMissao.style.opacity = 0;
    intervalID = setInterval(alternarTextos, 5000); 
  });

  missaoItem.addEventListener("click", () => {
    clearInterval(intervaloID); 
    textoEmpresa.style.opacity = 0;
    textoMissao.style.opacity = 1;
    intervalID = setInterval(alternarTextos, 5000); 
  });
});

  document.addEventListener("DOMContentLoaded", function() {
    const faqContainer = document.getElementById("faqContainer");
    const detalhes = document.querySelectorAll(".faq details");

    function ajustarAltura() {
        let alturaTotal = 0;
        detalhes.forEach(detalhe => {
            alturaTotal += detalhe.offsetHeight;
        });
        faqContainer.style.height = alturaTotal + "px";
    }

    
    const observer = new MutationObserver(ajustarAltura);
    detalhes.forEach(detalhe => {
        observer.observe(detalhe, { attributes: true, attributeFilter: ["open"] });
    });

    
    ajustarAltura();
});

function fecharAlerta() {
    document.getElementById("alerta").style.display = "none";
}
document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que o formulário seja enviado normalmente

        // Obter os valores dos campos
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const mensagem = document.getElementById("mensagem").value;

       

        // Limpar os campos do formulário
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
        document.getElementById("mensagem").value = "";

        // Exibir o alerta
        document.getElementById("alerta").style.display = "block";

        // Esconder o alerta após alguns segundos
        setTimeout(function() {
            document.getElementById("alerta").style.display = "none";
        }, 2000); // 5000 milissegundos = 5 segundos
    });
});

var isAdvancedUpload = function() {
  var div = document.createElement('div');
  return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

let draggableFileArea = document.querySelector(".drag-file-area");
let browseFileText = document.querySelector(".browse-files");
let uploadIcon = document.querySelector(".upload-icon");
let dragDropText = document.querySelector(".dynamic-message");
let fileInput = document.querySelector(".default-file-input");
let cannotUploadMessage = document.querySelector(".cannot-upload-message");
let cancelAlertButton = document.querySelector(".cancel-alert-button");
let uploadedFile = document.querySelector(".file-block");
let fileName = document.querySelector(".file-name");
let fileSize = document.querySelector(".file-size");
let progressBar = document.querySelector(".progress-bar");
let removeFileButton = document.querySelector(".remove-file-icon");
let uploadButton = document.querySelector(".upload-button");
let fileFlag = 0;

fileInput.addEventListener("click", () => {
  fileInput.value = '';
  console.log(fileInput.value);
});

fileInput.addEventListener("change", e => {
  console.log(" > " + fileInput.value)
  uploadIcon.innerHTML = 'check_circle';
  dragDropText.innerHTML = 'File Dropped Successfully!';
  document.querySelector(".label").innerHTML = `drag & drop or <span class="browse-files"> <input type="file" class="default-file-input" style=""/> <span class="browse-files-text"></span> <span></span> </span>`;
  uploadButton.innerHTML = `Upload`;
  fileName.innerHTML = fileInput.files[0].name;
  fileSize.innerHTML = (fileInput.files[0].size/1024).toFixed(1) + " KB";
  uploadedFile.style.cssText = "display: flex;";
  progressBar.style.width = 0;
  fileFlag = 0;
});

uploadButton.addEventListener("click", () => {
  let isFileUploaded = fileInput.value;
  if(isFileUploaded != '') {
      if (fileFlag == 0) {
          fileFlag = 1;
          var width = 0;
          var id = setInterval(frame, 50);
          function frame() {
              if (width >= 390) {
                  clearInterval(id);
                  uploadButton.innerHTML = `<span class="material-icons-outlined upload-button-icon"> check_circle </span> Envio Realizado com Sucesso`;
                  document.getElementById("job-application-form").submit(); // ENVIO DO FORMULÁRIO
              } else {
                  width += 5;
                  progressBar.style.width = width + "px";
              }
          }
      }
  } else {
      cannotUploadMessage.style.cssText = "display: flex; animation: fadeIn linear 1.5s;";
  }
});

cancelAlertButton.addEventListener("click", () => {
  cannotUploadMessage.style.cssText = "display: none;";
});

if(isAdvancedUpload) {
  ["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"].forEach( evt => 
      draggableFileArea.addEventListener(evt, e => {
          e.preventDefault();
          e.stopPropagation();
      })
  );

  ["dragover", "dragenter"].forEach( evt => {
      draggableFileArea.addEventListener(evt, e => {
          e.preventDefault();
          e.stopPropagation();
          uploadIcon.innerHTML = 'file_download';
          dragDropText.innerHTML = 'Drop your file here!';
      });
  });

  draggableFileArea.addEventListener("drop", e => {
      uploadIcon.innerHTML = 'check_circle';
      dragDropText.innerHTML = 'File Dropped Successfully!';
      document.querySelector(".label").innerHTML = `drag & drop or <span class="browse-files"> <input type="file" class="default-file-input" style=""/> <span class="browse-files-text" style="top: -23px; left: -20px;"> browse file</span> </span>`;
      uploadButton.innerHTML = `Upload`;
      
      let files = e.dataTransfer.files;
      fileInput.files = files;
      console.log(files[0].name + " " + files[0].size);
      console.log(document.querySelector(".default-file-input").value);
      fileName.innerHTML = files[0].name;
      fileSize.innerHTML = (files[0].size/1024).toFixed(1) + " KB";
      uploadedFile.style.cssText = "display: flex;";
      progressBar.style.width = 0;
      fileFlag = 0;
  });
}

removeFileButton.addEventListener("click", () => {
  uploadedFile.style.cssText = "display: none;";
  fileInput.value = '';
  uploadIcon.innerHTML = 'file_upload';
  dragDropText.innerHTML = 'Drag & drop any file here';
  document.querySelector(".label").innerHTML = `or <span class="browse-files"> <input type="file" class="default-file-input"/> <span class="browse-files-text">browse file</span> <span>from device</span> </span>`;
  uploadButton.innerHTML = `Upload`;
});


