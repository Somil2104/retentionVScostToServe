import React, { useContext } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { UserContext } from '../context/UserContext';

const UserProfile = () => {
    const { user } = useContext(UserContext);

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{user.name}</Typography>
                <Typography variant="body1">Segment: {user.segment}</Typography>
                <Typography variant="body2">Churn Risk: {user.churnRisk}</Typography>
            </CardContent>
        </Card>
    );
};

export default UserProfile;
