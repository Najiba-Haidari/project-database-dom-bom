export function handleEdit(event) {
  event.preventDefault();
  const selectedTr = event.target.parentNode.parentNode;
  const index = selectedTr.dataset.index;
  let trData = JSON.parse(localStorage.getItem("trData")) || [];

  const project = trData[index];

  const newProjectName = prompt("New Name of the project?", project.projectName);
  const newProjectLanguage = prompt("New Language of the project?", project.projectLanguage);
  const newProjectDate = prompt("New Date of the project in YYYY-MM-DD format?", project.projectDate);
  const newProjectStatus = prompt("New Status of the project?", project.projectStatus);

  if (newProjectName) project.projectName = newProjectName;
  if (newProjectLanguage) project.projectLanguage = newProjectLanguage;
  if (newProjectDate) project.projectDate = newProjectDate;
  if (newProjectStatus) project.projectStatus = newProjectStatus;

  trData[index] = project;
  localStorage.setItem("trData", JSON.stringify(trData));

  selectedTr.children[0].textContent = project.projectName;
  selectedTr.children[1].textContent = project.projectLanguage;
  selectedTr.children[2].textContent = project.projectDate;
  selectedTr.children[3].textContent = project.projectStatus;
}
