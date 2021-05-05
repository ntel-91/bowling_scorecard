import React from 'react';

const Scoresheet = (props) => {

    return (
        <div id='scoresheet'>
                    <table id='scoresheetTable' className='scoresheet' cellPadding='1' cellSpacing='0'>
                        <tbody>
                            <tr>
                                <th colSpan='6'>Frame 1</th>
                                <th colSpan='6'>Frame 2</th>
                                <th colSpan='6'>Frame 3</th>
                                <th colSpan='6'>Frame 4</th>
                                <th colSpan='6'>Frame 5</th>
                                <th colSpan='6'>Frame 6</th>
                                <th colSpan='6'>Frame 7</th>
                                <th colSpan='6'>Frame 8</th>
                                <th colSpan='6'>Frame 9</th>
                                <th colSpan='6'>Frame 10</th>
                            </tr>
                            <tr>
                                <td colSpan='3'>{props.renderShot(0, true)}</td><td colSpan='3'>{props.renderShot(0, false)}</td>
                                <td colSpan='3'>{props.renderShot(1, true)}</td><td colSpan='3'>{props.renderShot(1, false)}</td>
                                <td colSpan='3'>{props.renderShot(2, true)}</td><td colSpan='3'>{props.renderShot(2, false)}</td>
                                <td colSpan='3'>{props.renderShot(3, true)}</td><td colSpan='3'>{props.renderShot(3, false)}</td>
                                <td colSpan='3'>{props.renderShot(4, true)}</td><td colSpan='3'>{props.renderShot(4, false)}</td>
                                <td colSpan='3'>{props.renderShot(5, true)}</td><td colSpan='3'>{props.renderShot(5, false)}</td>
                                <td colSpan='3'>{props.renderShot(6, true)}</td><td colSpan='3'>{props.renderShot(6, false)}</td>
                                <td colSpan='3'>{props.renderShot(7, true)}</td><td colSpan='3'>{props.renderShot(7, false)}</td>
                                <td colSpan='3'>{props.renderShot(8, true)}</td><td colSpan='3'>{props.renderShot(8, false)}</td>
                                <td colSpan='2'>{props.renderFinalShot(9, 1)}</td><td colSpan='2'>{props.renderFinalShot(9, 2)}</td><td colSpan='2'>{props.renderFinalShot(9, 3)}</td>
                            </tr>
                            <tr>
                                <td colSpan='6'>{props.renderScore(0)}</td>
                                <td colSpan='6'>{props.renderScore(1)}</td>
                                <td colSpan='6'>{props.renderScore(2)}</td>
                                <td colSpan='6'>{props.renderScore(3)}</td>
                                <td colSpan='6'>{props.renderScore(4)}</td>
                                <td colSpan='6'>{props.renderScore(5)}</td>
                                <td colSpan='6'>{props.renderScore(6)}</td>
                                <td colSpan='6'>{props.renderScore(7)}</td>
                                <td colSpan='6'>{props.renderScore(8)}</td>
                                <td colSpan='6'>{props.renderFinalScore(9)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        )
}

export default Scoresheet;