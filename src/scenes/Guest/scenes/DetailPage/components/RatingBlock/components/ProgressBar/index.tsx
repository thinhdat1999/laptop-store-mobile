import React from 'react';
import { SC } from './styles';


const ProgressBar = (props: any) => {
    return(
        <SC.Container>
            <SC.ProgressBar percent = {props.percent} color="#ddd" />
        </SC.Container>
    );
}

export default ProgressBar;