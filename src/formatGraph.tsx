import {IChart, INode} from "@mrblenny/react-flow-chart/src";

const START_X = 20;
const NODE_WIDTH = 200;
const NODE_HEIGHT = 100;

export class Task {
    name: string;
    children: Task[];

    constructor(name: string, children: Task[] = []) {
        this.name = name;
        this.children = children;
    }

    getHeight(): number {
        const childHeights = this.children.map(child => child.getHeight());
        const maximumChildHeight = Math.max(0, ...childHeights);
        return maximumChildHeight + 1;
    }

}

export const example_task: Task = new Task("Get Things",
    [
        new Task("Handle thing 1"),
        new Task("Handle thing 2", [new Task("Finalize thing 2")
            ]
        )]);

export const chartSimple: IChart = {
    offset: {
        x: 0,
        y: 0,
    },
    nodes: {
        node1: {
            id: 'node1',
            type: 'output-only',
            position: {
                x: 300,
                y: 100,
            },
            ports: {
                port1: {
                    id: 'port1',
                    type: 'output',
                    properties: {
                        value: 'yes',
                    },
                },
                port2: {
                    id: 'port2',
                    type: 'output',
                    properties: {
                        value: 'no',
                    },
                },
            },
        },
        node2: {
            id: 'node2',
            type: 'input-output',
            position: {
                x: 300,
                y: 300,
            },
            ports: {
                port1: {
                    id: 'port1',
                    type: 'input',
                },
                port2: {
                    id: 'port2',
                    type: 'output',
                },
            },
        },
        node3: {
            id: 'node3',
            type: 'input-output',
            position: {
                x: 100,
                y: 600,
            },
            ports: {
                port1: {
                    id: 'port1',
                    type: 'input',
                },
                port2: {
                    id: 'port2',
                    type: 'output',
                },
            },
        },
        node4: {
            id: 'node4',
            type: 'input-output',
            position: {
                x: 500,
                y: 600,
            },
            ports: {
                port1: {
                    id: 'port1',
                    type: 'input',
                },
                port2: {
                    id: 'port2',
                    type: 'output',
                },
            },
        },
    },
    links: {
        link1: {
            id: 'link1',
            from: {
                nodeId: 'node1',
                portId: 'port2',
            },
            to: {
                nodeId: 'node2',
                portId: 'port1',
            },
            properties: {
                label: 'example_task link label',
            },
        },
        link2: {
            id: 'link2',
            from: {
                nodeId: 'node2',
                portId: 'port2',
            },
            to: {
                nodeId: 'node3',
                portId: 'port1',
            },
            properties: {
                label: 'another example_task link label',
            },
        },
        link3: {
            id: 'link3',
            from: {
                nodeId: 'node2',
                portId: 'port2',
            },
            to: {
                nodeId: 'node4',
                portId: 'port1',
            },
        },
    },
    selected: {},
    hovered: {},
};

export function formatGraph(task: Task, width: number, height: number): IChart {
    // console.log("formatted" + width);
    const graphTask: INode = {
        id: 'node0',
        type: 'input-output',
        position: {
            x: START_X,
            y: (height - NODE_HEIGHT) / 2,
        },
        ports: {},
        properties: {
            name: task.name
        }
    };

    const graph: IChart = {
        offset: {
            x: 0,
            y: 0,
        },
        nodes: {node1: graphTask},
        links: {},
        selected: {},
        hovered: {},
    };

    return graph;
}