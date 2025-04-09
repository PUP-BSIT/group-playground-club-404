function buttonEnabler() {
	let name = document.getElementById("user_name");
	let comment = document.getElementById("user_comment");

	if(comment.value.length > 0 && name.value.length > 0) {
		document.getElementById("comment_button").disabled = false;
    } else {
		document.getElementById("comment_button").disabled = true;
	}
}