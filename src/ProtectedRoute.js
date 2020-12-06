import React from 'react';
import authProvider from './authProvider';
import {Route, Redirect} from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...rest }) {

    return (
        <Route
            {...rest}
            render={({ location }) =>
                authProvider.isAuthenticated() ? (
                    <Component {...rest} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}