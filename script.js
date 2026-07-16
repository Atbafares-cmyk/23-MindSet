/* ============================================================
   23 MindSet — script partagé
   ============================================================ */
(function(){
  var KEY = '23ms-theme';

  /* Thème : appliquer le choix mémorisé au plus tôt */
  try{
    var saved = localStorage.getItem(KEY);
    if(saved){ document.documentElement.setAttribute('data-theme', saved); }
  }catch(e){}

  /* Bascule sombre / clair */
  window.toggleTheme = function(){
    var cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    if(cur === 'dark'){ document.documentElement.removeAttribute('data-theme'); }
    else { document.documentElement.setAttribute('data-theme','light'); }
    try{ localStorage.setItem(KEY, cur); }catch(e){}
  };

  document.addEventListener('DOMContentLoaded', function(){
    /* Fond de la barre de navigation au défilement */
    var head = document.getElementById('head');
    function onScroll(){
      if(window.scrollY > 20){ head.classList.add('scrolled'); }
      else { head.classList.remove('scrolled'); }
    }
    if(head){ window.addEventListener('scroll', onScroll); onScroll(); }

    /* Menu mobile */
    var burger = document.getElementById('burger');
    var menu = document.getElementById('menu');
    if(burger && menu){
      burger.addEventListener('click', function(){ menu.classList.toggle('open'); });
      menu.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(){ menu.classList.remove('open'); });
      });
    }

    /* Apparition au défilement */
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    },{threshold:0.12});
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  });
})();

/* Année automatique dans le footer */
document.querySelectorAll('[data-year]').forEach(function(el){el.textContent=new Date().getFullYear();});

/* Formulaire de contact (Web3Forms) */
(function(){
  var cf=document.getElementById('contactForm');
  if(!cf)return;
  var status=document.getElementById('formStatus');
  cf.addEventListener('submit',function(e){
    e.preventDefault();
    status.textContent='Envoi en cours…';
    fetch('https://api.web3forms.com/submit',{method:'POST',body:new FormData(cf)})
      .then(function(r){return r.json();})
      .then(function(res){
        if(res.success){cf.reset();status.textContent='Merci, votre message a bien été envoyé. Je vous réponds au plus vite.';}
        else{status.textContent='Une erreur est survenue. Réessayez, ou écrivez-moi via LinkedIn.';}
      })
      .catch(function(){status.textContent='Une erreur est survenue. Réessayez, ou écrivez-moi via LinkedIn.';});
  });
})();
