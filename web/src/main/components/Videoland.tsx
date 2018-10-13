import * as React from 'react';
import { SurveyState, SurveyConnectionState } from '../reducers/Survey';
import ISurvey from '../models/Survey';
import ConnectionStatus from './ConnectionStatus';
import SubmissionList from './SubmissionList';
import CheckboxItem from './CheckboxItem';
import Popup from './Popup';
import { Api } from '../api/Api';

export interface IProps {
    users: string[];
    survey: SurveyState;
    code: string;
    serviceName?: string;
}

interface IState {
    username: string;
    password: string;
    loginRog: boolean;
    showPopup: boolean;
}

export interface IDispatchProps {
    // onCloseSurvey: () => void;
    // onConnectSurvey: (code: string) => void;
    // onSubmission: (submission: string) => void;
    // onLogin: (login: string) => void;
}

export type Props = IProps & IDispatchProps;

export default class Videoland extends React.Component<Props, IState> {
    public constructor(props: Props) {
        super(props);
        this.state = { username: '', password: '', loginRog: false, showPopup: false };

    }

    private onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (this.state.username !== '') {
            // this.props.onSubmission(this.state.submission);
            this.setState({
                username: '',
            });
        }
    }

    private togglePopup() {
        this.setState({ showPopup: !this.state.showPopup });
        new Api().Acquire(
            '1217b527-7a51-4bc5-84eb-465ba5fa5ea8',
            [
                '05a56c7c-1207-49e3-adb0-b096ca6425d0',
                'a2cafcb1-01b2-4409-af75-a3a2050b14fa',
            ]);
    }

    public renderPopup() {
        const message = 'Videoland wil toegang tot je BRG2 account.';
        const question = `Welke gegevens wil je delen met ${this.props.serviceName}?`;
        const title = 'Log in met BRG2';
        const successMessage = `Je hebt de geselecteerde gegevens gedeeld met ${this.props.serviceName}.`;

        return (
            <div className="container videoland-container">
                <div className="videoland-popup">
                    <div className="popup-header-content">
                        <img width="16" height="16" src="/assets/logo.svg" />
                        <p>{title}</p>
                    </div>
                    <div className="line small" />

                    <div className="popup-content">
                        <p className="popup-message">
                            {message}
                        </p>

                        <p className="popup-question">
                            {question}
                        </p>

                        <CheckboxItem label="Voor- en achternaam" selected={true} />
                        <CheckboxItem label="E-mailadres" selected={false} />
                        <CheckboxItem label="Telefoonnummer" selected={true} />
                        <CheckboxItem label="Adresgegevens" selected={false} />

                    </div>
                    <div className="buttons-container">
                        <button
                            className="cancel-button btn"
                            onClick={() => this.setState({ loginRog: false })}
                        >
                            Annuleer
                        </button>
                        <button
                            className="confirm-button btn"
                            onClick={() => this.togglePopup()}
                        >
                            Toestaan
                        </button>
                    </div>
                </div>
                {
                    this.state.showPopup &&
                    <Popup title={title} message={successMessage} onClose={() => this.togglePopup()} />
                }
            </div>
        );
    }

    public renderLogin() {
        const emailPlaceholder = 'E-mailadres of telefoonnummer';
        const passPlaceholder = 'Wachtwoord';
        return (
            <div className="container videoland-container">
                <div className="videoland-content">
                    <img className="videoland-logo" src="/assets/logo-videoland.svg" />
                    <button
                        className="brg-login-button btn"
                        onClick={() => { this.setState({ loginRog: true }); }}
                    >
                        <div className="brg-login-button-content">
                            <img width="16" height="16" src="/assets/logo-white.svg" />
                            <p>Log in met BRG2</p>
                        </div>
                    </button>

                    <div className="divider">
                        <div className="line" />
                        <p>of</p>
                        <div className="line" />
                    </div>

                    <form onSubmit={this.onSubmit} >
                        <div className="login-container">
                            <div className="input-container">
                                <input
                                    className="input-field"
                                    placeholder={emailPlaceholder}
                                    type="text"
                                    value={this.state.username}
                                    onChange={(event) => this.setState({ username: event.target.value })}
                                />
                                <div className="line" />
                            </div>
                            <div className="input-container">
                                <input
                                    className="input-field"
                                    placeholder={passPlaceholder}
                                    type="text"
                                    value={this.state.password}
                                    onChange={(event) => this.setState({ password: event.target.value })}
                                />
                                <div className="line" />
                            </div>
                            <button
                                className="login-button btn"
                                onClick={() => { alert('Je hebt de geselecteerde gegevens gedeeld met Videoland.'); }}
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    public render() {
        return this.state.loginRog ? this.renderPopup() : this.renderLogin();
    }
}
