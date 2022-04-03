import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Wedding = lazy(() => import('./wedding'));
const LoginRegister = lazy(() => import('./LoginRegister'));
const RingsMarketplace = lazy(() => import('./RingsMarketplace'));
const Purchase = lazy(() => import('./Purchase'));
const SendEngagementProposal = lazy(() => import('./SendEngagementProposal'));
const AcceptEngagementProposal = lazy(() => import('./AcceptEngagementProposal'));
const SendMarriageProposal = lazy(() => import('./SendMarriageProposal'));
const AcceptMarriageProposal = lazy(() => import('./AcceptMarriageProposal'));
const LoveLetters = lazy(() => import('./LoveLetters'));
const LoveLetter = lazy(() => import('./love-letter'));
const ReadLoveLetter = lazy(() => import('./read-love-letter'));

const RecievedProposals = lazy(() => import('./RecievedProposals'));
const SentProposals = lazy(() => import('./SentProposals'));
const SentEngagementProposal = lazy(() => import('./SentEngagementProposal'));
const SentMarriageProposal = lazy(() => import('./SentMarriageProposal'));

const ViewNfts = lazy(() => import('./ViewNfts'));
const CreateRing = lazy(() => import('./CreateRing'));
const Dating = lazy(() => import('./Dating'));

const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));

const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));

const Mdi = lazy(() => import('./icons/Mdi'));

const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const TestLogin = lazy(() => import('./TestLogin'));
const _Redirect = lazy(() => import('./Redirect.js'));

class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/" component={ Wedding } />
          <Route exact path="/dashboard" component={ Dashboard } />
          <Route path="/login-register" component={ LoginRegister } />
          <Route path="/create-ring" component={ CreateRing } />

          <div style={{width:"80vw", marginLeft:"5vw",marginTop:"4vh"}}>
          <Route path="/rings-marketplace" component={ RingsMarketplace } />
          <Route path="/purchase/:itemId" component={ Purchase } />
          <Route path="/send-engagement-proposal" component={ SendEngagementProposal } />
          <Route path="/accept-engagement-proposal/:engagementProposalId" component={ AcceptEngagementProposal } />
          <Route path="/send-marriage-proposal" component={ SendMarriageProposal } />
          <Route path="/accept-marriage-proposal/:marriageProposalId" component={ AcceptMarriageProposal } />
          <Route path="/recieved-proposals" component={ RecievedProposals } />

          <Route path="/sent-proposals" component={ SentProposals } />
          <Route path="/sent-engagement-proposal/:engagementProposalId" component={ SentEngagementProposal } />
          <Route path="/sent-marriage-proposal/:marriageProposalId" component={ SentMarriageProposal } />

          <Route path="/love-letters" component={ LoveLetters } />
          <Route path="/love-letter/:tokenId" component={ LoveLetter } />
          <Route path="/read-love-letter/:tokenId" component={ ReadLoveLetter } />

          <Route path="/view-nfts" component={ ViewNfts } />

          <Route path="/dating" component={ Dating } />
          </div>

          <Route path="/basic-ui/buttons" component={ Buttons } />
          <Route path="/basic-ui/dropdowns" component={ Dropdowns } />
          <Route path="/basic-ui/typography" component={ Typography } />

          <Route path="/form-Elements/basic-elements" component={ BasicElements } />

          <Route path="/tables/basic-table" component={ BasicTable } />

          <Route path="/icons/mdi" component={ Mdi } />

          <Route path="/charts/chart-js" component={ ChartJs } />

          <Route path="/error-pages/error-404" component={ Error404 } />
          <Route path="/error-pages/error-500" component={ Error500 } />

          <Route path="/test-login" component={ TestLogin } />
          <Route path="/auth/redirect" component={ _Redirect } />

          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;