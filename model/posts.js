module.exports = {

    posts : [],

    getAll() {
        return this.posts;
    },

    newPost(title, description) {

        this.posts.push({id: generateID(), title, description})

    },

    removePost(id) {

        let filteredPosts = this.posts.filter((post) => post.id !== id)

        this.posts = filteredPosts

    }


}

function generateID(){
    return Math.random().toString(36).substring(2,13);
}