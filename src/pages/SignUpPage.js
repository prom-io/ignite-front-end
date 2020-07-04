import React from 'react';
import { observer } from 'mobx-react';
import { useRouter, useStore } from '../store/hooks';
import { Routes } from '../routes';

export const SignUpPage = observer(() => {
    const { genericAuthorizationDialog } = useStore();
    const { router } = useRouter();

    genericAuthorizationDialog.setGenericAuthorizationDialogType('signUp');
    genericAuthorizationDialog.setGenericAuthorizationDialogOpen(true);
    router.goTo(Routes.home);
});
