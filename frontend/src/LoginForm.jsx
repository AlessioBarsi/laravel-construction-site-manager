import React from "react";

const LoginForm = (props) => {
    return (
        <div>
            <form>
                <label>Email </label>
                <input type="email" name="email"></input>   
                <br></br>
                <label>Password </label> 
                <input type="password" name="password"></input>
                <br></br>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;