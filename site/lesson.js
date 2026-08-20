(() => {
  const slides=[...document.querySelectorAll('.slide')];
  const count=document.querySelector('.counter');
  const fill=document.querySelector('.progress span');
  let index=0;
  function render(){
    slides.forEach((s,i)=>s.classList.toggle('active',i===index));
    count.textContent=`${index+1} / ${slides.length}`;
    fill.style.width=`${((index+1)/slides.length)*100}%`;
    document.querySelector('[data-prev]').disabled=index===0;
    document.querySelector('[data-next]').textContent=index===slides.length-1?'레슨 끝내기':'다음 →';
    window.scrollTo({top:0,behavior:'smooth'});
  }
  document.querySelector('[data-prev]').onclick=()=>{if(index){index--;render()}};
  document.querySelector('[data-next]').onclick=()=>{if(index<slides.length-1){index++;render()}else{location.href='index.html'}};
  document.querySelectorAll('[data-quiz-check]').forEach(button=>button.onclick=()=>{
    const quiz=button.closest('.quiz'); const picked=quiz.querySelector('input:checked'); const result=quiz.querySelector('.result');
    if(!picked){result.textContent='답을 하나 골라주세요.';return}
    const correct=picked.value===quiz.dataset.answer;
    result.textContent=correct ? `맞아요. ${quiz.dataset.explain}` : `다시 볼까요? ${quiz.dataset.explain}`;
    result.className=`result ${correct?'correct':'wrong'}`;
  });
  addEventListener('keydown',e=>{if(e.target.matches('input'))return;if(e.key==='ArrowRight'&&index<slides.length-1){index++;render()}if(e.key==='ArrowLeft'&&index){index--;render()}});
  render();
})();
