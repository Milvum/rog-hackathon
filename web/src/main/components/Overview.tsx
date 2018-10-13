import * as React from 'react';
import Instance from '../models/Instance';
import Category from './Category';

interface IProps {
    categories: Array<{name: string, instances: Instance[]}>;
}

export type OverviewProps = IProps;

export default class Overview extends React.PureComponent<OverviewProps> {
    public render() {
        return (
            <div className="content overview" >
                {this.props.categories.map((category, key) =>
                    <Category category={category.name} instances={category.instances} key={key}/>)}
            </div>
        );
    }
}
