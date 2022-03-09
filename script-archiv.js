"use script";

let containerBody = document.querySelector(".container-body");
const containerFooter = document.querySelector(".container-footer");
let incomeSumar = [];
let expensSumar = [];
let savingSumar = [];

const renderBudget = function (data) {
  for (let i = 0; i < data.length; i++) {
    let incomeSum = data[i].salary + data[i].otherIncome;

    //console.log(incomeSumar);
    let expensSum =
      data[i].childCare +
      data[i].housing +
      data[i].food +
      data[i].transportation +
      data[i].electricity +
      data[i].phoneInternet;
    let savingSum = incomeSum - expensSum;

    incomeSumar.push(incomeSum);
    expensSumar.push(expensSum);
    savingSumar.push(expensSum);

    const htmlBody = `
              <td>${data[i].montSelect}</td>
              <td>${incomeSum} €</td>
              <td>${expensSum} €</td>
              <td>${savingSum} €</td>

    `;

    containerBody.insertAdjacentHTML("beforebegin", htmlBody);
  }
  let totalIncome = incomeSumar.reduce((a, b) => a + b);
  let totalExpens = expensSumar.reduce((a, b) => a + b);
  let totalSaving = savingSumar.reduce((a, b) => a + b);

  const htmlFooter = `
    <td>Sum / Year</td>
              <td>${totalIncome} €</td>
              <td>${totalExpens} €</td>
              <td>${totalSaving} €</td>
    `;
  containerFooter.insertAdjacentHTML("beforebegin", htmlFooter);
};

function getJsonData() {
  fetch("home-budget.json")
    .then((response) => response.json())
    .then((data) => renderBudget(data));
}
getJsonData();
