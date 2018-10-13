import * as React from 'react';
import InstanceObj from '../models/Instance';
import Instance from './Instance';
import RemovalInstance from './RemovalInstance';

interface IProps {
    category: string;
    instances: InstanceObj[];
    isRemoval?: boolean;
}

export type CategoryProps = IProps;

export default class Category extends React.PureComponent<CategoryProps> {
    public render() {
        return (
            <div className="category" >
                <div className="categoryTop">
                    <div className="categoryName">{this.props.category}</div>
                    <div className="removeCategory">
                        {this.props.isRemoval ? 'Verwijder alle gegevens van categorie' : ''}
                    </div>
                </div>
                {this.props.instances.map((instance, key) => (
                    this.props.isRemoval ?
                    <RemovalInstance key={key} instance={instance} /> :
                    <Instance key={key} instance={instance} />
                ))}
            </div>
        );
    }
}
