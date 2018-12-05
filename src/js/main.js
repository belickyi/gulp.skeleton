// Нужно что бы за день происходили события:
//
// - Добавление новых клиентов и внесение средств
// - Выход действующих клиентов и выплата всех средств
// - Начисление процентов за день каждому клиенту из бюджета компании


// Баланс фирмы
let balance = 0;
// Процентная ставка в день
let percentDay = 0.01;


class Person{
    constructor(name){
        this.bonus = 0;
        this.balance = 0;
        this.name = name;

    }

    inviteMoney(balance){
        this.balance = balance;
        balance += this.balance;
    }

    getMoney(){
        this.balance = 0
    }
}



setInterval(function () {
    let vasa = new Person('vasa');
    vasa.inviteMoney(Math.floor(Math.random() * 100000));
    balance += vasa.balance;
    console.log('Новый клиент ' + vasa.name);
    console.log('Баланс фирмы ' + balance + ' р.');

}, 5000);
