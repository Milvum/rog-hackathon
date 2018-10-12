import { ISurveySocket, ConnectionOptions } from '../ISurveySocket';
import { Dispatch } from 'redux';
import { SurveyActions } from '../../actions/SurveyActions';
import ISurvey from '../../models/Survey';

export default class FakeSurveySocket implements ISurveySocket {
    private readonly dispatch: Dispatch;
    private survey: ISurvey;

    public constructor(dispatch: Dispatch, survey: ISurvey, options: ConnectionOptions) {
        this.dispatch = dispatch;
        this.survey = survey;

        if (options.mode === 'host') {
            setTimeout(() => {
                this.dispatch(SurveyActions.surveyHosted({
                    survey,
                    socket: this,
                }));
            }, 1000);
        } else {
            setTimeout(() => {
                this.dispatch(SurveyActions.surveyJoined({
                    survey,
                    socket: this,
                }));
            }, 1000);
        }
    }

    public CloseSurvey(): void {
        console.info('Closing survey');
    }

    public LeaveSurvey(): void { }

    public Submit(submission: string): void {
        console.info(`Submitting: ${submission}`);
    }
}
