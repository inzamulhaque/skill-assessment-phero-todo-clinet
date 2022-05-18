import React from 'react';
import { Button } from 'react-bootstrap';

const Task = ({ task, addCount, setAddCount }) => {

    const handleUpdate = (id) => {
        fetch(`https://todo-job-assessment-phero.herokuapp.com/task?id=${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => setAddCount(addCount + 1));
    }

    const handleDelete = (id) => {
        const confirm = window.confirm(`Are you sure? You want delete ${task?.name}`);

        if (confirm) {
            fetch(`https://todo-job-assessment-phero.herokuapp.com/task?id=${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                },
            })
                .then(res => res.json())
                .then(data => setAddCount(addCount + 1));
        }
    }
    return (
        <>
            <div className="border m-2 rounded">
                <h2 className={task.complete && "text-decoration-line-through"}>Task Name: {task?.name}</h2>
                <p className={task.complete && "text-decoration-line-through"}>Task Description: {task?.description}</p>

                <Button variant="primary" onClick={() => handleUpdate(task?._id)}>Complete</Button>
                <Button variant="danger" onClick={() => handleDelete(task?._id)}>Delete Task</Button>
            </div>
        </>
    );
};

export default Task;