(() => {
  const TABLE_COLUMNS_COUNT = 4;
  const MONTH_SEPTEMBER = 9;
  const STUDY_YEARS_RANGE = 4;
  const INPUT_VALUE_EXACT_MACTH = 4
  let localStorageStudents = JSON.parse(localStorage.getItem(`students`));
  let filteredByNameArray = localStorageStudents;
  let filteredByFacultyArray = localStorageStudents;
  let filteredByYearStartStudyArray = localStorageStudents;
  let filteredByYearEndStudyArray = localStorageStudents;
  let studentsTableBody = document.getElementById(`studentsTableBody`);

  function addNullDate(dateMonth) {
    if (String(dateMonth).length === 1) {
      dateMonth = `0` + dateMonth;
    }
    return dateMonth;
  }

  function calculateAge(birthDate, birthMonth, birthYear) {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    let dateOfBirth = new Date(birthYear, birthMonth - 1, birthDate);
    let dateOfBirthNow = new Date(today.getFullYear(), birthMonth, birthDate);
    let age;
    age = today.getFullYear() - dateOfBirth.getFullYear();
    if (today < dateOfBirthNow) {
      age = age - 1;
    }
    return age;
  }

  function drawTable(localStorageStudents) {
    if (localStorageStudents != null) {
      for (let students of localStorageStudents) {
        let createTr = document.createElement(`tr`);
        studentsTableBody.append(createTr);
        for (let i = 0; i < TABLE_COLUMNS_COUNT; i++) {
          let createTd = document.createElement(`td`);
          createTr.append(createTd);
          if (i === 0) {
            createTd.textContent = students.Surname + ' ' + students.Name + ' ' + students.Patronymic;
          }

          if (i === 1) {
            createTd.textContent = students.Faculty;
          }

          if (i === 2) {
            let inputDateValue = new Date(students.DateOfBirth);
            let date = inputDateValue.getDate();
            let month = inputDateValue.getMonth() + 1;
            let year = inputDateValue.getFullYear();
            let age = calculateAge(date, month, year);
            date = addNullDate(date);
            month = addNullDate(month);

            let ageString;
            if (age.toString().length == 1) {
              ageString = addNullDate(age).toString()[0];
            }
            if (age.toString().length == 2) {
              ageString = addNullDate(age).toString()[1];
            }
            if (age.toString().length == 3) {
              ageString = addNullDate(age).toString()[2];
            }

            if (ageString == 0 || ageString >= 5) {
              ageString = ` лет`
            }
            if (ageString == 1) {
              ageString = ` год`
            }
            if (ageString >= 2 && ageString <= 4) {
              ageString = ` года`
            }

            createTd.textContent = `${date}` + `.` + `${month}` + `.` + `${year}` + ` ` + `(${age}${ageString})`
          }

          if (i === 3) {
            let now = new Date();
            let currentStage;
            let rangeYears = now.getFullYear() - parseInt(students.YearStartStudy);
            if (rangeYears > STUDY_YEARS_RANGE || rangeYears == STUDY_YEARS_RANGE && (now.getMonth() + 1) > MONTH_SEPTEMBER) {
              currentStage = `Закончил`;
            }
            if (rangeYears == STUDY_YEARS_RANGE && (now.getMonth() + 1) < MONTH_SEPTEMBER) {
              currentStage = `4 курс`;
            }
            if (rangeYears == 0) {
              currentStage = `Поступает в этом году`;
            }
            for (let i = 1; i < STUDY_YEARS_RANGE; i++) {
              if (rangeYears == i) {
                currentStage = `${i} курс`
              }
            }
            createTd.textContent = students.YearStartStudy + `-` + `${parseInt(students.YearStartStudy) + 4}` + `(${currentStage})`;
          }
        }
      }
    }
  }
  drawTable(localStorageStudents);

  let thFullname = document.getElementById(`thFullName`);
  let thFaculty = document.getElementById(`thFaculty`);
  let thDateOfBirth = document.getElementById(`thDateOfBirth`);
  let thYearStartStudy = document.getElementById(`thYearStartStudy`);

  function thClassesRemove(th) {
    th.classList.remove(`bg-dark`);
    th.classList.remove(`text-white`)
  }

  function thClasses(thAddClass, thRemoveFirst, thRemoveSecond, thRemoveThird) {
    thAddClass.classList.add(`bg-dark`);
    thAddClass.classList.add(`text-white`);
    thRemoveFirst.classList.remove(`bg-dark`);
    thRemoveFirst.classList.remove(`text-white`);
    thRemoveSecond.classList.remove(`bg-dark`);
    thRemoveSecond.classList.remove(`text-white`);
    thRemoveThird.classList.remove(`bg-dark`);
    thRemoveThird.classList.remove(`text-white`);
  }


  thFullname.addEventListener(`click`, () => {
    thClasses(thFullname, thFaculty, thDateOfBirth, thYearStartStudy);
    filteredLocalStorageStudents.sort((a, b) => a.Surname + a.Name + a.Patronymic > b.Surname + b.Name + b.Patronymic ? 1 : -1);
    while (studentsTableBody.hasChildNodes()) {
      studentsTableBody.removeChild(studentsTableBody.lastChild);
    }
    drawTable(filteredLocalStorageStudents);
  })
  thFaculty.addEventListener(`click`, () => {
    thClasses(thFaculty, thFullname, thDateOfBirth, thYearStartStudy);
    filteredLocalStorageStudents.sort((a, b) => a.Faculty > b.Faculty ? 1 : -1);
    while (studentsTableBody.hasChildNodes()) {
      studentsTableBody.removeChild(studentsTableBody.lastChild);
    }
    drawTable(filteredLocalStorageStudents);
  })
  thDateOfBirth.addEventListener(`click`, () => {
    thClasses(thDateOfBirth, thFaculty, thFullname, thYearStartStudy);
    filteredLocalStorageStudents.sort((a, b) => Date.parse(a.DateOfBirth) > Date.parse(b.DateOfBirth) ? 1 : -1);
    while (studentsTableBody.hasChildNodes()) {
      studentsTableBody.removeChild(studentsTableBody.lastChild);
    }
    drawTable(filteredLocalStorageStudents);
  })
  thYearStartStudy.addEventListener(`click`, () => {
    thClasses(thYearStartStudy, thFaculty, thFullname, thDateOfBirth);
    filteredLocalStorageStudents.sort((a, b) => a.YearStartStudy > b.YearStartStudy ? 1 : -1);
    while (studentsTableBody.hasChildNodes()) {
      studentsTableBody.removeChild(studentsTableBody.lastChild);
    }
    drawTable(filteredLocalStorageStudents);
    // console.log(`asd`)
  })

  let inputFilterName = document.getElementById(`inputFilterName`);
  let inputFilterFaculty = document.getElementById(`inputFilterFaculty`);
  let inputFilterYearStartStudy = document.getElementById(`inputFilterYearStartStudy`);
  let inputFilterYearEndStudy = document.getElementById(`inputFilterYearEndStudy`);

  let filterNameDone = false;
  let filterFacultyDone = false;
  let filterYearStartStudyDone = false;
  let filterYearEndStudyDone = false;

  let filteredLocalStorageStudents = localStorageStudents;

  function filterByName(filterArray) {
    filteredByNameArray = filterArray.filter(function (e) {
      const fullNameStringFirst = e.Surname + ` ` + e.Name + ` ` + e.Patronymic;
      const fullNameStringSecond = e.Name + ` ` + e.Surname + ` ` + e.Patronymic;
      const fullNameStringThird = e.Surname + ` ` + e.Patronymic + ` ` + e.Name;
      const fullNameStringFourth = e.Name + ` ` + e.Patronymic + ` ` + e.Surname;
      const fullNameStringFifth = e.Patronymic + ` ` + e.Surname + ` ` + e.Name;
      const fullNameStringSixth = e.Patronymic + ` ` + e.Name + ` ` + e.Surname;
      let includesBool;
      if (fullNameStringFirst.toLowerCase().includes(inputFilterName.value.toLowerCase()) || fullNameStringSecond.toLowerCase().includes(inputFilterName.value.toLowerCase()) || fullNameStringThird.toLowerCase().includes(inputFilterName.value.toLowerCase()) || fullNameStringFourth.toLowerCase().includes(inputFilterName.value.toLowerCase()) || fullNameStringFifth.toLowerCase().includes(inputFilterName.value.toLowerCase()) || fullNameStringSixth.toLowerCase().includes(inputFilterName.value.toLowerCase())) {
        includesBool = true;
      }
      return includesBool;
    })
    while (studentsTableBody.hasChildNodes()) {
      studentsTableBody.removeChild(studentsTableBody.lastChild);
    }
    drawTable(filteredByNameArray);
  }

  function filterByFaculty(filterArray) {
    filteredByFacultyArray = filterArray.filter(function (e) { return e.Faculty.toLowerCase().includes(inputFilterFaculty.value.toLowerCase()) })
    while (studentsTableBody.hasChildNodes()) {
      studentsTableBody.removeChild(studentsTableBody.lastChild);
    }
    drawTable(filteredByFacultyArray);
  }

  function filterByYearStartStudy(filterArray) {
    if (inputFilterYearStartStudy.value.length >= INPUT_VALUE_EXACT_MACTH) {
      filteredByYearStartStudyArray = filterArray.filter(function (e) {
        return e.YearStartStudy.includes(inputFilterYearStartStudy.value)
      })
      while (studentsTableBody.hasChildNodes()) {
        studentsTableBody.removeChild(studentsTableBody.lastChild);
      }
      drawTable(filteredByYearStartStudyArray);
    }
    if (inputFilterYearStartStudy.value.length < INPUT_VALUE_EXACT_MACTH) {
      while (studentsTableBody.hasChildNodes()) {
        studentsTableBody.removeChild(studentsTableBody.lastChild);
      }
      drawTable(filterArray)
    }
  }

  function filterByYearEndStudy(filterArray) {
    if (inputFilterYearEndStudy.value.length >= INPUT_VALUE_EXACT_MACTH) {
      filteredByYearEndStudyArray = filterArray.filter(function (e) {
        return e.YearStartStudy.includes(parseInt(inputFilterYearEndStudy.value) - STUDY_YEARS_RANGE)
      })
      while (studentsTableBody.hasChildNodes()) {
        studentsTableBody.removeChild(studentsTableBody.lastChild);
      }
      drawTable(filteredByYearEndStudyArray);
    }
    if (inputFilterYearEndStudy.value.length < INPUT_VALUE_EXACT_MACTH) {
      while (studentsTableBody.hasChildNodes()) {
        studentsTableBody.removeChild(studentsTableBody.lastChild);
      }
      drawTable(filterArray)
    }
  }



  inputFilterName.addEventListener(`input`, () => {
    inputFilterName.value !== `` ? filterNameDone = true : filterNameDone = false;
    while (studentsTableBody.hasChildNodes()) {
      studentsTableBody.removeChild(studentsTableBody.lastChild);
    }
    filterTable();
  })



  inputFilterFaculty.addEventListener(`input`, () => {
    inputFilterFaculty.value !== `` ? filterFacultyDone = true : filterFacultyDone = false;
    while (studentsTableBody.hasChildNodes()) {
      studentsTableBody.removeChild(studentsTableBody.lastChild);
    }
    filterTable();
  })

  inputFilterYearStartStudy.addEventListener(`input`, () => {
    inputFilterYearStartStudy.value.length >= INPUT_VALUE_EXACT_MACTH ? filterYearStartStudyDone = true : filterYearStartStudyDone = false;
    while (studentsTableBody.hasChildNodes()) {
      studentsTableBody.removeChild(studentsTableBody.lastChild);
    }
    filterTable();
  })


  inputFilterYearEndStudy.addEventListener(`input`, () => {
    inputFilterYearEndStudy.value.length >= INPUT_VALUE_EXACT_MACTH ? filterYearEndStudyDone = true : filterYearEndStudyDone = false;
    while (studentsTableBody.hasChildNodes()) {
      studentsTableBody.removeChild(studentsTableBody.lastChild);
    }
    filterTable();
  })

  function filterTable() {
    if (!filterNameDone && !filterFacultyDone && !filterYearStartStudyDone && !filterYearEndStudyDone) {
      drawTable(localStorageStudents);
    }
    if (filterNameDone && !filterFacultyDone && !filterYearStartStudyDone && !filterYearEndStudyDone) {
      filterByName(localStorageStudents);
      filteredLocalStorageStudents = filteredByNameArray;
    }
    if (!filterNameDone && filterFacultyDone && !filterYearStartStudyDone && !filterYearEndStudyDone) {
      filterByFaculty(localStorageStudents);
      filteredLocalStorageStudents = filteredByFacultyArray;
    }
    if (!filterNameDone && !filterFacultyDone && filterYearStartStudyDone && !filterYearEndStudyDone) {
      filterByYearStartStudy(localStorageStudents);
      filteredLocalStorageStudents = filteredByYearStartStudyArray;
    }
    if (!filterNameDone && !filterFacultyDone && !filterYearStartStudyDone && filterYearEndStudyDone) {
      filterByYearEndStudy(localStorageStudents);
      filteredLocalStorageStudents = filteredByYearEndStudyArray;
    }
    if (filterNameDone && filterFacultyDone && !filterYearStartStudyDone && !filterYearEndStudyDone) {
      filterByName(localStorageStudents);
      filterByFaculty(filteredByNameArray);
      filteredLocalStorageStudents = filteredByFacultyArray;
    }
    if (filterNameDone && !filterFacultyDone && filterYearStartStudyDone && !filterYearEndStudyDone) {
      filterByName(localStorageStudents);
      filterByYearStartStudy(filteredByNameArray);
      filteredLocalStorageStudents = filteredByYearStartStudyArray;
    }
    if (filterNameDone && !filterFacultyDone && !filterYearStartStudyDone && filterYearEndStudyDone) {
      filterByName(localStorageStudents);
      filterByYearEndStudy(filteredByNameArray);
      filteredLocalStorageStudents = filteredByYearEndStudyArray;
    }
    if (!filterNameDone && filterFacultyDone && filterYearStartStudyDone && !filterYearEndStudyDone) {
      filterByFaculty(localStorageStudents);
      filterByYearStartStudy(filteredByFacultyArray);
      filteredLocalStorageStudents = filteredByYearStartStudyArray;
    }
    if (!filterNameDone && filterFacultyDone && !filterYearStartStudyDone && filterYearEndStudyDone) {
      filterByFaculty(localStorageStudents);
      filterByYearEndStudy(filteredByFacultyArray);
      filteredLocalStorageStudents = filteredByYearEndStudyArray;
    }
    if (!filterNameDone && !filterFacultyDone && filterYearStartStudyDone && filterYearEndStudyDone) {
      filterByYearStartStudy(localStorageStudents);
      filterByYearEndStudy(filteredByYearStartStudyArray);
      filteredLocalStorageStudents = filteredByYearEndStudyArray;
    }
    if (filterNameDone && filterFacultyDone && filterYearStartStudyDone && !filterYearEndStudyDone) {
      filterByName(localStorageStudents);
      filterByFaculty(filteredByNameArray);
      filterByYearStartStudy(filteredByFacultyArray);
      filteredLocalStorageStudents = filteredByYearStartStudyArray;
    }
    if (filterNameDone && filterFacultyDone && !filterYearStartStudyDone && filterYearEndStudyDone) {
      filterByName(localStorageStudents);
      filterByFaculty(filteredByNameArray);
      filterByYearEndStudy(filteredByFacultyArray);
      filteredLocalStorageStudents = filteredByYearEndStudyArray;
    }
    if (filterNameDone && !filterFacultyDone && filterYearStartStudyDone && filterYearEndStudyDone) {
      filterByName(localStorageStudents);
      filterByYearStartStudy(filteredByNameArray);
      filterByYearEndStudy(filteredByYearStartStudyArray);
      filteredLocalStorageStudents = filteredByYearEndStudyArray;
    }
    if (!filterNameDone && filterFacultyDone && filterYearStartStudyDone && filterYearEndStudyDone) {
      filterByFaculty(localStorageStudents);
      filterByYearStartStudy(filteredByFacultyArray);
      filterByYearEndStudy(filteredByYearStartStudyArray);
      filteredLocalStorageStudents = filteredByYearEndStudyArray;
    }
    if (filterNameDone && filterFacultyDone && filterYearStartStudyDone && filterYearEndStudyDone) {
      filterByName(localStorageStudents)
      filterByFaculty(filteredByNameArray);
      filterByYearStartStudy(filteredByFacultyArray);
      filterByYearEndStudy(filteredByYearStartStudyArray);
      filteredLocalStorageStudents = filteredByYearEndStudyArray;
    }
    thClassesRemove(thFullname);
    thClassesRemove(thFaculty);
    thClassesRemove(thYearStartStudy);
    thClassesRemove(thDateOfBirth);
  }
})()
