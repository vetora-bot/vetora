(function(){
  var d=document, root=d.documentElement;
  var mql=window.matchMedia('(prefers-color-scheme: dark)');
  var btn=d.getElementById('theme-toggle');
  var sun=btn.querySelector('.icon-sun');
  var moon=btn.querySelector('.icon-moon');
  var meta=d.querySelector('meta[name="theme-color"]');

  function resolved(){
    var t=root.dataset.theme;
    if(t==='dark'||t==='light')return t;
    return mql.matches?'dark':'light';
  }
  function paint(){
    var t=resolved();
    btn.setAttribute('aria-pressed',String(t==='dark'));
    sun.hidden=t==='dark';
    moon.hidden=t!=='dark';
    if(meta)meta.setAttribute('content',t==='dark'?'#0B1226':'#EEF1F6');
  }
  btn.addEventListener('click',function(){
    var t=resolved()==='dark'?'light':'dark';
    root.dataset.theme=t;
    try{localStorage.setItem('vetora-theme',t)}catch(e){}
    paint();
  });
  var onChange=function(){if(!root.dataset.theme)paint()};
  if(mql.addEventListener)mql.addEventListener('change',onChange);
  else if(mql.addListener)mql.addListener(onChange);
  paint();

  var y=d.getElementById('year');
  if(y)y.textContent=new Date().getFullYear();

  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els=[].slice.call(d.querySelectorAll('.reveal'));
  if(reduce||!('IntersectionObserver' in window)){
    els.forEach(function(el){el.classList.add('in')});
    return;
  }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}
    });
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(el){io.observe(el)});

  var form=d.getElementById('quote-form');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var name=(d.getElementById('q-name').value||'').trim();
      var type=(d.getElementById('q-type').value||'').trim();
      var msg=(d.getElementById('q-msg').value||'').trim();
      if(!name||!msg)return;
      var text='Olá! Vim através do site da VetorA.\n\nNome: '+name+'\nTipo de projeto: '+type+'\n\n'+msg;
      var url='https://wa.me/5571920082661?text='+encodeURIComponent(text);
      var w=window.open(url,'_blank','noopener');
      if(!w)location.href=url;
    });
  }
})();
