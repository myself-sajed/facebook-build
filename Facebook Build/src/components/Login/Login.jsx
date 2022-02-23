import { Button, Card, CardActions, CardContent, Divider, TextField, } from '@mui/material';

import './Login.css';
const Login = ({ setPassword, setUsername, password, username, logIn, error }) => {
    return <>

        <div className="login">
            <div className="login__container">

                <div className="login__logo">
                    <img src={'/assets/facebook_login.svg'} alt="" />
                    <p>Facebook helps you connect and share with the people in your life.</p>
                </div>

                <div className="login__form">

                    <Card sx={{ minWidth: 300, padding: '4px', borderRadius: '9px' }}>

                        {/* This shows errors */}

                        <p style={{ margin: '10px 5px 0 5px', padding: '0px', textAlign: 'center', color: 'red' }} >{error}</p>



                        <CardContent className="login__card__content">
                            <TextField fullWidth margin='dense' value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder='Username or phone number' />
                            <TextField type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} fullWidth margin='dense' placeholder='Password' />
                        </CardContent>
                        <CardActions className="login__card__action">
                            <Button variant="contained" fullWidth size="medium" onClick={logIn}>
                                <b>Log In</b>
                            </Button>
                            <a href="#" sx={{ mx: "auto" }}>Forgotten Password?</a>
                            <Divider style={{ width: '100%', }} />
                            <Button color='success' variant="contained" style={{ textTransform: 'capitalize', padding: '12px 16px', fontSize: '16px' }} size="medium">
                                <b>Create new account</b>
                            </Button>
                        </CardActions>

                    </Card>


                </div>




            </div>
        </div>

    </>;
};

export default Login;
