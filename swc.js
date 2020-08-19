document.querySelector('.box').style.transition = 'all ease 5s';
function myfunction() {
    var x = 16; //min value
    var y = 40; // max value

    const values = [4, 9, 1, 8, 3, 5, 2, 7];

    var deg = (Math.floor(Math.random() * (x - y)) + y) * 45;
    console.log(deg, values[deg / 45 % 8]);

    document.getElementById('box').style.transform = "rotate(" + deg + "deg)";

    var element = document.getElementById('mainbox');
    element.classList.remove('animate');
    setTimeout(function () {
        element.classList.add('animate');
    }, 5000); //5000 = 5 second
}
