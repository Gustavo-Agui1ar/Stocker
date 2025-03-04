const listBtn = document.querySelectorAll('.list-btn button');

listBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    
    listBtn.forEach((btn) => {
      btn.classList.remove('active-btn');
      const contentID = btn.getAttribute('content-id');
      document.getElementsByClassName(`${contentID}`)[0].classList.add('hidden');
    });

    btn.classList.add('active-btn');
    const contentID = btn.getAttribute('content-id');
    document.getElementsByClassName(`${contentID}`)[0].classList.remove('hidden');
  });
});
