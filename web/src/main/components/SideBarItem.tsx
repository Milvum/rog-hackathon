import * as React from 'react';

type Props = IDispatchProps;

export type SideBarItemDispatchProps = Props;

interface IDispatchProps {
    label: string;
    selected?: boolean;
    onClick?: () => void;
}

interface IState {
}

export default class SideBarItem extends React.PureComponent<Props, IState> {
    public constructor(props: Props) {
        super(props);

    }



    public render() {
        const classNames = `sidebar-item ${this.props.selected ? 'selected' : ''}`;
        return (
            <div className={classNames} onClick={this.props.onClick}>
                {/* <img height="50" width="50" /> */}
                <p>{this.props.label}</p>
            </div>
        );
    }
}
