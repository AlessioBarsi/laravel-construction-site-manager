import { useState, useEffect } from "react";
import { userService } from "./api/users";
import { roleService } from "./api/roles";
import { useNavigate, Link } from 'react-router-dom';
import { Card, TextField, Button, CardContent, CardActions, CardHeader, FormControl, Typography, Autocomplete } from "@mui/material";
import toast from "react-hot-toast";

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

export default function Register() {
    const isLoggedIn = localStorage.getItem('token') ? true : false;
    const navigate = useNavigate();
    const [roleData, setRoleData] = useState(null);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home');
        }

        const fetchRoles = async () => {
            try {
                const roles = await roleService.getRoles();
                setRoleData(roles);
            } catch (err) {
                console.log(err)
                toast("An error occurred while fetching roles");
            }
        }
        fetchRoles();

    }, []);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        role: 1,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newUser = await userService.createUser(formData);
            toast.success(<div>Registration complete<br/>You will be redirected to the login page...</div>)
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            console.log("Caught Error:", error)
            Object.keys(error.errors).forEach((key) => {
                error.errors[key].forEach((err) => toast.error(<div><b>{key.charAt(0).toUpperCase() + key.slice(1)}</b><br/>{err}</div>));
            });
        }
    }

    const handleChange = (event) => {
        if (event.target.value) {
            setFormData((prevData) => ({ ...prevData, [event.target.id]: event.target.value, }));
        }
    }

    const handleChangeRole = (event, value) => {
        if (value) {
            setFormData((prevData) => ({ ...prevData, role: value.id }));
        }
    }

    return (
        <div>
            <Card sx={cardStyle}>
                <form onSubmit={handleSubmit}>
                    <CardHeader title="Sign up to Construction Site Manager"
                        titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}
                    />
                    <CardActions>
                        <Link to='/login'><Typography color="primary">Already have an Account? Sign In</Typography></Link>
                    </CardActions>
                    <CardContent>
                        <FormControl sx={{ gap: 2 }} required fullWidth>
                            <TextField required type='email' id='email' label='Email' onChange={handleChange} />
                            <TextField required type='password' id='password' label='Password' onChange={handleChange} />
                            <TextField required type='text' id='first_name' label='First Name' onChange={handleChange} />
                            <TextField required type='text' id='last_name' label='Last Name' onChange={handleChange} />
                            <Autocomplete
                                onChange={handleChangeRole}
                                disablePortal
                                options={roleData ? roleData.map((role) => ({ label: `${role.name}`, id: role.id })) : []}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} label="Role" />}
                            />
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" type="submit" color="primary">Sign Up</Button>
                    </CardActions>
                </form>
            </Card>
        </div>
    );
}
