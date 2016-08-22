import React from 'react';
import { auth0Widget } from './../services';


class Login extends React.Component {

    componentDidMount() {
        auth0Widget.showLoginWidget();
    }

    render() {
        return (
            <div className="block-center mt-xl wd-xl">
            </div>
        );
    }
}

export default Login;
