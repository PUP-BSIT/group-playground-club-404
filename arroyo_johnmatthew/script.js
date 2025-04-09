const commentContent = [
	{
		user: "Justine",
		date: "3/19/2025, 9:59:47 PM",
		comment: "I hope you achieve your goals!",
	},
	{
		user: "Patricia",
		date: "3/19/2025, 10:09:26 PM",
		comment: "𐙚⋆°｡⋆That's a great goal!",
	},
	{
		user: "Bea",
		date: "3/19/2025, 10:18:28 PM",
		comment: "Achieve your goals, I know you can do it!",
	}
];

function buttonEnabler() {
	let name = document.getElementById("user_name");
	let comment = document.getElementById("user_comment");

	if(comment.value.length && name.value.length) {
		document.getElementById("comment_button").disabled = false;
    } else {
		document.getElementById("comment_button").disabled = true;
	}
}

function displayComment() {
	let commentContainer = document.querySelector("#comment_container");
	let commenter = document.getElementById("user_name");
	let comment = document.getElementById("user_comment");
	let button = document.getElementById("comment_button");

	const date = new Date().toLocaleString();
	
	const newComment = `<div class="comment-user">
              				<h2 class="commenter">${commenter.value}</h2>
              				<label class="date">${date}</label>
              				<p class="comment-content">${comment.value}</p>
            			</div>`;

	if(!button.disabled) {
		commentContent.push({
			user: commenter.value,
			date: date,
			comment: comment.value
		});
		commentContainer.insertAdjacentHTML("beforeend", newComment);
	}

	commenter.value = "";
	comment.value = "";
	button.disabled = true;
}

function sortAscending() {
	let commentContainer = document.querySelectorAll(".comment-user");

	commentContent.sort((a,b) => {
		let firstDate = new Date(a.date);
		let secondDate = new Date(b.date);
		
		if (firstDate > secondDate) {
            return 1;
        }

        if (firstDate < secondDate) {
            return -1;
        }

		return 0;
	})

	for(let index = 0; index < commentContent.length; index++) {
		commentContainer[index].children[0].innerHTML = 
			commentContent[index].user;
		commentContainer[index].children[1].innerHTML =
			commentContent[index].date;
		commentContainer[index].children[2].innerHTML =
			commentContent[index].comment;
	}
	
}

function sortDescending() {
	let commentContainer = document.querySelectorAll(".comment-user");

	commentContent.sort((a,b) => {
		let firstDate = new Date(a.date);
		let secondDate = new Date(b.date);
		
		if (firstDate < secondDate) {
            return 1;
        }

        if (firstDate > secondDate) {
            return -1;
        }

		return 0;
	})

	for(let index = 0; index < commentContent.length; index++) {
		commentContainer[index].children[0].innerHTML = 
			commentContent[index].user;
		commentContainer[index].children[1].innerHTML =
			commentContent[index].date;
		commentContainer[index].children[2].innerHTML =
			commentContent[index].comment;
	}
}


