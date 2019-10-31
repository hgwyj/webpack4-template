import React from "react";
import ReactDOM from "react-dom";
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Text: null
        };
    }
    loadComponent = () => {
        import('./text.js').then((Text) => {
            this.setState({
                Text: Text.default
            });
        }).catch(e => {
            console.log(e);
        });
    };
    render() {
        const { Text } = this.state;
        return (
            <>
                <h1>this is my search app1</h1>
                {Text ? <Text /> : null}
                <button onClick={this.loadComponent}>click me</button>
            </>
        );
    }
};

ReactDOM.render(<Search />,
    document.getElementById("root"));