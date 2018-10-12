import { AppState } from '../reducers/Reducer';
import { DispatchType } from '..';
import Submission, { SubmissionProps, SubmissionDispatchProps } from '../components/Submission';
import { RouteComponentProps } from 'react-router';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { connectSurvey, joinSurvey, submitSubmission } from '../actions/SurveyActions';

interface IRouteParam {
    code: string;
}

type OwnProps = RouteComponentProps<IRouteParam>;

const mapStateToProps: MapStateToProps<SubmissionProps, OwnProps, AppState> = (state, ownProps) => {
    return {
        code: ownProps.match.params.code,
        currentUser: 'user',
        survey: state.survey,
    };
};

const mapDispatchToProps: MapDispatchToProps<SubmissionDispatchProps, OwnProps> =
    (dispatch: DispatchType, ownProps) => {
        return {
            onConnectSurvey: (code: string, name: string) => {
                dispatch(joinSurvey(code, name));
            },
            onSubmission: (submission: string) => {
                dispatch(submitSubmission(submission));
            },
        };
    };

const SubmissionContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Submission);

export default SubmissionContainer;
