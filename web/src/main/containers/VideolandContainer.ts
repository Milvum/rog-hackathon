import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import Videoland from '../components/Videoland';
import { AppState } from '../reducers/Reducer';
import { RouteComponentProps } from 'react-router';
import { IProps as VideolandProps, IDispatchProps } from '../components/Videoland';
import { closeSurvey, connectSurvey } from '../actions/SurveyActions';
import { DispatchType } from '..';

interface IRouteParam {
    code: string;
}

type OwnProps = RouteComponentProps<IRouteParam>;

const mapStateToPros: MapStateToProps<VideolandProps, OwnProps, AppState> = (state, ownProps) => {
    return {
        users: state.users.users,
        survey: state.survey,
        code: ownProps.match.params.code,
        serviceName: 'Videoland', // TODO: Should not be hardcoded.
    };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, OwnProps> = (dispatch: DispatchType, ownProps) => {
    return {
        // onCloseSurvey: () => dispatch(closeSurvey()),
        // onConnectSurvey: (code: string) => dispatch(connectSurvey(code)),
    };
};

const VideolandContainer = connect(
    mapStateToPros,
    mapDispatchToProps,
)(Videoland);

export default VideolandContainer;
