import * as React from 'react';
import ISurvey from '../models/Survey';
import Instance from '../models/Instance';
import SurveyList from './SurveyList';
import SideBarItem from './SideBarItem';
import Category from './category';
import Overview from './Overview';
import Removal from './Removal';

const instances: Instance[] = [
    {
        icon: 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAEZUlEQVR4nLzW+VOVVRwGcAhSkpsgOMwgDANuqAEKiveGDFqAIIvCDWWGLTVsFBEXxiKFDBBkcVyRZFcwrCYVWXSIoC4F14XNGyCKECgXuARc1tiyeh7/h15++JwZ5n3nnuc93+85RzvghZuGhkbwNU94sMoMLshfCyO/eQqjgrKht30NTDDhM1aNh+D9Dj6psNGC40ZXYIriPPw4JRauP5oHH4pn4Vsa//OfZkh3Dwbr3ff5m5tH4OXgz+FA3xBcrLcFJs+1wew9gzCrIAomVp1hpuJwGHprCYxQvAMnZS2wqONHGHjgUyESaHd6+WNYExMKw6v3wNkxA+gwUge9htbx/5a+cNsvA7CvrAIq5ZUwNyMeKvSOwWPnLKFL6hr4bkAc1F3bKkgC4338vqsa9KFhuiN01n0MT4baQZ+BCWi+by+0nOW8TBxKOK9KF7j/Bt+S9+bDHQkK2CE/y8RtevBU/xUhEmiK01mtymJrGO2RC6PMOJeuNFd4w+Y6nHeENfPeowIoyUiC7fWF0Chyhm8FTMF/S8agVWo3dL3dCJc29AmSoD7CGUN4AOsnW/8DqN9SBudK2bGrB9mx1yfnoCiGFSId5Zx0SkOgbOsDPmm7m/kaF8K7WVKYU8GVMO5KFSRBuYcXhliz51DL5DBUmT6By8U6b2YRAEvH/oCG8b/B1o9WwT9zu6Bp7SdQO+gAtC7/Ht4W74Lqig74emOoIAn8D6ZhSNY3h3VnjGBeEmvAdZo1YH7qKgx0/xrGuLFColS6sNqdHXBnYj90qOR3113B9Ys3ZtaN9c9gWbidIAk8XvDXjiyxhSdrNsHps4lQrmAl5C/6AcpWe8PmRWoYJiqFzn3cL9XxGdC7RgmbLi6CPjnL+FbWBjh0KF+QBJXBDzF0BvbDwfZhWKQRARNE3Pe3lLGWd86shCeecafqsOdpsWE2B8YN8knfSFbar5uZz8WP3eB5mCfBpmg9IRJoS9zZyetrOFO/x9yRdrzeDnVEmfzPVn5fiZo7u28Rd9kLJdyLKocfwYJv/4GZVZFwwG0ciucXw23dXNcLslohEmjWmmpiSLpbDsdlnPWTha/g1DXeJ/IMeJ9ovskbg8qA94979jyZX4Wx9sWjPM/jgljvJzI416lopm8pbIexsr2CJFjZxFkkjqpg3aUE2CnmCbzO7CWM92RnXtLlLvT+9tN8pp9ztC1hjTf5s07S39xIxPVOUDoyCT+b4gpFS5sESRDaNo1BucAGSi5yx38q53pUBM6Hmf28u0m0voK7fNgHx9P+gh8Wslct7rEDHMb5ZOFlnsBeeneg004RVLfOCJLg7/PVGJKcbsIHw0VwXjPvl6OpTHaugiea8YpemBJWD5eZ/AxFcgfYUO0BtY7/BB3HFjNrrhWUmrOfj4Y4CpLgZS8rwe87fvey5luwVLkUFn3Jirr6O0+LnmTmM5gwhMtD2Ns9Ut4wuu24ZhY6FvD5DLu3522e7V+oJFB12kuIBP8FAAD//wGejLr+UnbvAAAAAElFTkSuQmCC',
        name: 'spotify',
        date: new Date(),
        data: ['Stuff', 'secret stuff', 'more stuff'],
        decision: 1,
    },
    {
        name: 'Videoland',
        date: new Date(),
        data: ['Absolutely nothing'],
        decision: 2,
    },
];

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
                    <Overview categories={[{name: 'Abbonementen', instances}]}/> :
                    <Removal categories={[{name: 'Abbonementen', instances}]} />
                }
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
