var popup = document.getElementById('popup');
var btnJugar = document.querySelector('#firstPnl h1');
var btnGame = document.getElementById('submitGame');
var valuesGame = new Object;


btnJugar.addEventListener('click', function () {
    popup.style.display = 'flex';
});

window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        popup.style.display = 'none';
    }
});

btnGame.addEventListener('click', function (e) {
    e.preventDefault();
    valuesGame.values = [[]];
    valuesGame.check = document.getElementById('pc-yes').checked;
    valuesGame.cycle = document.getElementById('cycle').value;

    var valuesUser = document.getElementsByClassName('tableUser');
    var cont = 0;
    for (let i = 0; i < 10; i++) {
        valuesGame.values[i] = [];
        for (let j = 0; j < 5; j++) {
            valuesGame.values[i][j] = valuesUser[cont++].value;
        }
    }

    localStorage.setItem('game', JSON.stringify(valuesGame));
    window.open('gaming.html', '_self');
});