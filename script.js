

async function GetPosts() {
    let res = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data = await res.json();
    return data;
}

async function GetComments(postId) {
    let com = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    let data = await com.json();
    return data;
}

window.onload = async () => {
    let posts = await GetPosts();
    let parent = document.getElementById("main");
    posts.forEach(post => {
        let link = `https://jsonplaceholder.typicode.com/posts/${post["id"]}/comments`;
        parent.innerHTML += `<div class="col-3 mt-4">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${post["title"]}</h5>
                    <p class="card-text">${post["body"]}</p>
                    <a href="${link}" class="card-link" target="_blank" data-post-id="${post["id"]}">Go To Detail</a>
                </div>
            </div>
        </div>`;
    });

    let cardLinks = document.querySelectorAll(".card-link");
    cardLinks.forEach(link => {
        link.addEventListener("click", async (event) => {
            event.preventDefault(); 
            let postId = link.getAttribute("data-post-id");
            let comments = await GetComments(postId);
            let parent1 = document.getElementById("main");

            parent1.innerHTML = "";

            comments.forEach(comment => {
                parent1.innerHTML += `
                    <div class="col-3 mt-4">
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${comment["name"]}</h5>
                                <p class="card-text">${comment["email"]}</p>
                                <p class="card-text">${comment["body"]}</p>
                            </div>
                        </div>
                    </div>`
                    

            });
        });
    });
};



