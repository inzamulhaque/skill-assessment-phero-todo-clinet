import React from 'react';
import { Button, Form } from 'react-bootstrap';

const AddTask = ({ addCount, setAddCount, email }) => {

    const handleSubmit = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const description = event.target.description.value;
        fetch("https://todo-job-assessment-phero.herokuapp.com/task", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email, name, description, complete: false })
        })
            .then(res => res.json())
            .then(data => {
                setAddCount(addCount + 1);
            });
        event.target.reset();
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Task Name</Form.Label>
                    <Form.Control type="text" placeholder="Task Name" name="name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" />
                </Form.Group>
                <Button type="submit" variant="primary" className="d-block mx-auto">Adding Task</Button>
            </Form>
        </>
    );
};

export default AddTask;