"use strict";

//~ Element selectors
let webSiteNameInput = document.querySelector('input[id="siteName"]');
let webSiteURLInput = document.querySelector('input[id="siteURL"]');
let bookMarksBody = document.querySelector('tbody[id="bookmarksBody"]');
let bookMarksCount = document.querySelector('span[id="bookmarkCount"]');
let alertMarkup = document.getElementById("validationAlert");

//~ App Variables
let bookMarkList = JSON.parse(localStorage.getItem("bookMarkList")) || [];
displayALLBookMarks();
clearForm();

//regex variables:
let webSiteNameRegex = /^[\p{L}\d _-]{3,50}$/u;
let webSiteURLRegex =
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]{2,}\.[a-z]{2,}(\S*)?$/;

//~ Functions

function addBookMark() {
  let isvalid =
    webSiteNameRegex.test(webSiteNameInput.value) &&
    webSiteURLRegex.test(webSiteURLInput.value);

  if (isvalid) {
    let bookMark = {
      webSiteName: webSiteNameInput.value,
      webSiteURL: webSiteURLInput.value,
    };

    bookMarkList.push(bookMark);
    localStorage.setItem("bookMarkList", JSON.stringify(bookMarkList));
    bookMarksBody.innerHTML = "";
    bookMarksCount.innerHTML = "";
    displayALLBookMarks();
    clearForm();
  } else {
    Swal.fire({
      icon: "error",
      iconColor: "#d33",
      html: alertMarkup.innerHTML,
    });
  }
}

function displayBookMarks(index) {
  let bookMarkMarkup = `<tr>
                      <td>${index + 1}</td>
                      <td>${bookMarkList[index].webSiteName}</td>
                      <td>${bookMarkList[index].webSiteURL}</td>
                      <td class="text-center">
                        <a
                          href="${bookMarkList[index].webSiteURL}"
                          target="_blank"
                          class="btn-visit"
                        >
                          <i class="fas fa-eye me-1"></i>Visit
                        </a>
                      </td>
                      <td class="text-center">
                        <button class="btn-delete" onclick="deleteBookMark(${index})">
                          <i class="fas fa-trash me-1"></i>Delete
                        </button>
                      </td>
                    </tr>`;

  bookMarksBody.innerHTML += bookMarkMarkup;
  bookMarksCount.innerHTML = `${bookMarkList.length}`;
}

function displayALLBookMarks() {
  bookMarksBody.innerHTML = "";

  if (bookMarkList.length === 0) {
    bookMarksCount.innerHTML = "0";
    document.getElementById("emptyState").classList.remove("d-none");
    return;
  }

  document.getElementById("emptyState").classList.add("d-none");

  for (let i = 0; i < bookMarkList.length; i++) {
    displayBookMarks(i);
  }

  bookMarksCount.innerHTML = bookMarkList.length;
}

function deleteBookMark(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    iconColor: "#d33",
    confirmButtonColor: "#764ba2",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      bookMarkList.splice(index, 1);
      localStorage.setItem("bookMarkList", JSON.stringify(bookMarkList));
      displayALLBookMarks();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}

function validate(regex, input) {
  if (regex.test(input.value)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

function clearForm() {
  webSiteNameInput.value = "";
  webSiteURLInput.value = "";

  webSiteNameInput.classList.remove("is-valid", "is-invalid");
  webSiteURLInput.classList.remove("is-valid", "is-invalid");
}
