window.addEventListener('load', function (e) {
    const card = document.querySelector('#card');
    const price =card.querySelectorAll('.price');
    const counts =card.querySelectorAll('.count');
    const countPrices = card.querySelectorAll('.countPrice')
    const totalPrice = document.querySelector('.total')
    countPrices.forEach((countPrice , index) =>{
         countPrice.innerHTML = +price[index].innerHTML * +counts[index].innerHTML
    })
    function toCurency(val){
        return new Intl.NumberFormat(`` , {style: 'curency' , curency: 'RUB'}).format(val)
    }
  



});