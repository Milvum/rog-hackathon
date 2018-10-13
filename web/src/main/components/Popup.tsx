import * as React from 'react';

type Props = IDispatchProps;

export type CheckboxItemDispatchProps = Props;

interface IDispatchProps {
    title?: string;
    message?: string;
    type?: PopupType;
    service?: string;
    onClose?: () => void;
}

type PopupType = 'delete';

interface IState {

}

export default class Popup extends React.PureComponent<Props, IState> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        const title = this.props.type === 'delete' ?
            `Verzoek tot verwijdering van account en data` :
            this.props.title;

        const message = this.props.type === 'delete' ?
            `Uw verzoek is verstuurd. U krijgt bericht nadat ${this.props.service} het verwerkt heeft.` :
            this.props.message;

        return (
            <div className="popup-overlay">
                <div className="videoland-popup popup-container" >
                    <div className="popup-header-content">
                        <img width="16" height="16" src="/assets/logo.svg" />
                        <p>{title}</p>
                    </div>
                    <div className="line small" />

                    <div className="popup-content">
                        <p className="popup-message">
                            {message}
                        </p>

                    </div>
                    <div className="buttons-container">
                        <button
                            className="confirm-button btn"
                            onClick={this.props.onClose}
                        >
                            Oke
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
