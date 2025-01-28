async function submitBlog() {
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
        alert('Blog submitted successfully!');
        location.reload();
    } else {
        alert('Error submitting blog.');
    }
}

function toggleBlogContent(blogId) {
    const contentDiv = document.getElementById(`blog-content-${blogId}`);
    contentDiv.classList.toggle('hidden');
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
        alert('Comment added successfully!');
        location.reload();
    } else {
        alert('Error adding comment.');
    }
}

async function fetchBlogs() {
    const response = await fetch('http://localhost:5500/get-blogs');
    if (response.ok) {
        
        const blogs = await response.json();
        console.log('Maybe Here');
        const blogList = document.getElementById('blog-list');
        blogList.innerHTML = '';

        blogs.forEach(blog => {
            const blogDiv = document.createElement('div');
            blogDiv.innerHTML = `
                <p class="blog-title" onclick="toggleBlogContent(${blog.id})">${blog.title}</p>
                <div id="blog-content-${blog.id}" class="hidden">
                    <p><strong>Author:</strong> ${blog.author}</p>
                    <p>${blog.content}</p>
                    <div>
                        <input id="comment-input-${blog.id}" placeholder="Add a comment">
                        <button onclick="addComment(${blog.id})">Submit Comment</button>
                    </div>
                </div>
            `;
            blogList.appendChild(blogDiv);
        });
    } else {
        alert('Error fetching blogs.');
    }
}

window.onload = function() {
    fetchBlogs();
};