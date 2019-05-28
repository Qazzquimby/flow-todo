import React from 'react';
import './App.css';
import Chart from "./Chart";
import {example_task, formatGraph, Task} from "./formatGraph";


type AppProps = {};
type AppState = { width: number, height: number };

export class App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
        console.log("constructor");
        this.state = {width: 0, height: 0};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    render() {
        return (
            <div className="Chart">
                <Chart chart={formatGraph(example_task,
                    this.state.width, this.state.height)}/>
            </div>
        );


    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        this.forceUpdate();
    };
}

export default App;
