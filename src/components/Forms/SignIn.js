import React, { useEffect } from 'react';
import auth from '../../firebase.init';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';

const SignIn = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (user || googleUser) {
            navigate(from, { replace: true });
        }
    }, [user, googleUser, from]);

    const handleSignIn = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(email, password);
    }
    return (
        <>
            <Container>
                <Row>
                    <Col xs={10} md={8} lg={6} className="mx-auto mt-3">
                        <h3 className="text-primary text-center">Sign In</h3>

                        <Form onSubmit={handleSignIn}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control type="email" placeholder="name@example.com" name="email" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" placeholder="Password" name="password" />
                            </FloatingLabel>

                            <Button variant='primary' type="submit" className="w-100 mt-2">Sign In</Button>


                            {googleError && <p className='text-danger'>{googleError?.code}</p>}
                        </Form>

                        <Button variant='link' className="mt-2" onClick={() => navigate("/signup")}>Sign Up</Button>

                        <Button onClick={() => signInWithGoogle()} variant='warning' type="submit" className="w-100 mt-2">Sign In With Google</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SignIn;