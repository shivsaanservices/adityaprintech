
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.enquire').forEach(function(btn){
    btn.addEventListener('click', function(){
      var product = btn.getAttribute('data-product') || '';
      window.location.href = '/contact.html?product=' + encodeURIComponent(product);
    });
  });
  var params = new URLSearchParams(window.location.search);
  if(params.get('product')){
    var prodInput = document.getElementById('product');
    if(prodInput) prodInput.value = params.get('product');
  }
  var contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', async function(e){
      e.preventDefault();
      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var phone = document.getElementById('phone').value.trim();
      var product = document.getElementById('product').value.trim();
      var quantity = document.getElementById('quantity').value.trim();
      var message = document.getElementById('message').value.trim();
      var resultEl = document.getElementById('formResult');
      resultEl.textContent = 'Sending...';
      try{
        var resp = await fetch('/api/contact', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({name,email,phone,product,quantity,message})
        });
        var data = await resp.json();
        if(resp.ok){ resultEl.textContent = 'Enquiry sent — thank you!'; contactForm.reset(); }
        else { resultEl.textContent = data.error || 'Failed to send enquiry'; }
      } catch(err){ console.error(err); resultEl.textContent = 'Network error. Try again later.'; }
    });
  }
});
