// Function to check if the input and textarea are filled.
function checkComment() {
	let username = document.getElementById("input_name");
	let usrComment = document.getElementById("comment_area");

	if(usrComment.value.length > 0 && username.value.length > 0) {
		document.getElementById("comment_btn").disabled = false;
		document.getElementById("comment_btn").style.backgroundColor = 
			"#76ABAE";
	} else {
		document.getElementById("comment_btn").disabled = true;
		document.getElementById("comment_btn").style.backgroundColor = "";
	}
}