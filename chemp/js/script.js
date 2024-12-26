document.addEventListener('DOMContentLoaded', function() {
  const contentDiv = document.getElementById('content');
  const path = window.location.pathname;
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const navLinks = document.querySelectorAll('header nav a');
  const authDiv = document.getElementById('auth');
  const registerLink = document.getElementById('register-link');
  const navToIndexLinks = document.querySelectorAll('header nav a.nav-to-index')

  
function loadContent(pageName, callback) {
  fetch(pageName)
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Не удалось загрузить контент');
      }
    })
    .then(data => {
      contentDiv.innerHTML = data;
      if (callback) callback();
        
         initSliders();
         initFeedbackSliders();
    })
    .catch(error => {
        console.error("Ошибка при загрузке ресурса:", error)
         
        load404Content()
    });
}

  function load404Content() {
    fetch('404.html')
      .then(response => response.text())
      .then(data => {
        contentDiv.innerHTML = data;
        document.title = 'Страница не найдена';
      });
  }

  
   function setActiveLink() {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
          } else {
              link.classList.remove('active');
          }
      });
  }

  
   themeToggle.addEventListener('click', () => {
       body.classList.toggle('dark-theme');
       themeToggle.innerHTML = body.classList.contains('dark-theme') ? '&#9728;' : '&#127769;'
        localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
  });


  
 if (localStorage.getItem('theme') === 'dark'){
      body.classList.add('dark-theme');
      themeToggle.innerHTML = '&#9728;'; 
  } else {
       body.classList.remove('dark-theme');
       themeToggle.innerHTML = '&#127769;' 
  }

function addProfileLink() {
 if (!document.querySelector('header nav a[href="profile.html"]')) {
   const profileLink = document.createElement('a');
   profileLink.href = 'profile.html';
   profileLink.textContent = 'Личный кабинет';
   document.querySelector('header nav').insertBefore(profileLink, document.querySelector('header nav a[href="#about"]'));
 }
   if (registerLink)
     registerLink.style.display = 'none';
}

function removeProfileLink() {
 const profileLink = document.querySelector('header nav a[href="profile.html"]');
  if (profileLink){
    profileLink.remove();
    if(registerLink)
     registerLink.style.display = '';
   }
}


function isAuthenticated(){
    return localStorage.getItem('isAuthenticated') === 'true'
}


document.addEventListener('submit', function(e) {
   if(e.target.closest('.auth form')){
      e.preventDefault();
      const email = e.target.querySelector('input[type="email"]').value;
     const password = e.target.querySelector('input[type="password"]').value;

     if (email === 'user@mail.ru' && password === '123'){
          localStorage.setItem('isAuthenticated', 'true');
          window.location.href = '/index.html';
     } else {
           alert('Неверный логин или пароль')
     }
   }
   if (e.target.closest('#register-form')){
     e.preventDefault();
     localStorage.setItem('isAuthenticated', 'true')
     window.location.href = '/index.html'
   }
});

function initFeedbackSliders(){
   const slider = document.querySelector('.feedback-slider');

  if (slider){
        let slideIndex = 0;
     const slides = slider.querySelectorAll('.feedback-slide');
     function updateFeedbackSlider() {
        slides.forEach((slide, index) => {
           slide.style.display = index === slideIndex ? 'block' : 'none';
        });
     }

     setInterval(() => {
          slideIndex = (slideIndex + 1) % slides.length;
           updateFeedbackSlider();
      }, 5000);

    updateFeedbackSlider();
 }
}
});