import * as React from 'react';
import ISurvey from '../models/Survey';

interface IProps {
    surveys: ISurvey[];
    onJoinRoom: (code: string) => void;
}

export default class SurveyList extends React.PureComponent<IProps> {
    public constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className="survey-list">
                {this.props.surveys.map((survey, index) => (
                    <a
                        className="parallelogram button row-element"
                        key={survey.code}
                        onClick={() => this.props.onJoinRoom(survey.code)}
                    >
                        <div className="skew-fix">
                            <span className="code">{survey.code}</span>
                            <span>{survey.title}</span>
                        </div>
                    </a>
                ))}
            </div>
        );
    }
}
