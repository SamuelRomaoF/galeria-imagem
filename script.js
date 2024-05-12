document.addEventListener("DOMContentLoaded", function () {
    // Inclui jQuery
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    document.head.appendChild(script);
  
    const fileInput = document.querySelector('#exampleFormControlFile1');
    const carouselInner = document.querySelector('.carousel-inner');
  
    // botao enviar funcionando
    const btnEnviar = document.getElementById('btnEnviar');
    if (btnEnviar) {
      btnEnviar.addEventListener('click', function () {
        console.log('Botão Enviar clicado');
        const file = fileInput.files[0];
        if (file) {
          
          const newItem = document.createElement('div');
          newItem.classList.add('carousel-item');
          newItem.classList.add('active');
  
          
          const newImage = document.createElement('img');
          newImage.classList.add('d-block', 'w-100');
  
          
          const fileURL = URL.createObjectURL(file);
          newImage.src = fileURL;
          newItem.appendChild(newImage);
  
          // Adiciona o nome e a data da imagem
          const now = new Date();
          const name = prompt('Digite o seu nome:');
          newItem.dataset.name = name;
          newItem.dataset.date = now.toLocaleDateString();

          const newCaption = document.createElement('div');
          newCaption.classList.add('carousel-caption');
          newCaption.classList.add('d-none');
          newCaption.classList.add('d-md-block');


          const nameElement = document.createElement('h5');
          nameElement.textContent = name;
          newCaption.appendChild(nameElement);
  
          const dateElement = document.createElement('p');
          dateElement.textContent = now.toLocaleDateString();
          newCaption.appendChild(dateElement);
  
          
          newItem.appendChild(newCaption);
  
          
          carouselInner.appendChild(newItem);
  
          // Limpa o input de arquivo
          fileInput.value = '';
  
          // Salva a imagem no local
          saveImageToLocalStorage(file, name, now);
        } else {
          alert('Por favor, selecione uma imagem para enviar.');
        }
      });
    }
  
    // Carrega as imagens salvas no local
    for (const image of JSON.parse(localStorage.getItem('images')) || []) {
      const newItem = document.createElement('div');
      newItem.classList.add('carousel-item');
  
      const newImage = document.createElement('img');
      newImage.classList.add('d-block', 'w-100');
      newImage.src = image.src;
      newItem.appendChild(newImage);
  
      newItem.dataset.name = image.name;
      newItem.dataset.date = image.date;
  
      
      const newCaption = document.createElement('div');
      newCaption.classList.add('carousel-caption');
      newCaption.classList.add('d-none');
      newCaption.classList.add('d-md-block');
  
      // Adicionar nome e data
     const nameElement = document.createElement('h5');
      nameElement.textContent = image.name;
      newCaption.appendChild(nameElement);
  
      const dateElement = document.createElement('p');
      dateElement.textContent = image.date;
      newCaption.appendChild(dateElement);
  
      
      newItem.appendChild(newCaption);
  
      carouselInner.appendChild(newItem);
    }
  
    
    $(document).ready(function () {
      $('.carousel').carousel(0);
    });
  
    // deletar as imagens
    document.getElementById('clear-cache-button').addEventListener('click', function() {
      localStorage.clear();
      window.location.reload();
    });
  });

/**
   * salvar imagem no site mesmo
   * @param {File} file
   * @param {string} name
   * @param {Date} date
   */
  function saveImageToLocalStorage(file, name, date) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const image = {
        src: event.target.result,
        name,
        date: date.toLocaleDateString(),
      };


      const images = JSON.parse(localStorage.getItem('images')) || [];
      images.push(image);
      localStorage.setItem('images', JSON.stringify(images));
    }

    reader.readAsDataURL(file);
}