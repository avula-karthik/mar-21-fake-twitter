import axios from 'axios';
import { useState, useEffect } from 'react';

const Twitter = () => {
    let [tweet, setTweet] = useState([]);
    useEffect(() => {
        getTweets();
    }, []);
    const getTweets = () => {
        axios
            .get('/twitter')
            .then((res) => setTweet(res.data))
            .catch((e) => console.log(e));
    };
    const deleteAll = () => {
        axios.put('/twitter/clearall').then(getTweets());
    };
    const addTweet = (event) => {
        event.preventDefault();
        let tweetOb = {
            title: event.target.title.value,
            body: event.target.body.value,
            date_of_creation: event.target.date_of_creation.value,
            author: event.target.author.value,
            category: event.target.category.value,
        };
        axios
            .post('/twitter', tweetOb)
            .then(getTweets())
            .catch((e) => console.log(e));
        getTweets();
    };
    const deleteTweet = (indexToDel) => {
        axios
            .delete('/twitter/' + indexToDel)
            .then((res) => console.log(res.data))
            .catch((e) => console.log(e));
        getTweets();
    };
    return (
        <div>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                fill='currentColor'
                class='bi bi-twitter'
                viewBox='0 0 16 16'
            >
                <path d='M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z' />
            </svg>{' '}
            <h1 className='authorSameLine'>Welcome to Fake Twitter</h1>
            <form onSubmit={addTweet} className='twitterForm'>
                <label>Title</label>
                <input
                    type='text'
                    name='title'
                    placeholder='title..'
                    className='form-control'
                    required
                />
                <label>Tweet Body</label>
                <textarea
                    required
                    name='body'
                    placeholder='tweet here..'
                    className='form-control'
                ></textarea>
                <label>Date of Creation</label>
                <input
                    type='date'
                    name='date_of_creation'
                    required
                    className='form-control'
                />
                <label>Author</label>
                <input
                    type='text'
                    name='author'
                    className='form-control'
                    required
                    placeholder='name..'
                />
                <div>
                    <label>Category</label>
                    <span> </span>
                    <select name='category' className='form-select myselectBox'>
                        <option value='entertainment'>entertainment</option>
                        <option value='study'>study</option>
                        <option value='politics'>politics</option>
                        <option value='sports'>sports</option>
                    </select>
                </div>
                <br />
                <div className='text-center mb-2'>
                    <button className='btn btn-success'>Add Tweet</button>
                </div>
            </form>
            <button
                onClick={deleteAll}
                className='btn btn-danger deleteallTwitterbtn'
            >
                Delete all tweets
            </button>
            {tweet.map((val, index) => {
                return (
                    <div className='eachTweet'>
                        <h1>{val.title}</h1>
                        <h5>{val.body}</h5>
                        <p>category : {val.category}</p>
                        by<span> </span>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            class='bi bi-pen-fill'
                            viewBox='0 0 16 16'
                        >
                            <path d='m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z' />
                        </svg>
                        <span> </span>
                        <h5 className='authorSameLine'>
                            <u>{val.author}</u> on{' '}
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                class='bi bi-calendar2-event-fill'
                                viewBox='0 0 16 16'
                            >
                                <path d='M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zM11.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z' />
                            </svg>{' '}
                            {val.date_of_creation}
                        </h5>{' '}
                        <button
                            className='btn btn-danger ml-2'
                            onClick={() => deleteTweet(index)}
                        >
                            Delete
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
export default Twitter;
