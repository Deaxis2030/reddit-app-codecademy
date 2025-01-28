const url = "https://www.reddit.com/r/";

export default async function getAll () {
    const response = await  fetch('https://www.reddit.com/r/all/.json');
    const data = await response.json();
    return data.data.children;
}

export async function getSubreddit (subreddit) {
    const response = await fetch (`${url}${subreddit}/.json`);
    const data = await response.json();
    return data.data.children;
}

export async function getPopular () {
    const response = await  fetch('https://www.reddit.com/r/popular/.json');
    const data = await response.json();
    return data.data.children;
}