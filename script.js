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
