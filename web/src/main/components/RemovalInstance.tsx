import * as React from 'react';
import * as moment from 'moment';
import Instance from '../models/Instance';
import Popup from './Popup';
import {Api} from '../api/Api';

interface IProps {
    instance: Instance;
}
interface IState {
    removed: boolean;
    show: boolean;
}

type Props = IProps;

export type InstanceProps = IProps;

function Removal({ removed, onClick }: { removed: boolean, onClick?: () => void }) {
    return (
        <div className={`removedButton ${removed ? 'removed' : ''}`} onClick={onClick}>
            {!removed ?
                'Verzoek data en account verwijdering' :
                'Aanvraag is ingediend'}
        </div>);
}

export default class Category extends React.PureComponent<IProps, IState> {
    public constructor(props: Props) {
        super(props);
        this.state = { removed: !!this.props.instance.deleted, show: false };
    }

    private togglePopup() {
        this.setState({ show: !this.state.show });
    }

    private onRemove(id: string) {
        new Api().Revoke(id);

        if (!this.state.removed) {
            // TODO:  SHOW POPUP
            this.togglePopup();
        }
        this.setState({ removed: true });

    }
    public render() {
        return (
            <div className="instance">
                <div className="iName">
                    <img src={`data:image/png;base64,${this.props.instance.icon}`} />
                    {this.props.instance.name}
                </div>
                <Removal removed={this.state.removed} onClick={() => this.onRemove(this.props.instance.id)} />
                {
                    this.state.show &&
                    <Popup type="delete" service={this.props.instance.name} onClose={() => this.togglePopup()} />
                }
            </div>
        );
    }
}
