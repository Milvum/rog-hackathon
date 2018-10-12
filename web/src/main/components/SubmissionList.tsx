import * as React from 'react';
import ISubmission from '../models/Submission';

interface IProps {
    submissions: ISubmission[];
};

export type SubmissionListProps = IProps;

export default class SubmissionList extends React.PureComponent<SubmissionListProps> {
    public render() {
        return (
            <div className="survey-list">
                {this.props.submissions.map((submission, index) => (
                    <div
                        key={submission.id}
                        className="row-element"
                    >
                        <div className="code-header parallelogram">
                            <div className="skew-fix">
                                <span>{submission.submitter}</span>
                            </div>
                        </div>
                        <div className="parallelogram">
                            <div className="skew-fix">
                                <span>{submission.entry}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
