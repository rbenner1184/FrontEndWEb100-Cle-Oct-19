import { Employee, Raisable } from './hr/employee';
import { Department } from './hr/department';

describe('classes', () => {
    it('using a class', () => {
        const bob = new Employee('Bob', 'Smith', 82_000);

        expect(bob.firstName).toBe('Bob');
        expect(bob.currentSalary).toBe(82_000);

        bob.giveRaise(100_000);

        expect(bob.currentSalary).toBe(182_000);

        const dev = new Department();
        dev.name = 'Developers! Developers! Developers';
        dev.manager = bob;

        const someOne: Raisable = bob;
        someOne.giveRaise(50);

    });

});
