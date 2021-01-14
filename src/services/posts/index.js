import postData from '../../data/posts/data.json'
const simulatedResponseTime = 400;

const getPosts = () =>
	new Promise((resolve) =>
		setTimeout(() => resolve(postData), simulatedResponseTime)
	);


export default getPosts;