/* window.addEventListener("DOMContentLoaded", function() {
    let p = fetch('http://localhost:5500/fetchblogs');

    p.then((value) => {
        return value.json();
    }).then(data => {
        if(data.length===0){
            console.log('No Blogs');
            return false;
        }
        else{
            for(let i=0;i<data.length;i++){
                showBlog(data[i]);
            }
        }
    }).catch(err => console.log(err));
})

function showBlog(obj) {
    const mainDisplay = document.getElementById('blogDisplay');

    const newdiv = document.createElement('div');
    newdiv.setAttribute("id",obj.id);
    const heading = document.createElement('h4');
    heading.innerHTML=`${obj.title}`;

    newdiv.appendChild(heading);

    mainDisplay.appendChild(newdiv);
} */

function sendData(event) {
    const title=document.getElementById('title');
    const author = document.getElementById('author');
    const blog = document.getElementById('blog');
    const data = {
        title:title,
        author:author,
        blog:blog
    };
    const options={
        method:'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:5500/post-blog', options);
    
}


