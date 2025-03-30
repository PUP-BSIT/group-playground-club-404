let nameInput = document.getElementById("comment_name");
let commentInput = document.getElementById("comment_text");
let commentBtn = document.getElementById("comment_btn");

function checkInputs() {
   if (nameInput.value.trim() && commentInput.value.trim()) {
      commentBtn.removeAttribute("disabled");
  } else {
      commentBtn.setAttribute("disabled");
  }
}

nameInput.addEventListener("input", checkInputs);
commentInput.addEventListener("input", checkInputs);