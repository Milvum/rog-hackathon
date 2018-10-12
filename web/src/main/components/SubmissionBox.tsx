import * as React from 'react';

type Props = IDispatchProps;

export type SubmissionBoxDispatchProps = Props;

interface IDispatchProps {
    onSubmission: (submission: string) => void;
}

interface IState {
    submission: string;
}

export default class SubmissionBox extends React.PureComponent<Props, IState> {
    public constructor(props: Props) {
        super(props);

        this.state = { submission: '' };
    }

    private onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (this.state.submission !== '') {
            this.props.onSubmission(this.state.submission);
            this.setState({
                submission: '',
            });
        }
    }

    public render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="parallelogram">
                        <input
                            className="skew-fix"
                            placeholder="Submission"
                            type="text"
                            value={this.state.submission}
                            onChange={(event) => this.setState({ submission: event.target.value })}
                        />
                    </div>
                    <a
                        className="parallelogram button main"
                        onClick={this.onSubmit}
                    >
                        <span className="skew-fix">Submit</span>
                    </a>
                </form>
            </div>
        );
    }
}
