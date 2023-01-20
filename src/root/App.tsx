import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '@router/Router';
import ErrorBoundary from './ErrorBoundary';
import PreLoader from '../components/ui/PreLoader';
import styles from './App.module.scss';
import '../common/styles/common.scss';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<ErrorBoundary>
				<Suspense fallback={<PreLoader />}>
					<div className={styles.main}>
						<Router />
					</div>
				</Suspense>
			</ErrorBoundary>
		</BrowserRouter>
	);
};

export default App;
