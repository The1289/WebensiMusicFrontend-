import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Snackbar,
    Slide,
    Card,
    CardContent,
    Zoom,
    IconButton,
    Paper
} from '@mui/material';
import { server } from '../server';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        message: '',
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${server}/contact/submit-inquiry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setOpenSnackbar(true);
                setFormData({
                    name: '',
                    email: '',
                    mobile: '',
                    message: '',
                });
            } else {
                console.error('Failed to submit inquiry');
            }
        } catch (error) {
            console.error('Error submitting inquiry:', error);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Container style={{ marginTop: "100px", position: "relative"}} className='contactUs'>
            <Slide direction="left" in={true} timeout={5000}>
                <Paper
                    elevation={3}
                    style={{
                        position: 'absolute',
                        top: '15%',
                        right: "-75px",
                        transform: 'translateY(-50%)',
                        padding: '10px',
                        borderRadius: '50%',
                        zIndex: 1000,
                        height: "450px",
                        width: "450px"

                    }}
                    className='ContactUsLogo'
                >

                    <Zoom in={true} timeout={5500}>
                        <img src="/images/mainlogo.png" alt="logo" />

                    </Zoom>
                </Paper>
            </Slide>


            <Slide direction="down" in={true} timeout={4000}>
                <Card elevation={3} sx={{ maxWidth: 1000, margin: 'auto', marginLeft: "-75px"}} className='contactUSFormQuery'>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Contact Us
                        </Typography>
                        <form style={{ marginBottom: "50px", marginRight:"140px"}}>
                            <TextField
                                label="Name"
                                variant="filled"
                                fullWidth
                                margin="normal"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                               
                            />
                            <TextField
                                label="Email"
                                variant="filled"
                                fullWidth
                                margin="normal"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Mobile"
                                variant="filled"
                                fullWidth
                                margin="normal"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Message"
                                variant="filled"
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                style={{scrollBehavior:"auto"}}
                                sx={{scrollBehavior: "auto"}}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Slide>
            <div style={{ marginTop: "-50px", display: "flex", justifyContent: "space-between" }} className='contactDetails'>
                {/* Call and Email Details Card */}
                <Zoom in={true} timeout={4000}>
                    <Card sx={{ width: '30%', marginLeft: 'auto', marginRight: 'auto' }} className='contactDetailsCard'>
                        <CardContent>
                            <div className="contact_ContactDetails">
                                <IconButton>
                                    <PhoneIcon />
                                </IconButton>
                                <Typography variant="h6" gutterBottom>
                                    Call and Email Details
                                </Typography>
                            </div>
                            <Typography variant="body2" color="text.secondary">
                                Call us at: 123-456-7890
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Email us at: info@example.com
                            </Typography>
                        </CardContent>
                    </Card>
                </Zoom>

                {/* Location Card */}
                <Zoom in={true} timeout={4500}>
                    <Card sx={{ width: '30%', marginLeft: 'auto', marginRight: 'auto' }} className='contactDetailsCard'>
                        <CardContent>
                            <div className="contact_ContactDetails">

                                <IconButton>
                                    <LocationOnIcon />
                                </IconButton>
                                <Typography variant="h6" gutterBottom>
                                    Location
                                </Typography>
                            </div>
                            <Typography variant="body2" color="text.secondary">
                                123 Main Street, Cityville
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Country, Zip Code
                            </Typography>
                        </CardContent>
                    </Card>
                </Zoom>

                {/* Working Hours Card */}
                <Zoom in={true} timeout={5000}>
                    <Card sx={{ width: '30%', marginLeft: 'auto', marginRight: 'auto' }} className='contactDetailsCard'>
                        <CardContent>
                            <div className="contact_ContactDetails">
                                <IconButton>
                                    <AccessTimeIcon />
                                </IconButton>
                                <Typography variant="h6" gutterBottom>
                                    Working Hours
                                </Typography>
                            </div>
                            <Typography variant="body2" color="text.secondary">
                                Monday-Friday: 9:00 AM - 5:00 PM
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Saturday-Sunday: Closed
                            </Typography>
                        </CardContent>
                    </Card>
                </Zoom>
            </div>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                TransitionComponent={Slide}
                message="Inquiry submitted successfully!"
                key={Slide.direction}
            />
        </Container>
    );
};

export default ContactUs;





