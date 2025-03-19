const nameInput = document.getElementById("name");
const commentInput = document.getElementById("comment");
const commentBtn = document.getElementById("comment-btn");

function checkInputs() {
    if (nameInput.value.trim() !== "" && commentInput.value.trim() !== "") {
        commentBtn.removeAttribute("disabled");
    } else {
        commentBtn.setAttribute("disabled", "true");
    }
}

nameInput.addEventListener("input", checkInputs);
commentInput.addEventListener("input", checkInputs);