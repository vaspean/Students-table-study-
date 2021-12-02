(() => {
  let studentsMainArray = [];
  let localStorageArray = JSON.parse(localStorage.getItem(`students`));

  if (localStorageArray !== undefined && localStorageArray !== null) {
  for (let items of localStorageArray) {
    studentsMainArray.push(items);
  }}


  let inputs = document.querySelectorAll(`input`);
  let inputText = document.querySelectorAll(`input[type=text]`);
  let inputNumber = document.querySelectorAll(`input[type=number]`);
  let inputDate = document.querySelectorAll(`input[type=date]`);
  let submitForm = document.querySelector('form');

  function controlInputClassEmpty(inputType) {
    let formError;
    for (let i = 0; i < inputType.length; i++) {
      if (inputType[i].value.trim() === '') {
        inputType[i].value = '';
        formError = document.getElementsByClassName(`form-error-${inputType[i].name}`)[0];
        formError.textContent = 'Пожалуйста, заполните это поле'
        formError.classList.remove('d-none');
      } else if (inputType[i].value.trim() !== '') {
        inputType[i].value = inputType[i].value.trim();
        formError = document.getElementsByClassName(`form-error-${inputType[i].name}`)[0];
        if (!formError.classList.contains(`d-none`)) {
          formError.classList.add(`d-none`)
        }
      }
    }
  }

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    controlInputClassEmpty(inputText);
    controlInputClassEmpty(inputNumber);
    for (let i = 0; i < inputNumber.length; i++) {
      if (inputNumber[i].value.trim() < 2000 && inputNumber[i].value.trim() !== '' || inputNumber[i].value.trim() > 2021 && inputNumber[i].value.trim() !== '') {
        formError = document.getElementsByClassName(`form-error-${inputNumber[i].name}`)[0];
        inputNumber[i].value = '';
        formError.textContent = 'Введите значение от 2000 до 2021'
        formError.classList.remove('d-none');
      }
    }

    controlInputClassEmpty(inputDate);
    for (let i = 0; i < inputDate.length; i++) {
      if ((Date.parse(inputDate[i].value) - Date.parse('1900-01-01')) < 0 || (Date.parse(inputDate[i].value) >= Date.now())) {
        formError = document.getElementsByClassName(`form-error-${inputDate[i].name}`)[0];
        inputDate[i].value = '';
        formError.textContent = 'Введите значение от 1 января 1900-го года по сегодняшнее число';
        formError.classList.remove('d-none');
      }
    }

    let inputValidateSuccess = 0;

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value !== '') {
        inputValidateSuccess++;
      }
    }

    if (inputValidateSuccess === inputs.length) {
      inputValidateSuccess = 0;
      let objectToPush = {};
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === 'date') {
          let inputDateValue = new Date(inputs[i].valueAsDate);
          objectToPush[inputs[i].name] = inputDateValue;
        } else {
          objectToPush[inputs[i].name] = inputs[i].value;
        }
        inputs[i].value = '';
      }
      studentsMainArray.push(objectToPush);
      localStorage.setItem(`students`, JSON.stringify(studentsMainArray));
    }

    // console.log(studentsMainArray);
  })

})()
