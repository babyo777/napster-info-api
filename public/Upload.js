document.getElementById("cover").addEventListener("change", () => {
  const selectedFile = cover.files[0];
  const objectURL = URL.createObjectURL(selectedFile);
  document.querySelector("#cover-image").src = objectURL;
});

document.getElementById("form").addEventListener("submit", () => {
  document.querySelector(".loader").style.display = "flex";
  document.querySelector(".button").style.display = "none";
});
