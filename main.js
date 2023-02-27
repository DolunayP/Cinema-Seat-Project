const seats = document.querySelector('.seats');
const groupLeft = document.querySelector('.group-left');
const groupCenter = document.querySelector('.group-center');
const groupRight = document.querySelector('.group-right');
const price = document.querySelector('.price');
const popup = document.querySelector('.popup');
const buyBtn = document.querySelector('.buy-btn');
let seatCount = 51;
let ticketPrice = 50;
let selectedSeatCount = JSON.parse(localStorage.getItem('selectedSeatCount'));

window.addEventListener('DOMContentLoaded', function () {
    for (let i = 0; i < seatCount; i++) {
        if (i < seatCount * 0.15) {
            createSeats(groupLeft);
        } else if (i >= seatCount * 0.15 && i < seatCount * 0.85) {
            createSeats(groupCenter);
        } else {
            createSeats(groupRight);
        }
    }
    getFromLocalStorage();
})

const createSeats = (position) => {
    position.innerHTML += `<div class="seat"></div>`;
}

const calculateTotalPrice = () => {
    let totalPrice = ticketPrice * selectedSeatCount;
    price.innerHTML = ` <p> <b>${selectedSeatCount} adet</b> bilet için ödemeniz gereken tutar <b>${totalPrice} TL</b>'dir`;
    localStorage.setItem('totalPrice', totalPrice);
    localStorage.setItem('selectedSeatCount', selectedSeatCount);
}

const selectSeats = (e) => {
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

    const emptySeats = seats.querySelectorAll('.seat')
    const selectedArr = [];
    const seatsArr = [];

    var selectedSeat = seats.querySelectorAll('.seat.selected');
    selectedSeat.forEach(seat => { selectedArr.push(seat); })

    emptySeats.forEach(seat => { seatsArr.push(seat); })

    let selectedIndex = selectedArr.map(e => {
        return seatsArr.indexOf(e);
    });

    saveToLocalStorage('selectedSeatNumbers', selectedIndex);

    buyBtn.addEventListener('click', function () {
        const emptySeats = seats.querySelectorAll('.seat');
        emptySeats.forEach(seat => {
            if (seat.matches('.selected')) {
                seat.classList.add('full');
                seat.classList.remove('selected');
                displayPopup('Satın alma başarıyla tamamlandı.');
            }
        })
        localStorage.setItem('fullSeats', JSON.stringify(selectedIndex));
        localStorage.removeItem('selectedSeatNumbers', JSON.stringify(selectedIndex));
        localStorage.removeItem('selectedSeatCount');
        localStorage.removeItem('totalPrice');
    });
}
seats.addEventListener('click', selectSeats);

const saveToLocalStorage = (name, index) => {
    localStorage.setItem(name, JSON.stringify(index));
}

const getFromLocalStorage = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeatNumbers'));
    const fullSeats = JSON.parse(localStorage.getItem('fullSeats'));

    const emptySeats = seats.querySelectorAll('.seat')
    if (selectedSeats != null && selectedSeats.length > 0) {
        emptySeats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    };

    emptySeats.forEach((seat, index) => {
        if (fullSeats != null && fullSeats.length > 0) {
            if (fullSeats.indexOf(index) > -1) {
                seat.classList.add('full');
            }
        }
    });
}

const displayPopup = (message) => {
    popup.innerHTML = `<span>${message}</span>`;
    popup.classList.add('displayPopup');
    setTimeout(function () {
        popup.classList.remove('displayPopup');
    }, 2000);
}


