let postLinkElements = document.getElementsByClassName("postlink")
Array.from(postLinkElements).forEach(element => {
    element.addEventListener("click", event => setPostRead(element.id))
});

function setPostRead(postID) {
    console.log(postID)
    fetch("/api/setpostread?postid="+postID).then(response => response.text().then(text => console.log(text)))
}