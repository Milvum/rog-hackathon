import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';
import SurveyContainer from '../containers/SurveyContainer';
import SubmissionContainer from '../containers/SubmissionContainer';
import VideolandContainer from '../containers/VideolandContainer';

export class App extends React.Component {
  public render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/survey/:code" component={SurveyContainer} />
          <Route path="/videoland" component={VideolandContainer} />
          <Route path="/submission/:code" component={SubmissionContainer} />
        </Switch>
      </main>
    );
  }
}
