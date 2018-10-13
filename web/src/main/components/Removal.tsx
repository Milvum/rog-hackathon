import * as React from 'react';
import Instance from '../models/Instance';
import Category from './Category';

interface IProps {
    categories: Array<{name: string, instances: Instance[]}>;
}

export type RemovalProps = IProps;

export default class Overview extends React.PureComponent<RemovalProps> {
    public render() {
        return (
            <div className="content removal" >
                {this.props.categories.map((category, key) =>
                    <Category category={category.name} instances={category.instances} isRemoval={true} key={key}/>)}
            </div>
        );
    }
}
