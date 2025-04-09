document.addEventListener("DOMContentLoaded", () => {
    //Comment Form
    const commentForm = document.getElementById("comment_form");
    const commentName = document.getElementById("comment_name");
    const commentText = document.getElementById("comment_text");
    const commentList = document.getElementById("comment_list");
    const commentBtn = document.getElementById("comment_btn");
    const sortSelect = document.getElementById("sort_comments");

    commentBtn.disabled = true;

    function buttonState() {
        let isFilled = commentName.value.trim() && commentText.value.trim();
        commentBtn.disabled = !isFilled;
    }

    commentName.addEventListener("input", buttonState);
    commentText.addEventListener("input", buttonState);

    //Prevent default form submission
    commentForm.addEventListener("submit", (event) => {
        event.preventDefault(); //Prevent refresh to the screen

        let nameValue = commentName.value.trim();
        let textValue = commentText.value.trim();

        if (!nameValue || !textValue) {
            console.error("Both fields must be filled.");
            return;
        }

        addComment(nameValue, textValue);
        commentForm.reset();
        buttonState(); //Re-check after reset
    });

    //Adds the comment
    function addComment(name, text) {
        let commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");

        let timestamp = new Date();
        let timestampText = `(${timestamp.toLocaleString()})`;

        let timestampElement = document.createElement("small");
        timestampElement.textContent = timestampText;

        let nameElement = document.createElement("p");
        nameElement.innerHTML = `<strong>${name}</strong>`;

        let textElement = document.createElement("p");
        textElement.textContent = text;

        //Append elements in the correct order
        commentDiv.append(timestampElement, nameElement, textElement);

        //Append new comment inside #all_comments
        let commentContainer = document.getElementById("all_comments");
        commentContainer.appendChild(commentDiv);

        sortComments(); //Apply sorting to place it correctly
    }

    //Sort the comments
    function sortComments() {
        let commentContainer = document.getElementById("all_comments");
        let allComments = Array.from(
            document.querySelectorAll(
                "#all_comments .comment, #comment_list li"
            )
        );

        let sortOrder = sortSelect.value; //Get value from dropdown

        allComments.sort((a, b) => {
            const extractTimestamp = (element) => {
                const smallElement = element.querySelector("small");
                if (!smallElement) return 0; //Handle missing <small> tags

                const text = smallElement.textContent;
                const regex = /\((?<timestamp>.*?)\)/;
                const match = text.match(regex);

                return match ? new Date(match[1]) : new Date(0);
            };

            const timeA = extractTimestamp(a);
            const timeB = extractTimestamp(b);

            return sortOrder === "latest" ? timeB - timeA : timeA - timeB;
        });

        //Use a document fragment to optimize performance by reducing reflows
        let fragment = document.createDocumentFragment();

        //Add sorted comments to the fragment
        allComments.forEach(comment => fragment.appendChild(comment));
        commentContainer.appendChild(fragment);
    }

    sortSelect.addEventListener("change", sortComments);
});