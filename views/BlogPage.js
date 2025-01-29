async function submitBlog(event) {
    event.preventDefault();
    const title = document.getElementById('blog-title').value;
    const author = document.getElementById('blog-author').value;
    const content = document.getElementById('blog-content').value;

    const response = await fetch('http://localhost:5500/submit-blog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author, content })
    });

    if (response.ok) {
        //alert('Blog submitted successfully!');
        location.reload();
    } else {
        alert('Error submitting blog.');
    }
}

async function addComment(blogId) {
    const commentInput = document.getElementById(`comment-input-${blogId}`);
    const comment = commentInput.value;

    const response = await fetch(`http://localhost:5500/add-comment/${blogId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({comment:comment})
    });

    if (response.ok) {
        //alert('Comment added successfully!');
        location.reload();
    } else {
        alert('Error adding comment.');
    }
}

async function fetchBlogs() {
    const response = await fetch('http://localhost:5500/get-blogs');
    if (response.ok) {
        
        const blogs = await response.json();
        //console.log('Maybe Here');
        const blogList = document.getElementById('blog-list');
        blogList.innerHTML = '';

        blogs.forEach(blog => {
            const blogDiv = document.createElement('div');
            blogDiv.style.backgroundColor='Black';
            blogDiv.style.color='white';
            blogDiv.innerHTML = `
                <h3 class="blog-title">${blog.title}</h3>
                <h3 class="blog-extend" onclick="toggleBlogContent(${blog.id})" style="text-align: right;">+</h3>
                <div id="blog-content-${blog.id}" class="hidden">
                    <p style="color:Orange;"><strong>Author:</strong> ${blog.author}</p>
                    <p style="margin:45px">${blog.content}</p><br><hr>
                    <div>
                        <h4>Comments:</h4>
                        <div id="comment-section-${blog.id}"></div><br><br><hr>
                        <input id="comment-input-${blog.id}" placeholder="Add a comment">
                        <button onclick="addComment(${blog.id})">Submit Comment</button>
                    </div>
                </div>
            `;
            retrieveComment(blog.id);
            blogList.appendChild(blogDiv);
        });
    } else {
        console.log('No Blogs Retrieved.');
    }
}

function toggleBlogContent(blogId) {
    const contentDiv = document.getElementById(`blog-content-${blogId}`);
    contentDiv.classList.toggle('hidden');
}

async function retrieveComment(id) {
    const response = await fetch(`http://localhost:5500/comments/get-comment/${id}`);
    if(response.ok) {
        const comments = await response.json();
        const commentSection = document.getElementById(`comment-section-${id}`);
        commentSection.innerHTML = "";
        comments.forEach(commentline => {
            const commentDiv = document.createElement('div');
            commentDiv.style.marginLeft = '20px';

            const commentText = document.createElement('p');
            commentText.textContent = commentline.comment;
            
            commentDiv.appendChild(commentText);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.style.backgroundColor = 'red';
            deleteButton.style.color = 'white';
            deleteButton.addEventListener('click', () => deleteComment(commentline.id));

            commentDiv.appendChild(deleteButton);

            commentSection.appendChild(commentDiv);
        })
    }
}

async function deleteComment(commentId) {
    const response = await fetch(`http://localhost:5500/comments/delete-comment/${commentId}`, {
        method: 'DELETE'
    });
    if(response.ok) {
        //alert('Comment deleted!');
        location.reload();
    } else {
        alert('Error in Deleting Comment.');
    }
}

window.onload = function() {
    fetchBlogs();
};

//<h3 class="blog-title" onclick="toggleBlogContent(${blog.id})">${blog.title}</h3>