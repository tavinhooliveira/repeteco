/**
*
* ContainerCss
*
*/
import { css } from 'styled-components';

const ContainerCss = css`
    padding-top: 10vh;

    & .ant-row-flex {
        padding-top: 25px;
    }
`;

const PanelCss = css`
    min-height: 20px;
    padding: 20px;  
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export {
    ContainerCss,
    PanelCss,
};
