import React from "react";
import { inject, observer } from "mobx-react";
import { FormControl, Grid, Input, InputAdornment } from "@material-ui/core";

import { SearchPeopleList } from "../../Search/components";
import { localized } from "../../localization/components";

const _SearchPeopleContainer = ({ searchValuePage, setSearchValuePage }) => {
    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <FormControl>
                    <Input
                        placeholder="Search"
                        value={searchValuePage}
                        autoComplete="off"
                        onChange={e => setSearchValuePage(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <img src="/search.png" />
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <SearchPeopleList />
            </Grid>
        </Grid>
    );
};

const mapMobxToProps = ({ searchUsers }) => ({
    searchValuePage: searchUsers.searchValuePage,
    setSearchValuePage: searchUsers.setSearchValuePage
});

export const SearchPeopleContainer = localized(
    inject(mapMobxToProps)(observer(_SearchPeopleContainer))
);
