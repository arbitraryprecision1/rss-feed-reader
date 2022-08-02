let postLinkElements = document.getElementsByClassName("postlink")
Array.from(postLinkElements).forEach(element => {
    element.addEventListener("click", event => setPostRead(element.id))
});

function setPostRead(postID) {
    console.log(postID)
    fetch("/api/setpostread?postid="+postID).then(response => response.text().then(text => console.log(text)))
}

let updateLink = document.getElementById("updatelink")
updateLink.addEventListener("click", updateAllOutdatedFeeds)

// TODO: handle errors here, nitter sometimes gives errors
function updateAllOutdatedFeeds() {
    let updateLink = Array.from(document.getElementById('toupdate').getElementsByTagName("p"))
        .map(x => x.innerHTML)
        .forEach(x => fetch("/"+x))
    console.log(updateLink)

}