import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import { Card, TextField, Button, CardContent, CardActions, CardHeader, FormControl, Typography, Paper } from "@mui/material";
import axios from "axios";
import toast from 'react-hot-toast';

const cardStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('/login', { email, password })
            .then(response => {
                login(response.data.token, response.data.userId);
                navigate('/home');
            })
            .catch(error => {
                console.log('Caught Error:',error);
                if (error.response && error.response.status === 422) {
                    toast.error(error.response.data.message);
                }
                setPassword('');
            });
    }

    return (
        <div>

            <Card sx={cardStyle}>
                <form onSubmit={handleSubmit}>
                    <CardHeader title="Login to Construction Site Manager"
                        titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}
                    />
                    <CardActions>
                        <Link to='/register'><Typography color="primary">Don't have an Account? Sign Up</Typography></Link>
                    </CardActions>
                    <CardContent>
                        <FormControl sx={{ gap: 2 }} required fullWidth>
                            <TextField required type='email' id='email' label='Email' onChange={(event) => setEmail(event.target.value)} />
                            <TextField required type='password' id='password' label='Password' onChange={(event) => setPassword(event.target.value)} />
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" type="submit" color="primary">Login</Button>
                    </CardActions>

                </form>
            </Card>

        </div>
    );
}
