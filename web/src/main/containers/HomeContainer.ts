import { MapDispatchToProps, connect, MapStateToProps } from 'react-redux';
import { IDispatchProps, IProps as HomeProps } from '../components/Home';
import Home from '../components/Home';
import { AppState } from '../reducers/Reducer';
import { RouteComponentProps } from 'react-router';
import { SurveyActions, hostSurvey, joinSurvey, connectSurvey } from '../actions/SurveyActions';
import { DispatchType } from '..';
import { push } from 'connected-react-router';
import { fetchData } from '../actions/ApiActions';

type OwnProps = RouteComponentProps<{}>;

const mapStateToProps: MapStateToProps<HomeProps, OwnProps, AppState> = (state, ownProps) => {
    return {
        surveys: state.surveys.surveys,
        data: state.surveys.data,
    };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, OwnProps> = (dispatch: DispatchType, ownProps) => {
    return {
        onJoinRoom: (code) => {
            dispatch(joinSurvey(code, 'user'));
            dispatch(push(`/submission/${code}`));
        },
        onCreateRoom: async (topic) => {
            const survey = await dispatch(hostSurvey(topic));

            if (!survey) {
                return;
            }

            dispatch(push(`/survey/${survey.code}`));
        },
        onRequestData: () => {
            dispatch(fetchData());
        },
    };
};

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);

export default HomeContainer;
