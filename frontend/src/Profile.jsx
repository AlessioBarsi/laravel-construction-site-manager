import { useState, useEffect } from "react";
import { useAuth } from './AuthContext.jsx';
import { userService } from "./api/users.jsx";

import TextField from '@mui/material/TextField';
import { Button, Stack, Card, CardContent, CardHeader, CardActions } from "@mui/material";
import PasswordModal from "./Modals/PasswordModal.jsx";
import toast from "react-hot-toast";

export default function Profile() {

    const { userId } = useAuth();
    //Modal states
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //User data fetch
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                try {
                    const user = await userService.getUser(userId);
                    setUserData({
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'email': user.email,
                    });
                } catch (error) {
                    console.log(error)
                };
            }
            fetchUser();
        }
    }, [userId]);

    const handleChange = (event) => {
        if (event.target.value != '') {
            setUserData((prevData) => ({ ...prevData, [event.target.id]: event.target.value, }));

        }
    }

    const updateUserData = async () => {
        try {
            const updatedUser = await userService.updateUser(userId, userData);
            console.log(JSON.stringify(updatedUser, null, 2));
            toast.success('Profile credentials have been updated')
        } catch (error) {
            console.log(error);
            Object.keys(error.errors).forEach((key) => {
                error.errors[key].forEach((err) => toast.error(<div><b>{key.charAt(0).toUpperCase() + key.slice(1)}</b><br/>{err}</div>));
            });
        }
        console.log(userData);
    }

    return (
        <div className="mx-2 my-3">
            <Card variant="outlined" >
                <CardHeader
                    title="User Profile"
                    subheader="Edit your profile"
                    titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                />
                <CardActions>
                </CardActions>
                <CardContent>
                    <Stack direction='row' sx={{ padding: 2, gap: 2 }}>
                        <TextField variant="outlined" label='First Name'
                            id='first_name' onChange={handleChange} value={userData && userData.first_name ? userData.first_name : ''}
                        />
                        <TextField variant="outlined" label='Last Name'
                            id='last_name' onChange={handleChange} value={userData && userData.last_name ? userData.last_name : ''}
                        />
                        <TextField variant="outlined" label='Email'
                            id='email' onChange={handleChange} value={userData && userData.email ? userData.email : ''}
                        />
                    </Stack>
                    <PasswordModal open={open} userId={userId} handleClose={handleClose} />
                </CardContent>
                <CardActions>
                    <Button onClick={updateUserData} sx={{ backgroundColor: 'green' }} variant="contained">Update Profile</Button>
                    <Button onClick={handleOpen} color='primary' variant="contained">Change Password</Button>
                    <Button sx={{ backgroundColor: 'red' }} variant="contained">Delete Profile</Button>
                </CardActions>
            </Card>
        </div>
    );
}
