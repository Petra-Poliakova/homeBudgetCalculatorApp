"use strict";

const input = document.querySelectorAll("input");
const select = document.querySelector(".selectList");
const selectA = document.querySelector(".selectListA");
const form = document.querySelector(".calculator-wrap");

// prettier-ignore
const monthOption = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
const yearOption = [2022, 2023];

let budget = [];

function generateId() {
  let createID = (Date.now() + "").slice(-10);
  return createID;
}

function selectMonth() {
  let selectMonth =
    '<option class="selectOption">-- Choose a month --</option>';
  for (let optionIndex = 0; optionIndex < monthOption.length; optionIndex++) {
    selectMonth +=
      "<option class='selectOption'>" + monthOption[optionIndex] + "</option>";
  }
  select.innerHTML = selectMonth;
}
selectMonth();

function selectYear() {
  let selectYear = "<option>-- Select year --</option>";

  for (let optionIndex = 0; optionIndex < yearOption.length; optionIndex++) {
    selectYear += "<option>" + yearOption[optionIndex] + "</option>";
  }
  selectA.innerHTML = selectYear;
}
selectYear();

const incomeBox = document.querySelector(".income");
let totalIncomeInput = document.querySelector("#total-income");
let incomeInput = document.querySelectorAll(".value-input");

const salary = document.querySelector("#salary");
const otherIncome = document.querySelector("#other-income");
const tooltipTextI = document.querySelectorAll(".tooltiptextI");

const totalIncomeSum = function () {
  incomeBox.addEventListener("change", function (e) {
    e.preventDefault();
    let totalIncome = 0;
    for (let i = 0; i < incomeInput.length; i++) {
      totalIncome += Number(incomeInput[i].value);
    }
    totalIncomeInput.value = totalIncome.toFixed(2);
  });
};
totalIncomeSum();

const expensesBox = document.querySelector(".expenses");
let totalExpenseInput = document.querySelector("#total-expenses");
let expensesInput = document.querySelectorAll(".value-input-exp");

let childCare = document.querySelector("#child-care");
let housing = document.querySelector("#housing");
let food = document.querySelector("#food");
let transportation = document.querySelector("#transportation");
let electricity = document.querySelector("#electricity");
let phoneInternet = document.querySelector("#phone-internet");

const totalExpensSum = function () {
  expensesBox.addEventListener("change", function () {
    let totalExpenses = 0;
    for (let i = 0; i < expensesInput.length; i++) {
      totalExpenses += Number(expensesInput[i].value);
    }
    totalExpenseInput.value = totalExpenses.toFixed(2);
  });
};
totalExpensSum();

const clearInputValue = function () {
  for (let i = 0; i < incomeInput.length; i++) {
    incomeInput[i].value = "";
  }
  for (let i = 0; i < expensesInput.length; i++) {
    expensesInput[i].value = "";
  }
  totalIncomeInput.value = "";
  totalExpenseInput.value = "";
  select.value = select.options[0].text;
  selectA.value = selectA.options[0].text;
};

const confirmBtn = document.querySelector(".confirm-btn");
const cancelmBtn = document.querySelector(".cancel-btn");
const textError = document.querySelector(".error-text p");
const containerMonitoring = document.querySelector(".containerMonitoring");
let getDataTable;
let dataTable;

const addTable = function (getDataTable) {
  let html = `
  <table class="monitoring" data-id='${getDataTable.id}'>
          <thead>
            <tr>
              <th colspan="2">Month and Year:</th>
              <th >${getDataTable.montSelectValue} ${getDataTable.yearSelectValue}</th>
              <th class="right-btn"><button class="remove-btn-one">X</button></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Salary:</td>
              <td>${getDataTable.salaryValue} €</td>
              <td>Child Care:</td>
              <td>${getDataTable.childCareValue} €</td>
            </tr>
            <tr>
              <td>Other income:</td>
              <td>${getDataTable.otherIncomeValue} €</td>
              <td>Housing:</td>
              <td>${getDataTable.housingValue} €</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Food:</td>
              <td>${getDataTable.foodValue} €</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Transportation:</td>
              <td>${getDataTable.transportationValue} €</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Electricity:</td>
              <td>${getDataTable.electricityValue} €</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Phone / internet:</td>
              <td>${getDataTable.phoneInternetValue} €</td>
            </tr>
            <tr>
              <td><b>Total income:</b></td>
              <td><b>${getDataTable.totalIncomeValue} €</b></td>
              <td><b>Total expens:</b></td>
              <td><b>${getDataTable.totalExpensesValue} €</b></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">Monthly saving:</td>
              <td></td>
              <td>${getDataTable.monthlySaving} €</td>
            </tr>
          </tfoot>
        </table>
  `;

  containerMonitoring.insertAdjacentHTML("afterbegin", html);
};

const renderBudgetData = function (event) {
  const saveBudgetData = localStorage.getItem("getDataTable");
  budget = saveBudgetData ? JSON.parse(saveBudgetData) : [];

  let id = generateId();

  const montSelectValue = select.value;
  const yearSelectValue = selectA.value;

  const salaryValue = +salary.value;
  const otherIncomeValue = +otherIncome.value;
  const totalIncomeValue = +totalIncomeInput.value;

  const childCareValue = +childCare.value;
  const housingValue = +housing.value;
  const foodValue = +food.value;
  const transportationValue = +transportation.value;
  const electricityValue = +electricity.value;
  const phoneInternetValue = +phoneInternet.value;
  const totalExpensesValue = +totalExpenseInput.value;
  let monthlySaving = totalIncomeValue - totalExpensesValue;

  event.preventDefault();
  // ERROR MESSAGE
  if (select.value === select.options[0].text) {
    textError.textContent = "Select month!!!";
    return false;
  } else if (selectA.value === selectA.options[0].text) {
    textError.textContent = "Select year!!!";
    return false;
  } else if (totalIncomeValue < totalExpensesValue) {
    textError.textContent = "Income is lower than expensses!!!";
    return false;
  } else {
    textError.textContent = "";
  }

  getDataTable = new Object({
    id,
    montSelectValue,
    yearSelectValue,
    salaryValue,
    otherIncomeValue,
    totalIncomeValue,
    childCareValue,
    housingValue,
    foodValue,
    transportationValue,
    electricityValue,
    phoneInternetValue,
    totalExpensesValue,
    monthlySaving,
  });

  budget.push(getDataTable);

  addTable(getDataTable);

  clearInputValue();

  setLocalStorage();

  setTimeout(function () {
    window.location.reload();
  }, 10);
};

form.addEventListener("submit", renderBudgetData);
cancelmBtn.addEventListener("click", clearInputValue);

let setLocalStorage = function () {
  localStorage.setItem("getDataTable", JSON.stringify(budget));
};

const getLocalstorage = function () {
  dataTable = JSON.parse(localStorage.getItem("getDataTable"));
  if (!dataTable) return;
  getDataTable = dataTable;

  getDataTable.forEach((element) => {
    addTable(element);
  });
};
getLocalstorage();

const removeBtn = document.querySelector(".remove-btn");
const removeBtnOne = document.querySelectorAll(".remove-btn-one");

const removeOneBudget = function (e) {
  const saveBudgetEl = localStorage.getItem("getDataTable");
  budget = saveBudgetEl ? JSON.parse(saveBudgetEl) : [];

  if (e.target.className === "remove-btn-one") {
    const budgetEl = e.target.closest(".monitoring");

    if (!budgetEl) return;

    const removeEl = budget.find(
      (removeEl) => removeEl.id === budgetEl.dataset.id
    );

    const budgetIndex = budget.indexOf(removeEl);
    budget.splice(budgetIndex, 1);

    budgetEl.remove();
    localStorage.setItem("getDataTable", JSON.stringify(budget));
  }
};

const removeBudget = function () {
  localStorage.removeItem("getDataTable");
  location.reload();
};

removeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  removeBudget();
});
removeBtnOne.forEach((element) => {
  element.addEventListener("click", removeOneBudget);
});
