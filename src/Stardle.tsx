import React from 'react';
import './Stardle.css';

class Stardle extends React.Component <any, any> {
    private readonly wordLength: number = 5;
    private rows: Array<number> = [];
    private rowInputs: Array<Array<String>> = [];
    private lastInputPosition: [number, number] = [0, 0];
    constructor(props: any) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        const range: Array<number> = Array.from(Array(this.wordLength).keys()).map(x => x + 1);
        const reversedRange: Array<number> = range.slice().reverse();
        this.rows = reversedRange.concat(range.slice(1));
        this.rows.forEach((row: number) => {
            this.rowInputs.push(Array.from(Array(row).keys()).map(_x => ''));
        });

        this.state = {
            rowInputs: this.rowInputs
        };
    }

    createRow(rowLength: number, rowN: number) {
        const range: Array<number> = Array.from(Array(rowLength).keys()).map(x => x + 1);
        return (
            <div className='row' key={rowN}>
                {
                    range.map((_row: number, index: number) => 
                                                <div className='square' key={index}>
                                                    <p>{this.state.rowInputs[rowN][index]}</p>
                                                </div>)
                }
            </div>
        );
    }

    createBoard() {
        return (
            <div className='board'>
                { this.rows.map((n: number, index: number) => this.createRow(n, index)) }
            </div>
        )
    }

    handleKeyPress(e: any) {
        console.log('key press detected')
        const lastX: number = this.lastInputPosition[0];
        const lastY: number = this.lastInputPosition[1];
        // Not a letter
        if (!e.key.match(/[a-z]/i)) {
            return;
        }
        const key: String = e.key.toUpperCase();
        this.rowInputs[lastX][lastY] = key;
        this.lastInputPosition = [lastX, lastY + 1];
        this.setState({ rowInputs: this.rowInputs });
    }

    handleKeyDown(e: any) {
        const lastX: number = this.lastInputPosition[0];
        const lastY: number = this.lastInputPosition[1];
        // delete
        if (e.keyCode === 8) {
            const deleteLastY: number = lastY === 0 ? 0 : lastY - 1;
            this.rowInputs[lastX][deleteLastY] = '';
            this.lastInputPosition = [lastX, deleteLastY];
            this.setState({ rowInputs: this.rowInputs });
        }
    }

    componentDidMount() {
        document!.getElementById('stardle')!.focus();
    }

    render() {
        return (
            <div className='stardle' 
                 id='stardle' 
                 onKeyPress={this.handleKeyPress} 
                 onKeyDown={this.handleKeyDown} 
                 tabIndex={0}>
                { this.createBoard() }
            </div>
        );
    }
}

export default Stardle;

