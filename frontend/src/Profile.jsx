import { useState} from "react";

export default function Profile(){

    function handleForm (formData) {
        console.log(formData);
    }
    return (
        <form action={handleForm}>
            <label>Data:</label>
            <input name='data' id='data'></input>
        </form>
    );
}
