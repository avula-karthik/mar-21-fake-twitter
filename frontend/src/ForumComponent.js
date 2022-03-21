import { useFormik } from 'formik';
import axios from 'axios';
import { useEffect, useState } from 'react';
const ForumComponent = () => {
    let [totalCount, setTotalCount] = useState();
    let [forums, setForums] = useState([]);
    useEffect(() => {
        getForums();
    }, []);
    const getForums = () => {
        axios
            .get('/forum')
            .then((res) => {
                setTotalCount(res.data.length + 1);
                setForums(res.data);
            })
            .catch((error) => console.log(error));
    };
    const deleteForum = (indexToDel) => {
        axios
            .delete('/forum/' + indexToDel)
            .then((res) => console.log(res.data))
            .catch((error) => console.log(error));
        getForums();
    };
    const deleteAll = () => {
        axios.put('/forum/clearall').then(getForums());
    };
    const formik = useFormik({
        initialValues: {
            title: '',
            doc: '',
            body: '',
            author: '',
        },
        onSubmit(values) {
            let forumObj = {
                title: values.title,
                doc: values.doc,
                body: values.body,
                author: values.author,
            };
            axios.post('/forum', forumObj).then((res) => {
                console.log(res.data);
                getForums();
            });
            axios.get('/forum').then((res) => console.log(res));
        },
        validate() {
            const errors = {};
            if (
                formik.values.title.length < 10 ||
                formik.values.title.length > 100
            ) {
                errors.title = 'Title should be 10-100 chars';
            }
            if (
                formik.values.body.length < 50 ||
                formik.values.body.length > 500
            ) {
                errors.body = 'Body should be 50-500 chars';
            }
            if (
                formik.values.author.length < 5 ||
                formik.values.author.length > 50
            ) {
                errors.author = 'Author name should be 5-50 chars';
            }
            if (!formik.values.author.match(/^[0-9a-zA-Z]+$/)) {
                errors.author = 'Author should not have special characters';
            }
            return errors;
        },
    });
    return (
        <div>
            <form
                onSubmit={formik.handleSubmit}
                noValidate
                className='myproductForm'
            >
                <h1>Forum Component</h1>
                <label>Title</label>
                <input
                    required
                    className='form-control'
                    type='text'
                    name='title'
                    placeholder='title..'
                    onChange={formik.handleChange}
                />
                <div className='text-danger'>
                    {formik.errors.title ? formik.errors.title : null}
                </div>
                <label>Date of Creation</label>
                <input
                    type='date'
                    name='doc'
                    className='form-control'
                    onChange={formik.handleChange}
                />
                <label>Body</label>
                <textarea
                    type='text'
                    name='body'
                    className='form-control'
                    placeholder='body..'
                    onChange={formik.handleChange}
                ></textarea>
                <div className='text-danger'>
                    {formik.errors.body ? formik.errors.body : null}
                </div>
                <label>Author</label>
                <input
                    type='text'
                    placeholder='author..'
                    name='author'
                    className='form-control'
                    onChange={formik.handleChange}
                />
                <div className='text-danger'>
                    {formik.errors.author ? formik.errors.author : null}
                </div>
                <div className='text-center mt-3'>
                    <button className='btn btn-primary' type='submit'>
                        Submit
                    </button>
                </div>
            </form>
            <div>
                <button onClick={deleteAll} className='btn btn-danger'>
                    Delete All
                </button>
            </div>
            {forums.map((val, index) => {
                return (
                    <div className='card-body-eachForum'>
                        <h4 className='forumTitle'>{val.title}</h4>
                        <p>{val.body}</p>
                        <p>
                            by{' '}
                            <b>
                                <u>{val.author}</u>
                            </b>{' '}
                            on <b>{val.doc}</b>
                        </p>
                        <div>
                            <button
                                className='btn btn-danger '
                                onClick={() => deleteForum(index)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default ForumComponent;
