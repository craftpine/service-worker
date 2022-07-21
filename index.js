console.log("js works");

const modalCountLocalStorageKey = "modalCount";
const modalOpenCount = localStorage.getItem(modalCountLocalStorageKey) ?? 0;
if (modalOpenCount === 0) {
  $("#exampleModal").modal("show");
  localStorage.setItem(modalCountLocalStorageKey, 1);
}
