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
    icon: string;
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
        { label: 'Overzicht', key: 'overzicht', icon: 'overview-icon.svg' },
        { label: 'Gegevens verwijderen', key: 'gegevensverwijderen', icon: 'info-remove-icon.svg' },
        { label: 'Machtiging', key: 'machtiging', icon: 'authorization-icon.svg' },
        { label: 'Mijn account', key: 'mijnaccount', icon: 'settings-icon.svg' },
        { label: 'Loguit', key: 'loguit', icon: 'log-out-icon.svg' },
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

    public render() {

        return (
            <div className="container">
                <div className="sidebar">
                    <SideBarItem
                        label={this.sidebarItems[0].label}
                        selected={this.isSelected(this.sidebarItems[0].key)}
                        iconName={this.sidebarItems[0].icon}
                        onClick={() => this.selectItem(this.sidebarItems[0].key)}
                    />
                    <SideBarItem
                        label={this.sidebarItems[1].label}
                        selected={this.isSelected(this.sidebarItems[1].key)}
                        iconName={this.sidebarItems[1].icon}
                        onClick={() => this.selectItem(this.sidebarItems[1].key)}
                    />
                    <SideBarItem
                        label={this.sidebarItems[2].label}
                        selected={this.isSelected(this.sidebarItems[2].key)}
                        iconName={this.sidebarItems[2].icon}
                        onClick={() => this.selectItem(this.sidebarItems[2].key)}
                    />
                    <SideBarItem
                        label={this.sidebarItems[3].label}
                        selected={this.isSelected(this.sidebarItems[3].key)}
                        iconName={this.sidebarItems[3].icon}
                        onClick={() => this.selectItem(this.sidebarItems[3].key)}
                    />
                    <SideBarItem
                        label={this.sidebarItems[4].label}
                        selected={this.isSelected(this.sidebarItems[4].key)}
                        iconName={this.sidebarItems[4].icon}
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
