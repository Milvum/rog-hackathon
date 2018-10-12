import * as React from 'react';

type Props = IDispatchProps;

export type SideBarItemDispatchProps = Props;

interface IDispatchProps {
    label: string;
    selected?: boolean;
    iconName?: string;
    onClick?: () => void;
}

interface IState {
}

export default class SideBarItem extends React.PureComponent<Props, IState> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        const imageSource = this.props.iconName ? `/assets/${this.props.iconName}` : '';
        const classNames = `sidebar-item ${this.props.selected ? 'selected' : ''}`;
        return (
            <div className={classNames} onClick={this.props.onClick}>
                <img height="20" width="20" src={imageSource} />
                <p>{this.props.label}</p>
            </div>
        );
    }
}
