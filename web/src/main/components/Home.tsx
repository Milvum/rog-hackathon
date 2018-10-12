import * as React from 'react';
import ISurvey from '../models/Survey';
import SurveyList from './SurveyList';

export interface IProps {
    surveys: ISurvey[];
}

export interface IDispatchProps {
    onJoinRoom: (code: string) => void;
    onCreateRoom: (topic: string) => void;
}

type Props = IProps & IDispatchProps;

interface IState {
    roomCode: string;
    topic: string;
    showNameModal: boolean;
    name: string;
}

export default class Home extends React.Component<Props, IState> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            roomCode: '',
            topic: '',
            showNameModal: true,
            name: '',
        };
    }

    private onSubmitCreate = (event: React.FormEvent) => {
        event.preventDefault();
        if (this.state.topic === '') {
            return;
        }
        this.props.onCreateRoom(this.state.topic);
    }

    private onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (this.state.roomCode === '') {
            return;
        }
        this.props.onJoinRoom(this.state.roomCode);
    }
    /* <h1>Survey</h1>
                  <form onSubmit={this.onSubmitCreate}>
                      <div className="parallelogram">
                          <input
                              className="skew-fix"
                              placeholder="topic"
                              type="text"
                              value={this.state.topic}
                              onChange={(event) => this.setState({ topic: event.target.value })}
                          />
                      </div>
                      <a className="parallelogram button main" onClick={this.onSubmitCreate}>
                          <span className="skew-fix">Create</span>
                      </a>
                  </form>
                  <form onSubmit={this.onSubmit}>
                      <div className="parallelogram">
                          <input
                              className="skew-fix"
                              placeholder="room"
                              type="text"
                              value={this.state.roomCode}
                              onChange={(event) => this.setState({ roomCode: event.target.value })}
                          />
                      </div>
                      <a className="parallelogram button main" onClick={this.onSubmit}>
                          <span className="skew-fix">Join</span>
                      </a>
                  </form>
                  <h1>Running Surveys</h1>
                  <SurveyList surveys={this.props.surveys} onJoinRoom={this.props.onJoinRoom} /> */
    public render() {
        return (
            <div className="container">
                <div className="sidebar">
                    <div className="sidebar-item selected">
                        {/* <img height="50" width="50" /> */}
                        <p>Overzicht</p>
                    </div>
                    <div className="sidebar-item">
                        {/* <img height="50" width="50" /> */}
                        <p>Gegevens verwijderen</p>
                    </div>
                    <div className="sidebar-item ">
                        {/* <img height="50" width="50" /> */}
                        <p>Machtiging</p>
                    </div>
                    <div className="sidebar-item ">
                        {/* <img height="50" width="50" /> */}
                        <p>Mijn account</p>
                    </div>
                    <div className="sidebar-item ">
                        {/* <img height="50" width="50" /> */}
                        <p>Loguit</p>
                    </div>
                </div>
                <div className="content">
                    <p>CONTENT SCREEN</p>
                </div>
            </div>
        );
    }
}
