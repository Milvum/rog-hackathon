import * as React from 'react';
import ISurvey from '../models/Survey';
import SurveyList from './SurveyList';
import SideBarItem from './SideBarItem';

export interface IProps {
    surveys: ISurvey[];
}

export interface IDispatchProps {
    onJoinRoom: (code: string) => void;
    onCreateRoom: (topic: string) => void;
}
interface ISideBarItem {
    label: string;
    key: string;
}

type Props = IProps & IDispatchProps;

interface IState {
    roomCode: string;
    topic: string;
    showNameModal: boolean;
    name: string;
    selected: string;
}

export default class Home extends React.Component<Props, IState> {
    private readonly sidebarItems: ISideBarItem[] = [
        { label: 'Overzicht', key: 'overzicht' },
        { label: 'Gegevens verwijderen', key: 'gegevensverwijderen' },
        { label: 'Machtiging', key: 'machtiging' },
        { label: 'Mijn account', key: 'mijnaccount' },
        { label: 'Loguit', key: 'loguit' },
    ];
    public constructor(props: Props) {
        super(props);
        this.state = {
            roomCode: '',
            topic: '',
            showNameModal: true,
            name: '',
            selected: this.sidebarItems[0].key,
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
                    <SideBarItem
                        label={this.sidebarItems[0].label}
                        selected={this.isSelected(this.sidebarItems[0].key)}
                        onClick={() => this.selectItem(this.sidebarItems[0].key)}
                    />
                    <SideBarItem
                        label={this.sidebarItems[1].label}
                        selected={this.isSelected(this.sidebarItems[1].key)}
                        onClick={() => this.selectItem(this.sidebarItems[1].key)}
                    />
                    <SideBarItem
                        label={this.sidebarItems[2].label}
                        selected={this.isSelected(this.sidebarItems[2].key)}
                        onClick={() => this.selectItem(this.sidebarItems[2].key)}
                    />
                    <SideBarItem
                        label={this.sidebarItems[3].label}
                        selected={this.isSelected(this.sidebarItems[3].key)}
                        onClick={() => this.selectItem(this.sidebarItems[3].key)}
                    />
                    <SideBarItem
                        label={this.sidebarItems[4].label}
                        selected={this.isSelected(this.sidebarItems[4].key)}
                        onClick={() => this.selectItem(this.sidebarItems[4].key)}
                    />

                </div>
                <div className="content">
                    <p>CONTENT SCREEN</p>
                </div>
            </div>
        );
    }

    private selectItem(key: string) {
        this.setState({ selected: key });
    }

    private isSelected(key: string): boolean {
        return this.state.selected === key;
    }
}
