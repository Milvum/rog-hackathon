import * as React from 'react';

type Props = IDispatchProps;

export type CheckboxItemDispatchProps = Props;

interface IDispatchProps {
    label: string;
    selected?: boolean;
    onClick?: () => void;
    type?: CheckboxType;
}

type CheckboxType = 'round' | 'square';

interface IState {
    selected: boolean;
}

export default class CheckboxItem extends React.PureComponent<Props, IState> {
    public constructor(props: Props) {
        super(props);
        this.state = { selected: !!this.props.selected };
    }

    private onClickEvent() {
        if (this.props && this.props.onClick) {
            this.props.onClick();
        }
        this.setState({ selected: !this.state.selected });
    }

    public render() {
        const mainClassName = this.props.type === 'round' ? 'checkbox-round' : 'checkbox-square';

        const classNames = `checkbox ${mainClassName} ${this.state.selected ? 'checked' : ''}`;
        return (
            <div className="checkbox-item-container" onClick={() => this.onClickEvent()}>
                <button className={classNames} />
                <p>{this.props.label}</p>
            </div>
        );
    }
}
