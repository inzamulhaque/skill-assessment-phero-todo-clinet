import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import AddTask from './AddTask';
import Task from './Task';

const Home = () => {
    const [addCount, setAddCount] = useState(0);
    const [tasks, setTasks] = useState([]);

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        fetch(`https://todo-job-assessment-phero.herokuapp.com/task/${user?.email}`)
            .then(res => res.json())
            .then(data => setTasks(data));
    }, [addCount]);

    if (loading) {
        return "Loading...";
    }

    return (
        <>
            <Container>
                {user && <Button variant='danger' onClick={() => signOut(auth)}>SignOut</Button>}
                <AddTask addCount={addCount} setAddCount={setAddCount} email={user.email} />
                {
                    tasks.map(task => <Task key={task._id} task={task} addCount={addCount} setAddCount={setAddCount} />)
                }
            </Container>
        </>
    );
};

export default Home;