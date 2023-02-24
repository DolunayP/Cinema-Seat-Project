const seats = document.querySelector('.seats');
const groupLeft = document.querySelector('.group-left');
const groupCenter = document.querySelector('.group-center');
const groupRight = document.querySelector('.group-right');
const price = document.querySelector('.price');
const popup = document.querySelector('.popup')
let seatCount = 50;
let ticketPrice = 50;
let selectedSeatCount = 0;

window.addEventListener('DOMContentLoaded', function () {
    for (let i = 0; i <= seatCount; i++) {
        if (i < seatCount * 0.15) {
            createSeats(groupLeft);
        } else if (i >= seatCount * 0.15 && i < seatCount * 0.85) {
            createSeats(groupCenter);
        } else {
            createSeats(groupRight);
        }
    }
})

const createSeats = (position) => {
    position.innerHTML += `<div class="seat"></div>`
}


const selecSeats = (e) => {
    if (e.target.matches('.seat') && !e.target.matches('.full')) {
        if (e.target.matches('.seat') && e.target.matches('.selected')) {
            selectedSeatCount = (selectedSeatCount - 2);
            displayPopup('Seçilen koltuk başarıyla kaldırıldı.');
        }
        e.target.classList.toggle('selected');
        selectedSeatCount++;
        calculateTotalPrice(selectedSeatCount);
    }
    if (e.target.matches('.full')) {
        displayPopup('Seçtiğiniz koltuk doludur.');
    }
}
seats.addEventListener('click', selecSeats);


const calculateTotalPrice = () => {
    let totalPrice = ticketPrice * selectedSeatCount;
    price.innerHTML = ` <p> <b>${selectedSeatCount} adet</b> bilet için ödemeniz gereken tutar <b>${totalPrice} TL</b>'dir`
}


const displayPopup = (message) => {
    popup.innerHTML = `<span>${message}</span>`;
    popup.classList.add('displayPopup');
    setTimeout(function () {
        popup.classList.remove('displayPopup');

    }, 2000);
}

