import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import Survey from '../components/Survey';
import { AppState } from '../reducers/Reducer';
import { RouteComponentProps } from 'react-router';
import { IProps as SurveyProps, IDispatchProps } from '../components/Survey';
import { closeSurvey, connectSurvey } from '../actions/SurveyActions';
import { DispatchType } from '..';

interface IRouteParam {
    code: string;
}

type OwnProps = RouteComponentProps<IRouteParam>;

const mapStateToPros: MapStateToProps<SurveyProps, OwnProps, AppState> = (state, ownProps) => {
    return {
        users: state.users.users,
        survey: state.survey,
        code: ownProps.match.params.code,
    };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, OwnProps> = (dispatch: DispatchType, ownProps) => {
    return {
        onCloseSurvey: () => dispatch(closeSurvey()),
        onConnectSurvey: (code: string) => dispatch(connectSurvey(code)),
    };
};

const SurveyContainer = connect(
    mapStateToPros,
    mapDispatchToProps,
)(Survey);

export default SurveyContainer;
