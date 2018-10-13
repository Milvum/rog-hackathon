import * as React from 'react';
import ISurvey from '../models/Survey';
import Instance from '../models/Instance';
import SurveyList from './SurveyList';
import SideBarItem from './SideBarItem';
import Category from './category';
import Overview from './Overview';
import Removal from './Removal';
import { IData } from '../actions/ApiActions';
import Header from './Header';

export interface IProps {
    surveys: ISurvey[];
    data: IData[];
}

export interface IDispatchProps {
    onJoinRoom: (code: string) => void;
    onCreateRoom: (topic: string) => void;
    onRequestData: () => void;
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

    public componentDidMount() {
        setInterval(this.props.onRequestData, 1000);
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
            <div className="body">
                <Header name="Anne Schipper" />
                <div className="container">
                    <div className="sidebar">
                        {this.sidebarItems.map((item, key) =>
                            <SideBarItem
                                label={item.label}
                                selected={this.isSelected(item.key)}
                                iconName={item.icon}
                                onClick={() => this.selectItem(item.key)}
                                key={key}
                            />)}
                    </div>
                    {
                        this.state.selected === 'overzicht' ?
                            <Overview categories={this.props.data} /> :
                            <Removal categories={this.props.data} />
                    }
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
