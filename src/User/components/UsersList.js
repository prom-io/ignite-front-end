import React, { Fragment } from 'react';
import { inject } from 'mobx-react';
import { Avatar, CardHeader, List, ListItem, ListItemAvatar, Typography, Hidden } from '@material-ui/core';
import { Link } from 'mobx-router';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { trimString } from '../../utils/string-utils';
import { Routes } from '../../routes';


const useStyles = makeStyles((theme) => ({
    cardHeader: {
        [theme.breakpoints.down('sm')]: {
            '& span': {
                '& p': {
                    maxWidth: '200px',
                    overflowX: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                },
                '& p:after': {
                    content: "'...'",
                },
            },
        },
    },
}));

const _UsersList = ({ users, routerStore }) => {
    const theme = useTheme();

    return (
        <List style={{ padding: 0 }}>
            {users.map(user => (
                <ListItem role="div" style={{ borderBottom: `1px solid ${theme.palette.border.main}` }}>
                    <ListItemAvatar>
                        <Avatar src={user.avatar || 'http://localhost:3000/avatars/original/missing.png'} />
                    </ListItemAvatar>
                    <CardHeader
                        classes={{ root: useStyles().cardHeader }}
                        title={(
                            <Link
                                view={Routes.userProfile}
                                params={{ username: user.username }}
                                store={routerStore}
                                style={{
                                    color: 'inherit',
                                    display: 'flex',
                                }}
                            >
                                <Hidden xsDown>
                                    <Typography>
                                        <strong>{user.display_name}</strong>
                                    </Typography>
                                </Hidden>
                                <Hidden smUp>
                                    <Typography>
                                        <strong>{trimString(user.display_name, 28)}</strong>
                                    </Typography>
                                </Hidden>
                            </Link>
                        )}
                        subheader={(
                            <>
                                <Hidden xsDown>
                                    {user.username}
                                </Hidden>
                                <Hidden smUp>
                                    <strong>{trimString(user.username, 28)}</strong>
                                </Hidden>
                            </>
                        )}
                    />
                </ListItem>
            ))}
        </List>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const UsersList = inject(mapMobxToProps)(_UsersList);
