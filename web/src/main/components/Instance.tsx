import * as React from 'react';
import * as moment from 'moment';
import Instance from '../models/Instance';

interface IProps {
    instance: Instance;
}

export type InstanceProps = IProps;

interface IDProps {
    text: string;
    checked: boolean;
    onClick ?: () => void;
}

function Decision({text, checked, onClick}: IDProps) {
    return (
        <div onClick={onClick}>
            <div className={`check  ${checked ? 'checked' : ''}`}  />
            <div>{text}</div>
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
                <div className="iName">{this.props.instance.name}</div>
                <div className="iDate">{moment(this.props.instance.date).format('DD MMM YYYY')}</div>
                <div className="iData">
                    {this.props.instance.data.map((dat, key) =>
                        (<div className="dat" key={key}>{dat}</div>),
                    )}
                </div>
                <div className="decisions">
                    {DECISIONS.map((decision , key) =>
                    (<Decision
                        text={decision}
                        checked={this.props.instance.decision === key}
                        key={key}
                    /> ))}
                </div>
            </div>
        );
    }
}
