import React from 'react';

class Login extends React.Component {

    componentDidMount() {
        this.props.auth.login();
    }

    render() {
        return (
            <div className="block-center mt-xl wd-xl">
            </div>
        );
    }
}

export default Login;
