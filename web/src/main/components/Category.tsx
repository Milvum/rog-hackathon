import * as React from 'react';
import InstanceObj from '../models/Instance';
import Instance from './Instance';

interface IProps {
    category: string;
    instances: InstanceObj[];
}

export type CategoryProps = IProps;

export default class Category extends React.PureComponent<CategoryProps> {
    public render() {
        return (
            <div className="category" >
                <div className="categoryName">{this.props.category}</div>
                {this.props.instances.map((instance, key) => (<Instance key={key} instance={instance} />))}
            </div>
        );
    }
}
