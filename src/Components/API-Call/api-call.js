const url = "https://www.reddit.com";

//API call for most recent posts on Reddit. 
export default async function getAll () {
    const response = await  fetch("https://www.reddit.com/r/all/.json");
    const data = await response.json();
    return data.data.children;
}

//API call for posts of a specific subreddit
export async function getSubreddit (subreddit) {
    const response = await fetch (`${url}${subreddit}.json`);
    const data = await response.json();
    return data.data.children;
}

//API call for popular subreddits listed out in sidebar
export async function getPopular () {
    const response = await  fetch("https://www.reddit.com/subreddits/.json");
    const data = await response.json();
    return data.data.children;
}

//API call for search results
export async function searchReddit(text) {
    const response = await fetch (`${url}/search/.json?q=${text}`);
    const data = await response.json();
    return data.data.children;
}

//API call for comments on posts
export async function getComments(subreddit, post_id) {
    const response = await fetch(`${url}/${subreddit}/comments/${post_id}/.json`);
    const data = await response.json();
    const commentsData = data[1].data.children;
    return {post_id, commentsData};
}