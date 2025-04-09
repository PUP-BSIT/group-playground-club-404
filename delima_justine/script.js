let date = new Date().toLocaleString();
let dateContainer = document.getElementsByClassName('date');
let username = document.getElementById("input_name");
let comment = document.getElementById("comment_area");
let submitButton = document.getElementById("comment_btn");

const comments = [
	{
		date: '3/19/2025, 9:42:12 PM', 
		username: 'Arroyo', 
		comment: `Goodluck with your goals! Continue to learn.`
	},
	{
		date: '3/19/2025, 9:09:26 PM', 
		username: 'Relente', 
		comment: `𐙚⋆°｡⋆You're making great progress!`
	},
	{
		date: '3/19/2025, 9:18:28 PM', 
		username: 'Ynion', 
		comment: `Stay keep pushing forward that your resilience will lead 
			you to the fulfillment of your dreams.`
	}
];

function checkComment() {
	if(username.value.length && comment.value.length) {
		submitButton.disabled = false;
	} else {
		submitButton.disabled = true;
	}
}

function addComment() {
	let commentSection = document.getElementById("comments");
	const newComment = `<div class="comment">
							<h2 class="comment-name">${username.value}</h2>
							<p class="new-comment">${comment.value}</p>
							<label class="date">${date}</label>
						</div>`;

	date = new Date().toLocaleString();					

	if (!submitButton.disabled) {
		comments.push({date: date, username: username.value, 
			comment: comment.value});

		commentSection.insertAdjacentHTML("beforeend", newComment);
	}
	
	username.value = "";
	comment.value = "";
	submitButton.disabled = true;
}

function ascendingOrder() {
	let collectionOfComments = document.querySelectorAll(".comment");

	comments.sort((a, b) => {
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

    for (let index = 0; index < comments.length; index++) {
        collectionOfComments[index].children[0].innerHTML = 
			comments[index].username;
        collectionOfComments[index].children[1].innerHTML = 
			comments[index].comment;
        collectionOfComments[index].children[2].innerHTML = 
			comments[index].date;
    }
}

function descendingOrder() {
	let collectionOfComments = document.querySelectorAll(".comment");
	
	comments.sort((a, b) => {
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

	for (let index = 0; index < comments.length; index++) {
        collectionOfComments[index].children[0].innerHTML = 
			comments[index].username;
        collectionOfComments[index].children[1].innerHTML = 
			comments[index].comment;
        collectionOfComments[index].children[2].innerHTML = 
			comments[index].date;
    }
}