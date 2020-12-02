import { Element, Stack } from '@codesandbox/components';
import css from '@styled-system/css';
import { useOvermind } from 'app/overmind';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Route, BrowserRouter, Switch, useLocation } from 'react-router-dom';
import * as dashboardUrls from '@codesandbox/common/lib/utils/url-generator/dashboard';
import { Header } from '../../../../Components/Header';
import { GRID_MAX_WIDTH, GUTTER } from '../../../../Components/VariableGrid';
import { SettingNavigation } from '../components/Navigation';
import { WorkspaceSettings } from './WorkspaceSettings';
import { PermissionSettings } from '../components/PermissionSettings';

export const UserSettings = () => {
  const {
    state: { user, activeTeam },
    actions,
  } = useOvermind();

  useEffect(() => {
    actions.dashboard.dashboardMounted();
  }, [actions.dashboard]);

  const location = useLocation();

  if (!user) {
    return <Header title="Settings" activeTeam={activeTeam} />;
  }

  return (
    <>
      <Helmet>
        <title>Workspace Settings - CodeSandbox</title>
      </Helmet>
      <Header title="Workspace Settings" activeTeam={activeTeam} />
      <Element
        css={css({
          height: 'calc(100vh - 140px)',
          overflowY: 'scroll',
          paddingY: 10,
        })}
      >
        <Stack
          direction="vertical"
          gap={8}
          css={css({
            marginX: 'auto',
            width: `calc(100% - ${2 * GUTTER}px)`,
            maxWidth: GRID_MAX_WIDTH - 2 * GUTTER,
          })}
        >
          <SettingNavigation teamId={activeTeam} isAdmin />
          <BrowserRouter>
            <Switch location={location}>
              <Route
                component={PermissionSettings}
                path={dashboardUrls.permissionSettings()}
              />
              <Route
                component={WorkspaceSettings}
                path={dashboardUrls.settings()}
              />
            </Switch>
          </BrowserRouter>
        </Stack>
      </Element>
    </>
  );
};