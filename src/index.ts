
import './styles.css';
import { multiply } from './math';


const number1E1 = document.getElementById('number1') as HTMLInputElement;
const number2E1 = document.getElementById('number2') as HTMLInputElement;
const mutiplyButton = document.getElementById('multiply') as HTMLInputElement;
const answerE1 = document.getElementById('answer') as HTMLInputElement;

mutiplyButton.addEventListener('click', function () {

    const n1 = number1E1.valueAsNumber;
    const n2 = number2E1.valueAsNumber;

    const answer = multiply(n1, n2); // TODO: Put this in module.

    answerE1.innerHTML = answer.toString();

});

