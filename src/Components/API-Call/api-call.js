const url = "https://www.reddit.com/r/";

export default async function getAll () {
    const response = await  fetch('https://www.reddit.com/r/all/.json');
    const data = await response.json();
    return data.data.children;
}

export async function getSubReddit (subreddit) {
    const response = await fetch (`${url}${subreddit}/.json`);
    const data = await response.json();
    return data.data.children;
}