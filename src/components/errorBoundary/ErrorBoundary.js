import { Component } from "react";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, info) {
        console.log(error, info);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return 'problem'
        }

        return this.props.children;
    }
}

export default ErrorBoundary;