import React from 'react';
import './App.css';
import mapValues from "@mrblenny/react-flow-chart/src/container/utils/mapValues";
import * as actions from "@mrblenny/react-flow-chart/src/container/actions";
import {cloneDeep} from "lodash";
import {FlowChart, IChart, INodeInnerDefaultProps} from "@mrblenny/react-flow-chart/src";


type ChartProps = { chart: IChart };
type ChartState = IChart;


const NodeInnerCustom = ({node}: INodeInnerDefaultProps) => {
    return (
        <p>{node.properties.name}</p>
    );

};

class Chart extends React.Component<ChartProps, ChartState> {

    constructor(props: ChartProps) {
        super(props);
        console.log("constructor");
        this.state = cloneDeep(this.props.chart);
    }


    public render() {
        const stateActions = mapValues(actions, (func: any) => //Move out of render
            (...args: any) => this.setState(func(...args))) as typeof actions;
        try {
            return (
                <FlowChart
                    chart={this.props.chart}
                    callbacks={stateActions}
                    Components={{
                        NodeInner: NodeInnerCustom
                    }}
                />)
        } catch (e) {
            return (null);
        }

    }


}

export default Chart;
