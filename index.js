const api = "https://random-flat-colors.vercel.app/api/random?count=10";
const leftSide = document.querySelector(".left-side");
const rightSide = document.querySelector(".right-side");
const leftSideButton = document.querySelector("button");
var listsArr = [];

// Opening creative creation
leftSideButton.addEventListener("click", () => {
  leftSide.style.width = "75%";
  rightSide.style.display="block";
  leftSideButton.style.visibility = "hidden";
  leftSideButton.style.boxShadow = "none";
});

// Fetching random colour through api
const randomColor = async () => {
  const response = await fetch(api);
  const { colors } = await response.json();

  let colorContainerElement = document.querySelector(".color-container");
  let colorContainerElement1 = document.querySelector(".color-container1");

  for (let j = 0; j < colors.length; j++) {
    colorContainerElement.innerHTML += `<label class="container">
      <input value=${colors[j]} type="checkbox" onClick=filterByColor(event)>
      <span class="checkmark" style="background-color: ${colors[j]}"></span>
      </label>`;
    colorContainerElement1.innerHTML += `<label class="container1">
    <input value=${colors[j]} type="radio" name="radio" required>
    <span class="checkmark1" style="background-color: ${colors[j]}"></span>
    </label>`;
  }
};
randomColor();

// closing creative creation
document.querySelector("i").addEventListener("click", () => {
  leftSide.style.width = "100%";
  rightSide.style.display="none"
  leftSideButton.style.visibility = "visible";
});

function creativesCount() {
  let count = listsArr.length;

  document.querySelector("#count").innerText = count;

  let range = (count / 20) * 100;

  document.querySelector(".fill").style.width = `${range}%`;

  leftSide.style.width = "100%";
  rightSide.style.display="none"
  if (count < 20) {
    leftSideButton.style.visibility = "visible";
  }
  if (count === 20) {
    leftSideButton.style.visibility = "visible";
    leftSideButton.disabled = true;
    leftSideButton.style.boxShadow = "none";
    alert("Creatives limit fulled delete some creatives card to add new creatives.");
  }
}

// submiting the creative form having title, subtitle & color
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const radio = document.querySelector("input[type=radio][name=radio]:checked");

  if (
    e.target[0].value.trim().length > 0 &&
    e.target[1].value.trim().length > 0
  ) {
    listsArr.push({
      id: Math.random(),
      title: e.target[0].value.trim(),
      subTitle: e.target[1].value.trim(),
      bgColor: radio.value,
    });

    renderList();
    filterByColor();
    searchByText();
  } else {
    alert("Title and Sub-Title should not be empty...");
    return;
  }

  creativesCount();

  e.target[0].value = "";
  e.target[1].value = "";

  radio.checked = false;
});

// function for checking the checked color and filtering the input card by checked color
function checkedColor() {
  const colorInput = Array.from(
    document.querySelectorAll("input[type=checkbox]")
  );
  const filteredColour = colorInput.filter((color) => {
    return color.checked;
  });
  let filteredListByColor = [];

  for (let i = 0; i < filteredColour.length; i++) {
    for (let j = 0; j < listsArr.length; j++) {
      if (filteredColour[i].value === listsArr[j].bgColor) {
        filteredListByColor.push(listsArr[j]);
      }
    }
  }
  return filteredListByColor;
}

// searching the card trough color
function filterByColor() {
  let inputString = document
    .querySelector("#searchBar")
    .value.toUpperCase()
    .trim();
  const filteredListByColor = checkedColor();
  const enteredMatchSearchValue = matchedListSearchValue();

  const colorInput = Array.from(
    document.querySelectorAll("input[type=checkbox]")
  );
  const filteredColour = colorInput.filter((color) => {
    return color.checked;
  });

  if (inputString.length === 0) {
    document.querySelector("ul").innerHTML = "";

    if (filteredListByColor.length > 0) {
      for (let i = 0; i < filteredListByColor.length; i++) {
        document.querySelector(
          "ul"
        ).innerHTML += `<li id=${filteredListByColor[i].id} class=${filteredListByColor[i].bgColor} style="background-color:${filteredListByColor[i].bgColor}"><div class="content"><h2>${filteredListByColor[i].title}</h2><h3>${filteredListByColor[i].subTitle}</h3></div><div class="icon"><span><i class="fa-solid fa-pen-to-square edit"></i></span>
        <span><i class="fa-solid fa-trash delete"></i></span></div></li>`;
      }
    } else if (
      filteredListByColor.length === 0 &&
      filteredColour.length !== 0
    ) {
      document.querySelector(
        "ul"
      ).innerHTML = `<p class="result">No match found!!</p>`;
    } else {
      renderList();
    }
  }

  if (inputString.length > 0) {
    if (
      enteredMatchSearchValue.length > 0 &&
      filteredColour.length > 0 &&
      filteredListByColor.length > 0
    ) {
      let filteredArray = [];
      for (let i = 0; i < enteredMatchSearchValue.length; i++) {
        for (let j = 0; j < filteredColour.length; j++) {
          if (enteredMatchSearchValue[i].bgColor === filteredColour[j].value) {
            filteredArray.push(enteredMatchSearchValue[i]);
          }
        }
      }

      document.querySelector("ul").innerHTML = "";

      for (let i = 0; i < filteredArray.length; i++) {
        document.querySelector(
          "ul"
        ).innerHTML += `<li id=${filteredArray[i].id} class=${filteredArray[i].bgColor} style="background-color:${filteredArray[i].bgColor}"><div class="content"><h2>${filteredArray[i].title}</h2><h3>${filteredArray[i].subTitle}</h3></div><div class="icon"><span><i class="fa-solid fa-pen-to-square edit"></i></span>
        <span><i class="fa-solid fa-trash delete"></i></span></div></li>`;
      }

      if (filteredArray.length === 0) {
        document.querySelector(
          "ul"
        ).innerHTML = `<p class="result">No match found!!</p>`;
      }
    }
    if (
      enteredMatchSearchValue.length > 0 &&
      filteredColour.length > 0 &&
      filteredListByColor.length === 0
    ) {
      document.querySelector(
        "ul"
      ).innerHTML = `<p class="result">No match found!!</p>`;
    }
    if (
      enteredMatchSearchValue.length > 0 &&
      filteredColour.length === 0 &&
      filteredListByColor.length > 0
    ) {
      document.querySelector("ul").innerHTML = "";
      for (let i = 0; i < enteredMatchSearchValue.length; i++) {
        document.querySelector(
          "ul"
        ).innerHTML += `<li id=${enteredMatchSearchValue[i].id} class=${enteredMatchSearchValue[i].bgColor} style="background-color:${enteredMatchSearchValue[i].bgColor}"><div class="content"><h2>${enteredMatchSearchValue[i].title}</h2><h3>${enteredMatchSearchValue[i].subTitle}</h3></div><div class="icon"><span><i class="fa-solid fa-pen-to-square edit"></i></span>
        <span><i class="fa-solid fa-trash delete"></i></span></div></li>`;
      }
    }
    if (
      enteredMatchSearchValue.length > 0 &&
      filteredColour.length === 0 &&
      filteredListByColor.length === 0
    ) {
      document.querySelector("ul").innerHTML = "";
      for (let i = 0; i < enteredMatchSearchValue.length; i++) {
        document.querySelector(
          "ul"
        ).innerHTML += `<li id=${enteredMatchSearchValue[i].id} class=${enteredMatchSearchValue[i].bgColor} style="background-color:${enteredMatchSearchValue[i].bgColor}"><div class="content"><h2>${enteredMatchSearchValue[i].title}</h2><h3>${enteredMatchSearchValue[i].subTitle}</h3></div><div class="icon"><span><i class="fa-solid fa-pen-to-square edit"></i></span>
        <span><i class="fa-solid fa-trash delete"></i></span></div></li>`;
      }
    }
    if (enteredMatchSearchValue.length === 0) {
      document.querySelector(
        "ul"
      ).innerHTML = `<p class="result">No match found!!</p>`;
    }
  }
  document
    .querySelectorAll(".delete")
    .forEach((val) => val.addEventListener("click", deleteCard));
  document
    .querySelectorAll(".edit")
    .forEach((val) => val.addEventListener("click", editCard));
}

// function to find the matched title/subtile as per search text
function matchedListSearchValue() {
  let cardArray = [...listsArr];
  let inputString = document
    .querySelector("#searchBar")
    .value.toUpperCase()
    .trim();

  let matchList = cardArray.filter((list) => {
    if (inputString === "") {
      return;
    }
    if (
      list.title.toUpperCase().match(inputString) ||
      list.subTitle.toUpperCase().match(inputString)
    ) {
      return list;
    }
  });
  return matchList;
}

// searching the card trough card title/sub-title
function searchByText() {
  let inputString = document
    .querySelector("#searchBar")
    .value.toUpperCase()
    .trim();
  let enteredMatchSearchValue = matchedListSearchValue();
  let filteredListByColor = checkedColor();

  const colorInput = Array.from(
    document.querySelectorAll("input[type=checkbox]")
  );
  const filteredColour = colorInput.filter((color) => {
    return color.checked;
  });

  if (inputString.length === 0) {
    document.querySelector("ul").innerHTML = "";

    if (filteredListByColor.length > 0) {
      for (let i = 0; i < filteredListByColor.length; i++) {
        document.querySelector(
          "ul"
        ).innerHTML += `<li id=${filteredListByColor[i].id} class=${filteredListByColor[i].bgColor} style="background-color:${filteredListByColor[i].bgColor}"><div class="content"><h2>${filteredListByColor[i].title}</h2><h3>${filteredListByColor[i].subTitle}</h3></div><div class="icon"><span><i class="fa-solid fa-pen-to-square edit"></i></span>
        <span><i class="fa-solid fa-trash delete"></i></span></div></li>`;
      }
    } else if (
      filteredListByColor.length === 0 &&
      filteredColour.length !== 0
    ) {
      document.querySelector(
        "ul"
      ).innerHTML = `<p class="result">No match found!!</p>`;
    } else {
      renderList();
    }
  }

  if (inputString.length > 0) {
    if (
      enteredMatchSearchValue.length > 0 &&
      filteredColour.length === 0 &&
      filteredListByColor.length === 0
    ) {
      document.querySelector("ul").innerHTML = "";
      for (let i = 0; i < enteredMatchSearchValue.length; i++) {
        document.querySelector(
          "ul"
        ).innerHTML += `<li id=${enteredMatchSearchValue[i].id} class=${enteredMatchSearchValue[i].bgColor} style="background-color:${enteredMatchSearchValue[i].bgColor}"><div class="content"><h2>${enteredMatchSearchValue[i].title}</h2><h3>${enteredMatchSearchValue[i].subTitle}</h3></div><div class="icon"><span><i class="fa-solid fa-pen-to-square edit"></i></span>
        <span><i class="fa-solid fa-trash delete"></i></span></div></li>`;
      }
    }

    if (
      enteredMatchSearchValue.length > 0 &&
      filteredColour.length > 0 &&
      filteredListByColor.length === 0
    ) {
      document.querySelector(
        "ul"
      ).innerHTML = `<p class="result">No match found!!</p>`;
    }

    if (
      enteredMatchSearchValue.length > 0 &&
      filteredColour.length > 0 &&
      filteredListByColor.length > 0
    ) {
      let filteredArray = [];
      for (let i = 0; i < enteredMatchSearchValue.length; i++) {
        for (let j = 0; j < filteredColour.length; j++) {
          if (enteredMatchSearchValue[i].bgColor === filteredColour[j].value) {
            filteredArray.push(enteredMatchSearchValue[i]);
          }
        }
      }
      document.querySelector("ul").innerHTML = "";
      for (let i = 0; i < filteredArray.length; i++) {
        document.querySelector(
          "ul"
        ).innerHTML += `<li id=${filteredArray[i].id} class=${filteredArray[i].bgColor} style="background-color:${filteredArray[i].bgColor}"><div class="content"><h2>${filteredArray[i].title}</h2><h3>${filteredArray[i].subTitle}</h3></div><div class="icon"><span><i class="fa-solid fa-pen-to-square edit"></i></span>
        <span><i class="fa-solid fa-trash delete"></i></span></div></li>`;
      }
      if (filteredArray.length === 0) {
        document.querySelector(
          "ul"
        ).innerHTML = `<p class="result">No match found!!</p>`;
      }
    }

    if (
      enteredMatchSearchValue.length > 0 &&
      filteredColour.length === 0 &&
      filteredListByColor.length > 0
    ) {
      document.querySelector("ul").innerHTML = "";
      for (let i = 0; i < enteredMatchSearchValue.length; i++) {
        document.querySelector(
          "ul"
        ).innerHTML += `<li id=${enteredMatchSearchValue[i].id} class=${enteredMatchSearchValue[i].bgColor} style="background-color:${enteredMatchSearchValue[i].bgColor}"><div class="content"><h2>${enteredMatchSearchValue[i].title}</h2><h3>${enteredMatchSearchValue[i].subTitle}</h3></div><div class="icon"><span><i class="fa-solid fa-pen-to-square edit"></i></span>
        <span><i class="fa-solid fa-trash delete"></i></span></div></li>`;
      }
    }

    if (enteredMatchSearchValue.length === 0) {
      document.querySelector(
        "ul"
      ).innerHTML = `<p class="result">No match found!!</p>`;
    }
  }
  document
    .querySelectorAll(".delete")
    .forEach((val) => val.addEventListener("click", deleteCard));
  document
    .querySelectorAll(".edit")
    .forEach((val) => val.addEventListener("click", editCard));
}

// adding key-up event on function search by text
document.querySelector("#searchBar").addEventListener("keyup", searchByText);

// function to render the submitted creative creation to UI
function renderList() {
  document.querySelector("ul").innerHTML = "";
  if (listsArr.length > 0) {
    listsArr.forEach((list) => {
      document.querySelector(
        "ul"
      ).innerHTML += `<li id=${list.id} class=${list.bgColor} style="background-color:${list.bgColor}"><div class="content"><h2>${list.title}</h2><h3>${list.subTitle}</h3></div><div class="icon"><span><i class="fa-solid fa-pen-to-square edit"></i></span>
      <span><i class="fa-solid fa-trash delete"></i></span></div></li>`;
    });
  }
  document
    .querySelectorAll(".delete")
    .forEach((val) => val.addEventListener("click", deleteCard));
  document
    .querySelectorAll(".edit")
    .forEach((val) => val.addEventListener("click", editCard));
}

function deleteCard(e) {
  console.log(e.path);
  console.log(e.path[4].childNodes);
  let index = listsArr.findIndex((list) => list.id.toString() === e.path[3].id);
  console.log(index);
  console.log(listsArr);
  listsArr.splice(index, 1);
  creativesCount();
  renderList();
  searchByText();
  filterByColor();
}

function editCardForm(e) {
  e.preventDefault();
  console.log(e.target[0].value);
  console.log(e.target[1].value);
  console.log(e.path);
  if (
    e.target[0].value.trim().length > 0 &&
    e.target[1].value.trim().length > 0
  ) {
    for (let i = 0; i < listsArr.length; i++) {
      if (listsArr[i].id.toString() === e.path[1].id) {
        listsArr[i].title = e.target[0].value;
        listsArr[i].subTitle = e.target[1].value;
      }
    }
    renderList();
    searchByText();
    filterByColor();
  }else{
    alert("Title/Subtitle should not be empty..")
    return;
    // e.path[0][0].value="invalid"
    // renderList();
  }
}

function cancelEditCard(e) {
  for (let i = 0; i < listsArr.length; i++) {
    if (listsArr[i].id.toString() === e.path[3].id) {
      e.path[3].innerHTML = `<li id=${listArr[i].id} class=${listArr[i].bgColor} style="background-color:${listArr[i].bgColor}"><div class="content"><h2>${listArr[i].title}</h2><h3>${listArr[i].subTitle}</h3></div><div class="icon"><span><i class="fa-solid fa-pen-to-square edit"></i></span>
      <span><i class="fa-solid fa-trash delete"></i></span></div></li>`;
    }
  }
  renderList();
  searchByText();
  filterByColor();
}

function editCard(e) {
  console.log(e.path);
  console.log(e.path[3]);
  e.path[3].innerHTML = `<form onSubmit="editCardForm(event)"><input class="editCardTitleInput" type="text" placeholder="Title" required/><br><input class="editCardSubTitleInput" type="text" placeholder="Sub-Title" required/><br><button class="cardEditOkBtn">Edit</button></form><button class="cardEditCancelBtn" onClick="cancelEditCard(event)">Cancel</button>`;
}
