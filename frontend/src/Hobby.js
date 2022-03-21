import axios from 'axios';
import { useState, useEffect } from 'react';
const Hobby = () => {
    let [hobby, setHobby] = useState([]);
    useEffect(() => {
        getHobbies();
    }, []);
    const getHobbies = () => {
        axios
            .get('/hobbies')
            .then((res) => {
                console.log('Full Data : ');
                console.log(res.data);
                setHobby(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteAll = () => {
        axios.put('/hobbies/clearAll').then(getHobbies());
    };
    const addHobby = (event) => {
        event.preventDefault();
        let HobbyObj = {
            name: event.target.name.value,
            description: event.target.description.value,
            date_of_creation: event.target.date.value,
        };
        axios
            .post('/hobbies', HobbyObj)
            .then((res) => {
                getHobbies();
            })
            .catch((error) => {
                console.log(error);
            });
        getHobbies();
    };
    let deleteHobby = (indexToDel) => {
        axios
            .delete('/hobbies/' + indexToDel)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => console.log(error));
        getHobbies();
    };
    return (
        <div>
            <form onSubmit={addHobby} className='myHobbyForm'>
                <label>Hobby Name</label>
                <input
                    required
                    type='text'
                    name='name'
                    placeholder='hobby name..'
                    className='form-control'
                />
                <label>Description</label>
                <textarea
                    required
                    name='description'
                    placeholder='hobby description...'
                    className='form-control'
                ></textarea>
                <label>Date of Creation :</label>
                <input type='date' name='date' className='form-control' />
                <br />
                <div className='text-center'>
                    <button className='btn btn-primary'>Add Hobby</button>
                </div>
            </form>
            <div>
                <button className='btn btn-danger' onClick={() => deleteAll()}>
                    Delete all Hobbies
                </button>
            </div>
            {hobby.map((val, index) => {
                return (
                    <div className='card'>
                        <div className='card-body'>
                            <h3>Name : {val.name}</h3>
                            <h4>Description : {val.description}</h4>
                            <p>
                                created on <b>{val.date_of_creation} </b>
                            </p>
                            <button
                                className='btn btn-danger'
                                onClick={() => deleteHobby(index)}
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
export default Hobby;
