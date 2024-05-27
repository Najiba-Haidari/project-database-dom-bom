import { handleEdit } from "./edit.js";

const form = document.querySelector("#project-form");
const projectName = document.querySelector("#name");
const projectLanguage = document.querySelector("#language");
const projectDate = document.querySelector("#date");
const projectStatus = document.getElementById("status");
const errorMessage = document.getElementById("error-message");
const table = document.getElementById("table");

// Load projects from local storage
const loadProjects = () => {
  const trData = JSON.parse(localStorage.getItem("trData")) || [];
  trData.forEach((project, index) => addProjectToTable(project, index));
};

// Add project to table
const addProjectToTable = (project, index) => {
  const tr = document.createElement("tr");
  tr.dataset.index = index;
  table.appendChild(tr);

  const td1 = document.createElement("td");
  td1.textContent = project.projectName;
  tr.appendChild(td1);

  const td2 = document.createElement("td");
  td2.textContent = project.projectLanguage;
  tr.appendChild(td2);

  const td3 = document.createElement("td");
  td3.textContent = project.projectDate;
  tr.appendChild(td3);

  const td4 = document.createElement("td");
  td4.textContent = project.projectStatus;
  tr.appendChild(td4);

  const td5 = document.createElement("td");
  const deleteLink = document.createElement("a");
  deleteLink.textContent = "🗑️";
  deleteLink.setAttribute("href", "#");
  deleteLink.style.backgroundColor = "rgb(233, 238, 238)";
  deleteLink.style.textDecoration = "none";
  td5.appendChild(deleteLink);
  tr.appendChild(td5);

  const td6 = document.createElement("td");
  const editLink = document.createElement("a");
  editLink.textContent = "Edit";
  editLink.setAttribute("href", "#");
  editLink.style.backgroundColor = "rgb(233, 238, 238)";
  editLink.style.color = "blue";
  td6.appendChild(editLink);
  tr.appendChild(td6);

  deleteLink.addEventListener("click", () => handleDeleteProject(index));
  editLink.addEventListener("click", handleEdit);
};

// Handle adding a new project
const handleAddProject = function (event) {
  event.preventDefault();
  if (
    projectName.value === "" ||
    projectLanguage.value === "" ||
    projectDate.value === "" ||
    projectStatus.value === ""
  ) {
    errorMessage.innerHTML = "<p>Please Fill in All the Parts</p>";
    errorMessage.style.border = "3px solid red";
    return false;
  } else {
    errorMessage.innerHTML = "";
    errorMessage.style.border = "";
    const trObj = {
      projectName: projectName.value,
      projectLanguage: projectLanguage.value,
      projectDate: projectDate.value,
      projectStatus: projectStatus.value,
    };
    const trData = JSON.parse(localStorage.getItem("trData")) || [];
    trData.push(trObj);
    localStorage.setItem("trData", JSON.stringify(trData));
    addProjectToTable(trObj, trData.length - 1);

    projectName.value = "";
    projectLanguage.value = "";
    projectDate.value = "";
    projectStatus.value = "";
  }
};

// Handle deleting a project
const handleDeleteProject = (index) => {
  let trData = JSON.parse(localStorage.getItem("trData")) || [];
  trData.splice(index, 1);
  localStorage.setItem("trData", JSON.stringify(trData));
  table.innerHTML = `
    <tr>
      <th>Project name</th>
      <th>Language</th>
      <th>Due Data</th>
      <th>Status</th>
      <th></th>
      <th></th>
    </tr>
  `;
  loadProjects();
};

form.addEventListener("submit", handleAddProject);
document.addEventListener("DOMContentLoaded", loadProjects);
