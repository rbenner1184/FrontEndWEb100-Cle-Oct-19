class Person {
    constructor(public firstName: string, public lasName: string) { }
}

export interface Raisable {
    firstName: string;
    giveRaise: (amount: number) => void;
}


export class Employee extends Person implements Raisable {
    // firstName: string;
    // lastName: string;
    // salary: number;

    // constructor(firstName: string, lastName: string, salary: number) {
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.salary = salary;
    // }

    constructor(public firstName: string, public lastName: string, private salary: number) {
        super(firstName, lastName);
    }

    giveRaise(amount: number) {
        this.salary += amount;
    }

    get currentSalary() {
        return this.salary;
    }
}
