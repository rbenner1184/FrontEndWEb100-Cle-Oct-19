import { add, isEven, doubleIt, accumulate } from './utils';

describe('functions', () => {
    it('how to declare them', () => {
        function add(a: number, b: number): number {
            return a + b;
        }

        expect(add(2, 2)).toBe(4);

        // anonymous function keyword

        const subtract = function (a: number, b: number) {
            return a - b;
        };

        expect(subtract(10, 2)).toBe(8);

        const multiply = (a: number, b: number) => a * b;

        expect(multiply(3, 3)).toBe(9);
    });
    describe('parameters to function', () => {
        it('an example - overloading', () => {
            function nameFormatter(first: string, last: string, mi?: string) {
                let fullName = `${last}, ${first}`;
                if (mi) {
                    fullName += `${mi}`;
                }
                return fullName;
            }

            expect(nameFormatter('Han', 'Solo')).toBe('Solo, Han');
            // expect(nameFormatter('Han', 'Solo', 'D')).toBe('Solo, Han D.');
        });
        it('default values for parameters', () => {
            function add(a: number = 10, b: number = 15) {
                return a + b;
            }
            expect(add(10)).toBe(25);
            expect(add(15)).toBe(30);
            expect(add(undefined, 5)).toBe(15);
        });
        it('rest arguments', () => {
            // tslint:disable-next-line: no-shadowed-variable
            function add(a: number, b: number, ...rest: number[]) {
                const firstTwo = a + b;
                return rest.reduce((x, y) => x + y, firstTwo);
            }

            expect(add(1, 2)).toBe(3);
            expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
        });
        describe('higher order functions', () => {
            it('an example of a function that takes a function', () => {

                function identity(n: string) { return n; }

                type StringModifer = (msg: string) => string;
                function printItOut(message: string, fn: StringModifer = identity): void {
                    console.log(`At ${new Date().toISOString()}:`, fn(message));
                }

                printItOut('Tacos!', (n) => n.toUpperCase());
                printItOut('Tacos2', (n) => '***' + n + '***');
                printItOut('Tortilla!');
                printItOut('HOF Rawk!', makeUpper);

                function makeUpper(x: string) {
                    return x.toUpperCase();
                }


            });
            it('using an object', () => {
                class TagMaker {

                    private element: string;
                    constructor(element: string) {
                        this.element = element;
                    }

                    make(content: string) {
                        return `<${this.element}>${content}</${this.element}>`;
                    }
                }

                const h1Maker = new TagMaker('h1');
                expect(h1Maker.make('Tacos')).toBe('<h1>Tacos</h1>');
                expect(h1Maker.make('Chips')).toBe('<h1>Chips</h1>');

                const pMaker = new TagMaker('p');
                // expect(pMaker.make('coolio')).toBe('<p>collio</p>');
            });

            it('with a higher order function', () => {

                function tagMaker(element: string): (content: string) => string {
                    return (content) => `<${element}>${content}</${element}>`;
                }

                const h1Maker = tagMaker('h1');

                expect(h1Maker('Tacos')).toBe('<h1>Tacos</h1>');
                expect(h1Maker('Chips')).toBe('<h1>Chips</h1>');
                const pMaker = tagMaker('p');
                expect(pMaker('coolio')).toBe('<p>coolio</p>');

                expect(tagMaker('h2')('kidding me?')).toBe('<h2>kidding me?</h2>');
            });

            describe('array methods', () => {
                const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                // JavaScript has a for while loops, do loops, for loop (e.g. for(e.g. for(let x=0; x<100;)))
                it('visiting each element in an array', () => {
                    numbers.forEach((e, i, c) => console.log({ e, i, c }));
                    numbers.forEach((e) => console.log({ e }));

                });

                describe('methods that create a new array', () => {
                    it('visiting each element in an array', () => {
                        // const doubled = numbers.map(n => n * 2);
                        const doubled = numbers.map(doubleIt);
                        expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]); // This will fail in a very dumb way

                    });
                    it('filter', () => {
                        const evens = numbers.filter(isEven);
                        expect(evens).toEqual([2, 4, 6, 8]);
                        expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                    });

                    describe('methods that describe a single value', () => {
                        describe('checking the membership', () => {
                            it('seeing if all the memebers meet a criteria', () => {
                                const allEven = numbers.every(isEven);
                                expect(allEven).toBe(false); // some are old!

                                const someEven = numbers.some(isEven);
                                expect(someEven).toBe(true); // yes, SOME of the numbers are even
                            });

                            it('has reduce', () => {
                                // const total = numbers.reduce((s, n) => s + n);
                                const total = numbers.reduce(accumulate);
                                expect(total).toBe(45);

                                const total2 = numbers.reduce(accumulate, 100);
                                expect(total2).toBe(145);

                                const totalOfDoubleEven = numbers
                                    .filter(isEven)
                                    .map(doubleIt)
                                    .reduce((s, n) => s + n);

                                expect(totalOfDoubleEven).toBe(40);

                            });


                            it('practice', () => {
                                interface CartItem {
                                    name: string;
                                    qty: number;
                                    price: number;
                                }

                                const cart: CartItem[] = [
                                    { name: 'Eggs', qty: 1, price: 2.99 },
                                    { name: 'Bread', qty: 3, price: 3.50 },
                                    { name: 'Shampoo', qty: 2, price: 7.25 }
                                ];

                                interface ShippingInfo {
                                    totalQty: number;
                                    totalPrice: number;
                                }

                                // how would we use reduce to get the shipping info from
                                // this cart. (the total number of things, the total price.)
                                const initialState: ShippingInfo = {
                                    totalQty: 0,
                                    totalPrice: 0
                                };

                                const answer = cart.reduce((s: ShippingInfo, n: CartItem) => {
                                    return {
                                        totalQty: s.totalQty + n.qty,
                                        totalPrice: s.totalPrice + (n.qty * n.price)
                                    } as ShippingInfo;
                                }, initialState);

                                console.log('THE ANSWER IS: ', answer);

                                // const stringifield = numbers.reduce((s: string, n: number) => s + n.toString('Tacos', '');
                                // expect(stringifield).toBe('Tacos123456789');



                            });
                        });
                    });
                });
            });
        });

    });

});
