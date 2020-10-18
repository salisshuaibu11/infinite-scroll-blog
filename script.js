const postsContainer = document.getElementById('posts-container');
const loading = document.getElementById('loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Fetch posts from API
const getPosts = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
  const data = await res.json();

  return data;
}

// Show posts in DOM
const showPost = async () => {
  const posts = await getPosts();

  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;

    postsContainer.appendChild(postEl);
  });
}

// Show loader and fetch more posts
const showLoding = () => {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showPost();
    }, 300)
  }, 1000);
}

// Filter posts by input
const filterPosts = (e) => {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

// Show inital posts
showPost();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoding();
  }
});

filter.addEventListener('input', filterPosts);
