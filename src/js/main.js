// Нужно что бы за день происходили события:

// - Добавление новых клиентов и внесение средств
// - Выход действующих клиентов и выплата всех средств
// - Начисление процентов за день каждому клиенту из бюджета компании


// // Баланс фирмы
// let balance = 0;
// // Процентная ставка в день
// let percentDay = 0.01;
//
//
// class Person{
//     constructor(inviteMoney){
//         this.bonus = 0;
//         this.balance = 0;
//
//     }
//
//     inviteMoney(balance){
//         this.balance = balance;
//     }
//
//     getMoney(){
//         this.balance = 0
//     }
// }
//
//
//
//
// setInterval(function () {
//     counter++;
//     // let nameVar = 'people' + counter;
//     var nameVar = new Person();
//     // sasha.inviteMoney(Math.floor(Math.random() * 100000));
//     console.log(counter);
//
// }, 5000);


function makeCounter() {
    var currentCount = 1;

    return function() { // (**)
        return currentCount++;
    };
}

var counter = makeCounter(); // (*)

// каждый вызов увеличивает счётчик и возвращает результат
alert( counter() ); // 1
alert( counter() ); // 2
alert( counter() ); // 3

// создать другой счётчик, он будет независим от первого
var counter2 = makeCounter();
alert( counter2() ); // 1

console.dir(counter);
