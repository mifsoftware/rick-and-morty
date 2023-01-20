import React from 'react';
import { Route } from 'react-router';
import { Routes, Navigate } from 'react-router-dom';
const CharactersView = React.lazy(() => import('@views/CharactersView'));
import styles from './style.module.scss';

const mainLayout = (component: React.Component | React.ReactElement): JSX.Element => (
	<>
		<div className={styles['outlet']}>{component as React.ReactNode}</div>
	</>
);

const Router = () => {
	return (
		<Routes>
			<Route path='/characters' element={mainLayout(<CharactersView />)} />
			<Route path='*' element={<Navigate to='/characters' />} />
		</Routes>
	);
};

export default Router;
