const nameInput = document.getElementById("comment_name");
const commentInput = document.getElementById("comment_text");
const commentBtn = document.getElementById("comment_btn");

function checkInputs() {
    if (nameInput.value.trim() !== "" && commentInput.value.trim() !== "") {
        commentBtn.removeAttribute("disabled");
    } else {
        commentBtn.setAttribute("disabled", "true");
    }
}

nameInput.addEventListener("input", checkInputs);
commentInput.addEventListener("input", checkInputs);