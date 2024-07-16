
addEventListener("DOMContentLoaded", () => {
    getAllPosts()
})

let addBtn = document.getElementById("btnSalvar")
addBtn.addEventListener("click", () => {

    let title = document.getElementById("title").value
    let desc = document.getElementById("description").value
    createNewPost(title, desc)

})


function getAllPosts() {

    fetch("http://localhost:3333/api/all")
        .then((res) => {
            return res.json()
        })
        .then((json) => {

            var cards = ""
            let posts = JSON.parse(json)
            let mural = document.getElementById("posts")

            posts.forEach(post => {

                let card = `
                <div id=${post.id} class="card mt-3">
                <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="card-title text-primary">${post.title}</h5>
                        <button onclick="deletePost(${post.id})" type="button" class="btn-close"></button>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${post.description}</p>
                    </div>
                </div>
            `
                cards += card
            });
            mural.innerHTML = cards


        })
        .catch((err) => {
            console.log(err)
        })

}

function createNewPost(title, description) {

    fetch("http://localhost:3333/api/new", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "title": title,
            "description": description
        })
    })
        .then(() => {
            getAllPosts()
            clearInputValues()
            console.log("Post Criado com Sucesso")
        })
        .catch((err) => {
            console.log(err)
        })

}

function deletePost(target) {
    
    console.log(target.id)

    fetch("http://localhost:3333/api/remove/", {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "id": target.id,
        })
    })
        .then(() => {
            getAllPosts()
            console.log("Post Deletado com Sucesso")
        })
        .catch((err) => {
            console.log(err)
        })
}

function clearInputValues() {
    let title = document.getElementById("title").value = ""
    let desc = document.getElementById("description").value = ""
}