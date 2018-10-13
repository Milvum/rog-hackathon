import * as React from 'react';

type Props = IDispatchProps;

export type CheckboxItemDispatchProps = Props;

interface IDispatchProps {
    name: string;
}

interface IState {
    selected: boolean;
}

export default class Header extends React.PureComponent<Props, IState> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <div className="header-container" >
                <div className="header-content">
                    <div className="header-logo">
                        <img width="30" height="30" src="/assets/logo.svg" />
                        < p>BRG2</p>
                    </div>
                    <div className="header-profile">
                        < p>{this.props.name}</p>
                        <img width="40" height="40" src="/assets/profile-photo.png" />
                    </div>
                </div>
                <div className="line small" />
            </div>
        );
    }
}
