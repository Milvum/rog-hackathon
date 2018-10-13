import * as React from 'react';
import * as moment from 'moment';
import Instance from '../models/Instance';

interface IProps {
    instance: Instance;
}

export type InstanceProps = IProps;

function Removal({removed, onClick}: {removed: boolean, onClick?: () => void}) {
    return (
        <div className={`removedButton ${removed ? 'removed' : ''}`} onClick={onClick}>
            {!removed ?
             'Verzoek data en account verwijdering' :
             'Aanvraag is ingediend'}
        </div>);
}

const DECISIONS = [
    'Laat nabestaande bepalen',
    'Verberg voor nabestaande en verwijder',
    'Automatisch opzeggen na overlijden',
    'Geef nabestaande het recht om het account over te zetten',
];

export default class Category extends React.PureComponent<IProps> {
    public render() {
        return (
            <div className="instance">
                <div className="iName">
                    <img src={`data:image/png;base64,${this.props.instance.icon}`} />
                    {this.props.instance.name}
                </div>
                <Removal removed={false} />
            </div>
        );
    }
}
